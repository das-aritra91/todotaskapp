module.exports = {
    preset: 'react-scripts',
    setupFilesAfterEnv: ['@testing-library/react/cleanup-after-each', '@testing-library/jest-dom/extend-expect'],
    testEnvironment: 'jsdom',
  };