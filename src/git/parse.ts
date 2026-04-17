export interface RawContributor {
  name: string;
  email: string;
  commits: number;
}

export const parseShortlog = (raw: string): RawContributor[] => {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const match = line.match(/^\s*(\d+)\s+(.+?)\s+<(.+?)>$/);
      if (!match) return null;
      return {
        commits: parseInt(match[1], 10),
        name: match[2].trim(),
        email: match[3].trim(),
      };
    })
    .filter(Boolean) as RawContributor[];
};

export const timeAgo = (isoDate: string): string => {
  const diff = Date.now() - new Date(isoDate).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

export const sinceToGitArg = (since: string): string => {
  const match = since.match(/^(\d+)(d|w|m|y)$/);
  if (!match) return '30 days ago';
  const [, n, unit] = match;
  const map: Record<string, string> = {
    d: 'days',
    w: 'weeks',
    m: 'months',
    y: 'years',
  };
  return `${n} ${map[unit]} ago`;
};
