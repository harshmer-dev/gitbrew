export interface Contributor {
  name: string
  email: string
  commits: number
  linesAdded: number
  linesRemoved: number
}

export interface HotspotFile {
  file: string
  changes: number
}

export interface GitBrewReport {
  repoName: string
  branch: string
  since: string
  totalCommits: number
  totalFilesChanged: number
  totalLinesAdded: number
  totalLinesRemoved: number
  lastCommitAgo: string
  contributors: Contributor[]
  hotspots: HotspotFile[]
  activityByDay: Record<string, number>
}
