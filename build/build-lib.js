const shelljs = require('shelljs');
const signale = require('signale');

const { Signale } = signale;

const tasks = [
  'rm -rf lib/ es/',
  'node ./build/build-esmodule.js',
  'webpack --config build/webpack.build.js'
  // 'webpack --config build/webpack.build.js -p'
];

tasks.forEach(task => {
  signale.start(task);

  const interactive = new Signale({ interactive: true });
  interactive.pending(task);
  const { code } = shelljs.exec(task);
  const success = code === 0;
  if (success) {
    interactive.success(task);
  } else {
    interactive.error(task);
    process.exit(code);
  }
  return true;
});
