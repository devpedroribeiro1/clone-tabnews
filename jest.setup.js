import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForServices();
  await orchestrator.clearDatabase();
});
