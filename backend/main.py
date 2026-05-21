import os
import typing

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import APIConnectionError, APIStatusError, OpenAI


load_dotenv()


REALTIME_MODEL = "gpt-realtime-2"
REALTIME_VOICE = "shimmer"

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


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/realtime/token")
def create_realtime_token() -> dict:
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=500,
            detail="OPENAI_API_KEY environment variable is not configured.",
        )

    client = OpenAI(api_key=api_key)

    try:
        session = client.post(
            "/realtime/client_secrets",
            cast_to=typing.Dict[str, typing.Any],
            body={
                "session": {
                    "type": "realtime",
                    "model": REALTIME_MODEL,
                    "instructions": VANGUARDIA_INSTRUCTIONS,
                    "audio": {
                        "output": {
                            "voice": REALTIME_VOICE
                        }
                    }
                }
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

