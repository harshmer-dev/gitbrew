import { simpleGit } from 'simple-git';
import path from 'path';
import { parseShortlog, sinceToGitArg, timeAgo } from './parse.js';
import type { GitBrewReport, Contributor, HotspotFile } from './types.js';

export const collect = async (
  cwd: string,
  since: string,
  authorFilter?: string
): Promise<GitBrewReport> => {
  const git = simpleGit(cwd);

  const isRepo = await git.checkIsRepo();
  if (!isRepo) throw new Error('Not a git repository.');

  const sinceArg = sinceToGitArg(since);
  const branch = (await git.revparse(['--abbrev-ref', 'HEAD'])).trim();
  const repoName = path.basename(cwd);

  // ── commit log ──────────────────────────────────────────────────
  const logArgs: Record<string, string> = { '--since': sinceArg };
  if (authorFilter) logArgs['--author'] = authorFilter;

  const log = await git.log(logArgs);
  const totalCommits = log.all.length;
  const lastCommitAgo = log.latest ? timeAgo(log.latest.date) : 'no commits';

  // ── activity by day ─────────────────────────────────────────────
  const activityByDay: Record<string, number> = {};
  for (const commit of log.all) {
    const day = commit.date.slice(0, 10);
    activityByDay[day] = (activityByDay[day] ?? 0) + 1;
  }

  // ── contributors (with dedup by name) ───────────────────────────
  const shortlogRaw = await git.raw([
    'shortlog',
    '-sne',
    `--since=${sinceArg}`,
    'HEAD',
  ]);
  const rawContributors = parseShortlog(shortlogRaw);

  const mergedMap = new Map<string, (typeof rawContributors)[0]>();
  for (const c of rawContributors) {
    const key = c.name.toLowerCase().trim();
    const existing = mergedMap.get(key);
    if (existing) {
      mergedMap.set(key, {
        ...existing,
        commits: existing.commits + c.commits,
      });
    } else {
      mergedMap.set(key, c);
    }
  }
  const dedupedContributors = Array.from(mergedMap.values()).sort(
    (a, b) => b.commits - a.commits
  );

  const contributors: Contributor[] = await Promise.all(
    dedupedContributors.map(async (c) => {
      // match by name so all emails of the same person get counted
      const diffRaw = await git.raw([
        'log',
        `--since=${sinceArg}`,
        `--author=${c.name}`,
        '--pretty=tformat:',
        '--numstat',
      ]);
      let linesAdded = 0;
      let linesRemoved = 0;
      for (const line of diffRaw.split('\n')) {
        const parts = line.trim().split('\t');
        if (parts.length >= 2) {
          linesAdded += parseInt(parts[0]) || 0;
          linesRemoved += parseInt(parts[1]) || 0;
        }
      }
      return { ...c, linesAdded, linesRemoved };
    })
  );

  // ── current changes ─────────────────────────────────────────────
  const changes = await git.status();
  const currentChanges = changes.files;

  // ── hotspot files ───────────────────────────────────────────────
  const nameOnlyRaw = await git.raw([
    'log',
    `--since=${sinceArg}`,
    '--name-only',
    '--pretty=format:',
  ]);

  const fileFreq: Record<string, number> = {};
  for (const line of nameOnlyRaw.split('\n')) {
    const f = line.trim();
    if (f) fileFreq[f] = (fileFreq[f] ?? 0) + 1;
  }

  const hotspots: HotspotFile[] = Object.entries(fileFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([file, changes]) => ({ file, changes }));

  // ── totals ───────────────────────────────────────────────────────
  const totalLinesAdded = contributors.reduce((s, c) => s + c.linesAdded, 0);
  const totalLinesRemoved = contributors.reduce(
    (s, c) => s + c.linesRemoved,
    0
  );
  const totalFilesChanged = Object.keys(fileFreq).length;

  return {
    repoName,
    branch,
    since,
    totalCommits,
    currentChanges,
    totalFilesChanged,
    totalLinesAdded,
    totalLinesRemoved,
    lastCommitAgo,
    contributors,
    hotspots,
    activityByDay,
  };
};
