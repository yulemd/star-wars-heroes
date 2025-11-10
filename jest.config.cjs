module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': ['babel-jest', { configFile: './babel.config.cjs' }],
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
