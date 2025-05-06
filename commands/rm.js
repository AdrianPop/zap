const { parseAppEnv, rmStack } = require('./utils')

const rm = (appEnv) => {
  const { appName, fullYmlPath, isStack } = parseAppEnv(appEnv)
  rmStack(appName, fullYmlPath, isStack)
}

module.exports = rm
