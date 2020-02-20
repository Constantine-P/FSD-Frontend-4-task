module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '\\.(scss|sass|css|styl)$': 'identity-obj-proxy',
  },
};
