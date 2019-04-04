const fs = require('fs');
const path = require('path');
const dependencies = require('./config/dependencies.json');
const middlewareManifest = require('./config/middleware-manifest.json');

function resolve(dir) {
  return path.join(__dirname, dir);
}

function getDependencies(config) {
  if (config.configureOptionalDeps) {
    const picks = config.optionalDependencies;
    return picks.reduce((out, key) => {
      out[key] = dependencies.optional[key];
      return out;
    }, dependencies.default);
  } else {
    // TODO: Merge with optional dependencies
    return dependencies.default;
  }
}

module.exports = (api, config) => {
  api.render(files => {
    // Remove default generator files from cli-service using manifest
    // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/generator
    middlewareManifest.removals.forEach(name => {
      delete files[name];
    });

    // Replace default vue.config.js with custom template content
    const vueConfig = resolve('config/vue.config.template.js');
    files['vue.config.js'] = fs.readFileSync(vueConfig, 'utf-8');

  });

  api.render('./templates/project-skeleton');
  if (config.addPreloader) {
    api.render('./templates/component-preloader');
  }

  api.extendPackage({
    dependencies: {
      ...getDependencies(config),
    },
  });
}