# 🐳 Dockrize
![npm version](https://img.shields.io/npm/v/dockrize)
![license](https://img.shields.io/npm/l/dockrize)
![downloads](https://img.shields.io/npm/dm/dockrize)
![GitHub stars](https://img.shields.io/github/stars/Kishan-Agarwal-28/dockrize?style=social)
![GitHub forks](https://img.shields.io/github/forks/Kishan-Agarwal-28/dockrize?style=social)
![GitHub issues](https://img.shields.io/github/issues/Kishan-Agarwal-28/dockrize)
![visitors](https://visitor-badge.glitch.me/badge?page_id=Kishan-Agarwal-28/dockrize)

A powerful command-line tool to automatically generate Docker configurations for popular web frameworks. With dockrize, you can quickly containerize your applications with best-practice configurations.

## ✨ Features

- 🚀 Quick setup with interactive CLI
- 🎯 Supports multiple popular frameworks:
  - Angular
  - Express.js
  - Next.js
  - Nuxt.js
  - Preact
  - React
  - Remix
  - Solid
  - Svelte
  - Vue
- 📦 Generates production-ready Dockerfile and docker-compose configurations
- 🔄 Live reload support with watch mode
- 🛠️ Automatic Docker image building
- ⚡ Run container commands with ease

## 🚀 Installation

```bash
npm install -g dockrize
```

## 📋 Usage

### Initialize Docker Configuration

```bash
dockrize --init
```

This will start an interactive prompt where you can:
1. Choose your framework
2. Specify if you want to build the Docker image
3. Set the image tag name
4. Configure automatic container running on changes
5. Set the run command for your container

### Watch Mode

```bash
dockrize -w
# or
dockrize --watch
```

Watch mode monitors your `.dockrize` configuration file and automatically rebuilds/runs your container when changes are detected.

## 🏗️ Generated Files

For each framework, dockrize generates:
- `Dockerfile` - Optimized for production builds
- `docker-compose.yml` - Container orchestration configuration
- `nginx.conf` - Web server configuration (for frameworks that need it)
- `.dockerignore` - Properly configured ignore patterns

## 💡 Example Configuration

The `.dockrize` file contains your project's Docker configuration:

```json
{
  "template": "react",
  "package": "dockrize",
  "version": "1.0.0",
  "license": "MIT",
  "author": "Cosmology is fun!",
  "timestamp": "2025-05-29T00:00:00.000Z",
  "tags": "my-app",
  "run": "docker-compose up"
}
```

## 🛡️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

Created by [Kishan Agarwal](https://github.com/Kishan-Agarwal-28)

## 🤝 Contributing

Contributions, issues and feature requests are welcome! Feel free to check the [issues page](https://github.com/Kishan-Agarwal-28/simple-auth-cli/issues).

## ⭐ Show your support

Give a ⭐️ if this project helped you!

## 📝 Features by Framework

Each framework comes with optimized configurations:

### Angular
- Production-grade Nginx configuration
- Static asset caching
- SPA routing support

### Express.js
- Production Node.js setup
- Automatic volume mounting for logs
- WebSocket support

### Next.js
- Optimized production builds
- Static and server-side rendering support
- Asset caching configuration

### Nuxt.js
- SSR-ready configuration
- Production optimization
- Static asset handling

### React/Preact
- Multi-stage builds
- Production optimization
- SPA routing support

### Remix
- SSR configuration
- Production-ready setup
- Static asset optimization

### Solid/Svelte/Vue
- Production builds
- Static file serving
- SPA routing support
