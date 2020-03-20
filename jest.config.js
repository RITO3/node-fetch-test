module.exports = {
  roots: ["./src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts$",
  collectCoverage: true,
  coverageDirectory: "<rootDir>/result/jest/coverage",
  coverageReporters: ["html", "cobertura"],
  collectCoverageFrom: [
    "./src/**/*.ts",
    "!./src/**/*.d.ts",
    "!./src/**/*.spec.ts",
    "!./src/**/*.test.ts",
    "!./src/**/__*__/*"
  ],
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "./result/jest",
        outputName: "junit.xml"
      }
    ],
    [
      "jest-html-reporters",
      {
        publicPath: "./result/jest/html-report",
        filename: "report.html",
        expand: true
      }
    ]
  ]
};
