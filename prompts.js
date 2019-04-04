// https://cli.vuejs.org/dev-guide/plugin-dev.html#prompts
// https://github.com/SBoudrias/Inquirer.js#documentation
const dependencies = require('./generator/config/dependencies.json');

function getDependencyChoices()  {
  // TODO: use https://www.npmjs.com/package/package-info to fill description automatically
  return Object.keys(dependencies.optional).map((name) => {
    const version = dependencies.optional[name];
    return {
      value: name,
      name: `${name} ${version}`,
      checked: true,
    }
  });
}
module.exports = [
  // {
  //   name: 'addPreloader',
  //   type: 'confirm',
  //   message: 'Add site preloader setup?',
  //   default: false
  // },
  // {
  //   name: 'addApiSkeleton',
  //   type: 'confirm',
  //   message: 'This project will consume a REST API',
  //   default: true,
  // },
  // {
  //   name: 'configureOptionalDeps',
  //   type: 'confirm',
  //   message: 'Configure optional dependencies?',
  //   default: false
  // },
  // {
  //   name: 'optionalDependencies',
  //   type: 'checkbox',
  //   message: '👉 Pick your packages',
  //   when: a => a.configureOptionalDeps,
  //   choices: getDependencyChoices(),
  // },
]