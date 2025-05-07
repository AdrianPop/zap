const { parseAppEnv, rmStack } = require('./utils')

const rm = (host, appEnv) => {
  const { appName, fullYmlPath, isStack } = parseAppEnv(appEnv)

  rmStack(host, appName, fullYmlPath, isStack)
}

module.exports = rm
