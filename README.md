# 🍺 gitbrew

> Repo activity and insights, brewed fresh in your terminal.

![version](https://img.shields.io/npm/v/gitbrew)

---

## What is gitbrew?

`gitbrew` is a CLI tool that gives you a beautiful, instant summary of any git repository's activity — contributors, hotspot files, commit frequency, and more. All in one command, right in your terminal.

No config. No setup. Just run it inside any git repo.

---

## What it shows

![Demo](./assets/demo.gif)

## Usage

```bash
npx gitbrew
```

Or install globally:

```bash
npm install -g gitbrew
```

Then just run inside any git repo:

```bash
gitbrew
```

---

## Options

| Flag                   | Description                           | Default |
| ---------------------- | ------------------------------------- | ------- |
| `-s, --since <window>` | Time window — `7d`, `30d`, `3m`, `1y` | `30d`   |
| `-a, --author <name>`  | Filter by author name or email        | —       |
| `--json`               | Output raw JSON instead of UI         | —       |
| `-v, --version`        | Show version number                   | —       |
| `-h, --help`           | Show help                             | —       |

---

## Examples

```bash
# last 30 days (default)
gitbrew

# last 7 days
gitbrew --since 7d

# last 3 months
gitbrew --since 3m

# filter by author
gitbrew --author harsh

# pipe to a file or other tools
gitbrew --json > report.json
```

---

## Tech Stack

- [Node.js](https://nodejs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Ink](https://github.com/vadimdemedes/ink) — React for CLIs
- [simple-git](https://github.com/steveukx/git-js) — programmatic git
- [sparkly](https://github.com/sindresorhus/sparkly) — terminal sparklines
- [Commander.js](https://github.com/tj/commander.js) — CLI flags

---

## Roadmap

- [x] Repo overview (commits, lines, contributors)
- [x] Contributor breakdown with line stats
- [x] Hotspot files
- [x] Activity sparkline
- [x] Current working tree changes
- [x] `--since` time window flag
- [x] `--author` filter
- [x] `--json` output
- [ ] `gitbrew compare <branch1> <branch2>`
- [ ] `gitbrew export` — save report as markdown
- [ ] `gitbrew watch` — live auto-refresh mode

---

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

---

## Authors

- **Harsh Mer** — [@harshmer-dev](https://github.com/harshmer-dev)

## License

MIT © [Harsh Mer](https://github.com/harshmer-dev)

See [LICENSE](./LICENSE) for details.
