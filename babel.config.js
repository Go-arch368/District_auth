module.exports = {
    presets: [
      ['next/babel', {
        'preset-react': {
          runtime: 'automatic',
          importSource: '@emotion/react',
        },
      }],
      '@babel/preset-typescript',
    ],
    plugins: [
      '@babel/plugin-transform-modules-commonjs',
      '@emotion/babel-plugin',
    ],
  }