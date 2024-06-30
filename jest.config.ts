module.exports = {
  testEnvironment: "jsdom",
  transform: {
    ".(ts|tsx)": "ts-jest",
    // ".+\\.(css|styl|less|sass|scss)$": "jest-css-modules-transform",
  },
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["./jest.setup.ts"],
};
