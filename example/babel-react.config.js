module.exports = api => {
  api.cache(true);
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          useBuiltIns: 'usage',
          corejs: 3
        }
      ],
      '@babel/preset-react'
    ],
    plugins: [
      [
        'import',
        {
          libraryName: 'dpl-mobile',
          style: 'css'
        },
        'dpl-mobile'
      ],
      [
        'import',
        {
          libraryName: 'otc-comp-mobile',
          libraryDirectory: 'lib',
          style: name => {
            return `${name}/index.css`;
          },
          camel2DashComponentName: false
        },
        'otc-comp-mobile'
      ]
    ]
  };
};
