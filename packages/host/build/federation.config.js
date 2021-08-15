const dependencies = require('../package.json').dependencies;

const shared = {
  vue: {
    requiredVersion: dependencies.vue
  }
};

const federationConfig = ({ isServer }) => {
  return {
    name: 'host',
    remotes: {
      'remote': isServer
        ? 'remote@http://localhost:3001/node/remoteEntry.js'
        : 'remote@http://localhost:3001/web/remoteEntry.js'
    },
    shared
  };
};

module.exports = { federationConfig };
