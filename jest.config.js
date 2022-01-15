export default {
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
}
