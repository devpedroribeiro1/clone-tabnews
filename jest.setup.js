import database from "infra/database.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForServices();
  await orchestrator.clearDatabase();
});

async function clearDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}
