
module.exports = {
  verbose: false,
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  moduleDirectories: ["node_modules", "src"],
  roots: [
    "<rootDir>/src",
  ],
  testRegex: "(\\.|/)(test|spec)\\.(jsx?|tsx?)$",
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "test/fileMock.ts"
  },
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  globals: { "ts-jest": { isolatedModules: true } },
  setupFilesAfterEnv: ["<rootDir>/src/test/index.ts"],
};
