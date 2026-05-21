import hashlib
import json
import os
import typing

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
import httpx
from openai import APIConnectionError, APIStatusError, OpenAI


load_dotenv()


REALTIME_MODEL = "gpt-realtime-2"
REALTIME_VOICE = "cedar"
CLIENT_SECRET_TTL_SECONDS = 120

VANGUARDIA_INSTRUCTIONS = """Você é o Jarvis da VanguardIA, assistente de IA por voz que interage com leads, clientes e parceiros do Grupo VanguardIA.

SOBRE A VANGUARDIA:
O Grupo VanguardIA é a primeira aceleradora de cultura de Inteligência Aplicada do Brasil, sediada em Belém, Pará. Criamos a Arquitetura ICIA — método proprietário que une pessoas, processos e tecnologia em camada permanente.

NOSSOS PRODUTOS:
- CNH da IA: certificação corporativa com 8.000+ profissionais habilitados
- ICIA START / CORE / OS: três níveis de implementação (entrada, transformação, legado)
- ICIA 360: integração e substituição de sistemas
- ICIA Data Lake: fundação de dados governada
- ICIA Governança IA: POPs vivos e políticas de uso
- Do It Hub: ecossistema físico em Belém com eventos semanais

CLIENTES: Atendemos 22+ empresas como Paraferro, Grupo Mega, Alves Martins, Silveira Athias, CF Distribuidora, MedNutri, Facilita, BBB, e instituições como ACP, SEBRAE, OAB-PA, SINDARPA.

PARA O SETOR PÚBLICO: CNH da IA para servidores, contatável por inexigibilidade (Lei 14.133/21, Art. 74), em conformidade com LGPD e LC 182/2021.

TOM DE VOZ:
- Profissional mas caloroso, como um consultor de confiança
- Respostas diretas, sem enrolação
- Quando não souber algo, ofereça conectar com um humano
- Use português brasileiro natural, sem anglicismos forçados
- Se for uma reunião guiada pelo CEO (Jorge), assuma tom de apresentação institucional
- Se for um lead, seja consultivo — entenda a dor antes de oferecer solução
"""


app = FastAPI(title="OrbVoiceAgent Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_api_key() -> str:
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=500,
            detail="OPENAI_API_KEY environment variable is not configured.",
        )
    return api_key


def build_safety_identifier(request: Request, api_key: str) -> str:
    forwarded_for = request.headers.get("x-forwarded-for", "")
    client_ip = forwarded_for.split(",", 1)[0].strip()
    if not client_ip and request.client:
        client_ip = request.client.host

    user_agent = request.headers.get("user-agent", "")
    salt = os.getenv("OPENAI_SAFETY_SALT") or api_key[-16:]
    raw_identifier = f"{client_ip}|{user_agent}|{salt}"
    return hashlib.sha256(raw_identifier.encode("utf-8")).hexdigest()


def realtime_session_config() -> dict[str, typing.Any]:
    return {
        "type": "realtime",
        "model": REALTIME_MODEL,
        "instructions": VANGUARDIA_INSTRUCTIONS,
        "audio": {
            "input": {
                "noise_reduction": {"type": "near_field"},
                "turn_detection": {
                    "type": "server_vad",
                    "threshold": 0.5,
                    "prefix_padding_ms": 300,
                    "silence_duration_ms": 500,
                    "create_response": True,
                    "interrupt_response": True,
                },
            },
            "output": {
                "voice": REALTIME_VOICE,
            },
        },
    }


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/realtime/token")
def create_realtime_token(request: Request) -> dict:
    api_key = get_api_key()
    client = OpenAI(api_key=api_key)

    try:
        session = client.post(
            "/realtime/client_secrets",
            cast_to=typing.Dict[str, typing.Any],
            options={
                "headers": {
                    "OpenAI-Safety-Identifier": build_safety_identifier(
                        request,
                        api_key,
                    )
                }
            },
            body={
                "expires_after": {
                    "anchor": "created_at",
                    "seconds": CLIENT_SECRET_TTL_SECONDS,
                },
                "session": realtime_session_config(),
            },
        )
    except APIStatusError as exc:
        raise HTTPException(
            status_code=exc.status_code,
            detail=exc.response.text,
        ) from exc
    except APIConnectionError as exc:
        raise HTTPException(
            status_code=502,
            detail="Could not connect to OpenAI Realtime API.",
        ) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail="Unexpected error while creating Realtime session.",
        ) from exc

    return session


@app.post("/api/realtime/session")
async def create_realtime_session(request: Request) -> Response:
    api_key = get_api_key()
    sdp = await request.body()
    if not sdp:
        raise HTTPException(status_code=400, detail="Missing SDP offer body.")

    headers = {
        "Authorization": f"Bearer {api_key}",
        "OpenAI-Safety-Identifier": build_safety_identifier(request, api_key),
    }
    files = {
        "sdp": (None, sdp.decode("utf-8"), "application/sdp"),
        "session": (
            None,
            json.dumps(realtime_session_config()),
            "application/json",
        ),
    }

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            openai_response = await client.post(
                "https://api.openai.com/v1/realtime/calls",
                headers=headers,
                files=files,
            )
    except httpx.RequestError as exc:
        raise HTTPException(
            status_code=502,
            detail="Could not connect to OpenAI Realtime API.",
        ) from exc

    if openai_response.status_code >= 400:
        raise HTTPException(
            status_code=openai_response.status_code,
            detail=openai_response.text,
        )

    return Response(
        content=openai_response.text,
        media_type="application/sdp",
    )


class ClientError(typing.TypedDict, total=False):
    message: str
    stack: str
    userAgent: str


@app.post("/api/log-error")
def log_error(err: ClientError) -> dict[str, str]:
    print(f"\n--- CLIENT ERROR LOG ---")
    print(f"Message: {err.get('message')}")
    print(f"Stack: {err.get('stack')}")
    print(f"UserAgent: {err.get('userAgent')}")
    print(f"------------------------\n")
    return {"status": "ok"}
