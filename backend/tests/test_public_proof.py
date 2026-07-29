import unittest
from unittest.mock import patch

from fastapi import HTTPException

from backend import main


class PublicProofContractTests(unittest.TestCase):
    def setUp(self) -> None:
        main.public_proof.cache_clear()
        main.SESSION_STARTS.clear()

    def tearDown(self) -> None:
        main.public_proof.cache_clear()
        main.SESSION_STARTS.clear()

    def test_canonical_metrics_and_reference_date(self) -> None:
        proof = main.public_proof()

        self.assertEqual(proof["asOf"], "2026-07-06")
        self.assertEqual(
            [metric["display"] for metric in proof["metrics"]],
            ["700+", "22", "7.500+", "1.000+"],
        )

    def test_knowledge_search_uses_shared_proof(self) -> None:
        results = main.search_knowledge("quantas contas ativas")
        result_text = "\n".join(result["content"] for result in results)
        all_knowledge = "\n".join(
            chunk["content"] for chunk in main.knowledge_chunks()
        )

        self.assertIn("22 contas ativas", result_text)
        self.assertNotIn("27 contas", all_knowledge)
        self.assertNotIn("8.000", all_knowledge)

    def test_public_routes_have_one_error_logger_and_stable_contracts(self) -> None:
        paths = [route.path for route in main.app.routes]

        self.assertEqual(paths.count("/api/log-error"), 1)
        self.assertIn("/api/realtime/session", paths)
        self.assertIn("/api/realtime/token", paths)
        self.assertIn("/api/knowledge/search", paths)

    def test_realtime_session_rate_limit(self) -> None:
        with patch.object(main.time, "time", return_value=1_000_000.0):
            for _ in range(main.MAX_REALTIME_SESSIONS_PER_HOUR):
                main.enforce_session_rate_limit("visitor")

            with self.assertRaises(HTTPException) as context:
                main.enforce_session_rate_limit("visitor")

        self.assertEqual(context.exception.status_code, 429)


if __name__ == "__main__":
    unittest.main()
