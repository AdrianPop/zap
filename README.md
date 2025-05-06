# Project Usage

## Getting Started

1. Add a folder inside the `apps` directory.
2. Place your Docker stack YAML file inside this new folder.

## Commands

### Deploy an app fully

```sh
node cli.js deploy <app>:[env]

# Example: deploy a full app from apps/myapp/docker-stack.yml
node cli.js deploy myapp
make deploy myapp

# Example: deploy a full app from apps/myapp/dev/docker-stack.yml
make deploy myapp:dev
```

### Update containers from a specific app

```sh
node cli.js deploy <app>:[env] [service:version...]

# Example: update nginx service to version 1.27 from apps/myapp/docker-stack.yml
node cli.js deploy myapp nginx:1.27
make deploy myapp:prod nginx:1.27
```

### Scale a service from an app

```sh
node cli.js scale <stack>:[env] [service:version...]

# Example: scale nginx service to 2 replicas from apps/myapp/docker-stack.yml
node cli.js scale myapp nginx:2
make scale myapp nginx:2
```

### Remove a service from an app

```sh
node cli.js rm <stack>:[env]

# Example: remove entire app
node cli.js rm myapp:prod
make rm myapp:prod
```
