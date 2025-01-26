const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./", 
});

const customJestConfig = {
  testEnvironment: "node", 
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/lib/(.*)$": "<rootDir>/lib/$1",
    "^@/models/(.*)$": "<rootDir>/models/$1",
  },
  moduleDirectories: ["node_modules", "<rootDir>"],
  
  
  reporters: [
    'default', 
    [
      'jest-html-reporter', {
        pageTitle: 'Test Report',  
        outputPath: './test-reports/jest-report.html', 
        includeFailureMsg: true,  
        includeConsoleLog: true, 
      }
    ],
  ],
};

module.exports = createJestConfig(customJestConfig);
