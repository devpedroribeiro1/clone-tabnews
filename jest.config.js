const nextJest = require('next/jest');
const dotenv = require('dotenv');

dotenv.config({
  path: '.env.development',
})

const createJestConfig = nextJest({
  dir: './'
});
const jestConfig = createJestConfig({
  moduleDirectories: ['node_modules', '<rootDir>'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  testTimeout: 60000,
})

module.exports = jestConfig;