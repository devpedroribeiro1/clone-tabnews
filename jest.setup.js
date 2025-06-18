import database from 'infra/database.js';
import orchestrator from 'tests/orchestrator.js';

beforeAll(async () => {
  await orchestrator.waitForServices();
  cleanDatabase();
})

async function cleanDatabase(){
  await database.query('drop schema public cascade; create schema public;');
}