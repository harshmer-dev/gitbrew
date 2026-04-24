# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-04-24

### Added

- Initial release of `gitbrew` 🍺
- Repo overview section — total commits, contributors, files changed, lines added/removed, last commit time
- Contributor breakdown with commit counts and line stats
- Automatic deduplication of contributors by normalized name (handles the classic "same person, two emails" case)
- Hotspot files section — the 10 most-frequently-changed files with proportional bar visualization
- Activity sparkline — daily commit frequency with peak and average stats
- Current working tree changes section — shows staged, unstaged, and untracked files with status marks
- `--since <window>` flag for time-window filtering (`7d`, `30d`, `3m`, `1y`, etc.)
- `--author <name>` flag to filter by a specific contributor
- `--json` flag for raw JSON output (useful for piping to other tools)
- Beautiful terminal UI built with Ink (React for CLIs)
- Published to npm as `gitbrew`

[1.0.0]: https://github.com/harshmer-dev/gitbrew/releases/tag/v1.0.0
