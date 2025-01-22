export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transpile TypeScript
    '^.+\\.jsx?$': 'babel-jest', // Transpile JavaScript if needed
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy', // Mock CSS imports
  },
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};