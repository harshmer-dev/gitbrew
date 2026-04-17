import React from 'react';
import { Box, Text } from 'ink';
import type { GitBrewReport } from '../git/types.js';

interface OverviewProps {
  report: GitBrewReport;
}

const Stat: React.FC<{ label: string; value: string; color?: string }> = ({
  label,
  value,
  color = 'white',
}) => (
  <Box flexDirection="column" marginRight={4}>
    <Text dimColor>{label}</Text>
    <Text color={color} bold>
      {value}
    </Text>
  </Box>
);

const Overview: React.FC<OverviewProps> = ({ report }) => {
  return (
    <Box flexDirection="column" marginBottom={1}>
      <Box marginBottom={1}>
        <Text bold color="yellow">
          OVERVIEW{' '}
        </Text>
        <Text dimColor>(last {report.since})</Text>
      </Box>

      <Box>
        <Stat
          label="Commits"
          value={String(report.totalCommits)}
          color="cyanBright"
        />
        <Stat
          label="Contributors"
          value={String(report.contributors.length)}
          color="cyanBright"
        />
        <Stat
          label="Files changed"
          value={String(report.totalFilesChanged)}
          color="cyanBright"
        />
        <Stat
          label="Lines added"
          value={`+${report.totalLinesAdded}`}
          color="green"
        />
        <Stat
          label="Lines removed"
          value={`-${report.totalLinesRemoved}`}
          color="red"
        />
        <Stat label="Last commit" value={report.lastCommitAgo} color="yellow" />
      </Box>
    </Box>
  );
};

export default Overview;
