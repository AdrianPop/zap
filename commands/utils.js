const { execSync } = require('child_process')
const fs = require('fs')
const path = require('node:path')

const parseAppEnv = (appEnv) => {
  const [app, env = ''] = appEnv.split(':')
  const appPath = app + (env.length ? `/${env}` : '')
  const stackPath = `apps/${appPath}/`
  const isStack = fs.existsSync(stackPath + 'docker-stack.yml')
  const isCompose = !isStack
  const fullYmlPath = isStack ? stackPath + 'docker-stack.yml' : stackPath + 'docker-compose.yml'
  const appName = app + (env.length ? `_${env}` : '')

  return { app, env, appName, appPath, fullYmlPath, isCompose, isStack }
}

const readStackFile = (path) => {
  try {
    return fs.readFileSync(path).toString()
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

const writeStackFile = (path, content) => {
  fs.writeFileSync(path, content)
}

const deployStack = (appName, path, isStack = false) => {
  const stackCommand = `docker stack deploy -c ${path} ${appName} --detach=false`
  const composeCommand = `docker compose -f ${path} up -d --force-recreate`
  const command = isStack ? stackCommand : composeCommand

  console.log(`Executing: ${command}`)

  try {
    execSync(command, { stdio: 'inherit' })
    console.log('OK.')
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

const rmStack = (appName, path, isStack = false) => {
  const stackCommand = `docker stack rm ${appName}`
  const composeCommand = `docker compose -f ${path} down`
  const command = isStack ? stackCommand : composeCommand

  console.log(`Executing: ${command}`)

  try {
    execSync(command, { stdio: 'inherit' })
    console.log('OK.')
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

module.exports = { readStackFile, writeStackFile, deployStack, parseAppEnv, rmStack }
