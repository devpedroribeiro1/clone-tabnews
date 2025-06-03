import database from 'infra/database.js';
import orchestrator from 'tests/orchestrator.js';

beforeAll(cleanDatabase)

async function cleanDatabase(){
  await database.query('drop schema public cascade; create schema public;');
  await orchestrator.waitForServices();
}