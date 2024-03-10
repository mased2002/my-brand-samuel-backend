// module.exports = {
//     transform: {
//         '^.+\\.tsx?$': 'ts-jest',
//     }
// }
import type {Config} from "jest";
const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node",
    collectCoverage: true,
    collectCoverageFrom:["./src/**"],
    coverageDirectory: "coverage",
    coverageReporters: ["json-summary", "text"],
    verbose:true,
    forceExit: true,
    coveragePathIgnorePatterns:[
        "./node_modules",
        "./coverage",
        "./.env"
    ],
    testPathIgnorePatterns:[
        "\\\\node_modules\\\\",
        "\\\\coverage\\\\",
        "\\\\.env\\\\"
    ]
}

export default config;