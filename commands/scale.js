const { readStackFile, writeStackFile, deployStack, parseAppEnv } = require('./utils')

const scale = (appEnv, services = []) => {
  const { appName, fullYmlPath, isStack } = parseAppEnv(appEnv)
  let stackFileContent = readStackFile(fullYmlPath)

  for (const serviceReplicasArg of services) {
    const [name, replicas] = serviceReplicasArg.split(':')
    const serviceConstantName = `${name.toUpperCase()}_REPLICAS`
    const regex = new RegExp(`replicas: \\$\{${serviceConstantName}:-[^}]+}`, 'g')
    stackFileContent = stackFileContent.replace(regex, `replicas: \${${serviceConstantName}:-${replicas}}`)
  }

  writeStackFile(fullYmlPath, stackFileContent)
  deployStack(appName, fullYmlPath, isStack)
}

module.exports = scale
