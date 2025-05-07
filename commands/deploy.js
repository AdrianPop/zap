const { readStackFile, parseAppEnv, writeStackFile, deployStack } = require('./utils')

const deploy = (host, appEnv, services = []) => {
  const { appName, fullYmlPath, isStack } = parseAppEnv(appEnv)

  let stackFileContent = readStackFile(fullYmlPath)

  for (const serviceVersionArg of services) {
    const [name, version] = serviceVersionArg.split(':')
    const serviceNameConstant = `${name.toUpperCase()}_IMAGE`
    const regex = new RegExp(`image: \\$\{${serviceNameConstant}:-([^:]+):([^}]+)}`, 'g')
    stackFileContent = stackFileContent.replace(regex, `image: \${${serviceNameConstant}:-$1:${version}}`)
  }

  const appNameConstant = `APP_NAME`
  const networkRegex = new RegExp(`name: \\$\{${appNameConstant}:-[^}]+}`, 'g')

  stackFileContent = stackFileContent.replace(networkRegex, `name: \${${appNameConstant}:-${appName}}`)

  writeStackFile(fullYmlPath, stackFileContent)

  deployStack(host, appName, fullYmlPath, isStack)
}

module.exports = deploy
