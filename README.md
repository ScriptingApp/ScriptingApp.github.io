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

### Skills Directory Structure

```
/var/mobile/Library/Mobile Documents/iCloud~com~thomfang~Scripting/Documents/scripting-skills/
├── ios-calendar/        # Calendar management skill
├── ios-health/          # Health data skill
├── ios-location/        # Location services skill
├── ios-notifications/   # Notification management skill
├── ios-reminders/       # Reminders skill
├── isomorphic-git/      # Git version control skill
└── ...                  # Other skills
```

### Using Skills

In Scripting App, skills can be used in the following ways:

1. **Direct Call**: Import and use APIs provided by skills in scripts
2. **AI Integration**: AI assistants can automatically call skills to complete complex tasks
3. **Automation Workflows**: Integrate skill functions in Shortcuts

## Contributing Guidelines

### Adding New Documentation

1. Add new documentation files in the `scripting/App Store/Scripting Documentation/` directory
2. Update the `doc.json` configuration file to add new documentation entries
3. Run `bun run generate:docs` to regenerate documentation
4. Submit a Pull Request

### Modifying Existing Documentation

1. Edit Markdown files in the `docs/` directory
2. Run `bun run build` to verify changes
3. Submit a Pull Request

### Adding New Skills

1. Create a new skill project in Scripting App
2. Write a `SKILL.md` file defining how to use the skill
3. Submit to the [ScriptingApp/Community-Scripts](https://github.com/ScriptingApp/Community-Scripts) repository

## Related Projects

- [ScriptingApp/Community-Scripts](https://github.com/ScriptingApp/Community-Scripts) - Community script sharing
- [ScriptingApp/scripting-app-lib](https://github.com/ScriptingApp/scripting-app-lib) - Scripting App library modules
- [ScriptingApp/Package-Manager](https://github.com/ScriptingApp/Package-Manager) - Package manager

## License

MIT License