# Scripting Official Documentation Project

## Project Overview

Generate web documentation through `Scripting Documentation` (Scripting App's default script), built with [Rspress](https://rspress.dev/) as a static site.

## Directory Structure

```
.
├── .github/workflows    # GitHub Actions deployment configuration
├── docs/                # Generated documentation directory
│   ├── App Store/       # App Store version documentation
│   │   ├── en/          # English documentation
│   │   └── zh/          # Chinese documentation
│   └── TestFlight/      # TestFlight version documentation
├── scripting/           # Scripting App script resources
│   ├── App Store/       # App Store version scripts
│   └── TestFlight/      # TestFlight version scripts
├── scripts/             # Documentation generation scripts
│   ├── docs.js          # App Store documentation generation script
│   └── docs-tf.js       # TestFlight documentation generation script
├── package.json         # Project dependencies and scripts
├── rspress.config.ts    # Rspress configuration file
└── README.md            # Project documentation
```

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js
- Scripting App's default script "Scripting Documentation"

### Install Dependencies

```bash
bun install
```

### Generate Documentation

1. Place `Scripting Documentation` (Scripting App's default script) in the project root directory and extract it

2. Run the documentation generation command:

```bash
bun run generate:docs
```

3. Run the build command:

```bash
bun run build
```

### Local Preview

```bash
bun run dev
```

Visit http://localhost:5173 to preview the documentation.

## Documentation Generation Process

1. **Extract Script**: Extract script files from `scripting/App Store/Scripting Documentation.scripting`
2. **Read Configuration**: Read document structure configuration from the extracted `doc.json` file
3. **Generate Markdown**: Generate multilingual (en/zh) Markdown documents based on configuration
4. **Build Website**: Build Markdown files into a static website using Rspress

## Version Documentation

The project supports two versions of documentation:

- **App Store**: Official version documentation (default)
- **TestFlight**: Test version documentation (includes latest features)

### Generate TestFlight Documentation

```bash
bun run generate:docs:tf
```

### Build TestFlight Documentation

```bash
bun run build:fun
```

## Deployment

Documentation is automatically deployed to GitHub Pages via GitHub Actions. Deployment configuration is located in the `.github/workflows/` directory.

### Manual Deployment

```bash
bun run deploy
```

## Skills System

Scripting App supports a skills system that allows extending application functionality. Skills are independent script packages that can:

- Provide native API wrappers
- Create custom UI components
- Integrate third-party services
- Extend automation capabilities

### Skills Repository

Official skills are maintained in the [ScriptingApp/skills](https://github.com/ScriptingApp/skills) repository. This repository contains a collection of ready-to-use skills that extend Scripting App's functionality.

### Using Skills

In Scripting App, skills can be used in the following ways:

1. **Direct Call**: Import and use APIs provided by skills in scripts
2. **AI Integration**: AI assistants can automatically call skills to complete complex tasks
3. **Automation Workflows**: Integrate skill functions in Shortcuts

## Project Maintenance

This documentation project is maintained by the Scripting App developer. For bug reports or feature requests related to the documentation, please open an issue in this repository.

### Contributing to Skills

If you'd like to contribute new skills or improve existing ones, please visit the [ScriptingApp/skills](https://github.com/ScriptingApp/skills) repository and follow the contribution guidelines there.

## Related Projects

- [ScriptingApp/Community-Scripts](https://github.com/ScriptingApp/Community-Scripts) - Community script sharing
- [ScriptingApp/scripting-app-lib](https://github.com/ScriptingApp/scripting-app-lib) - Scripting App library modules
- [ScriptingApp/Package-Manager](https://github.com/ScriptingApp/Package-Manager) - Package manager

## License

MIT License