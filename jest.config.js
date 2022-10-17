module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
  },
  moduleDirectories: ['node_modules', 'src'],
  preset: 'ts-jest',
  setupFilesAfterEnv: [
    '<rootDir>/setupTests.js',
  ],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testMatch: ["./integration-tests/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"]
};
