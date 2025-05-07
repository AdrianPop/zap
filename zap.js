#!/usr/bin/env node

const { Command } = require('commander')
const deployCommand = require('./commands/deploy')
const scaleCommand = require('./commands/scale')
const rmCommand = require('./commands/rm')

const program = new Command()

program
  .command('deploy')
  .alias('dep')
  .description('Deploy the services from the stack')
  .argument('<host>', 'Target host alias to deploy to')
  .argument('<appEnv>', 'Application name and environment, e.g., x1:dev')
  .argument('[service:version...]')
  .action(deployCommand)

program
  .command('scale')
  .alias('sc')
  .description('Scale the services from the stack')
  .argument('<host>', 'Target host alias to deploy to')
  .argument('<appEnv>', 'Application name and environment, e.g., x1:prod')
  .argument('<service:replicas...>')
  .action(scaleCommand)

program
  .command('rm')
  .description('Remove the stack')
  .argument('<host>', 'Target host alias to deploy to')
  .argument('<appEnv>', 'Application name and environment, e.g., x1:prod')
  .action(rmCommand)

program.parse(process.argv)
