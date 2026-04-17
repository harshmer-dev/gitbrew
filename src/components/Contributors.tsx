import React from 'react';
import { Box, Text } from 'ink';
import type { Contributor } from '../git/types.js';

interface ContributorsProps {
  contributors: Contributor[];
}

const Contributors: React.FC<ContributorsProps> = ({ contributors }) => {
  if (contributors.length === 0) {
    return (
      <Box marginBottom={1}>
        <Text dimColor>No contributors found in this time window.</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" marginBottom={1}>
      <Box marginBottom={1}>
        <Text bold color="yellow">
          CONTRIBUTORS
        </Text>
      </Box>

      {contributors.map((c, i) => (
        <Box key={c.email} gap={2}>
          <Text color="cyanBright">{i === 0 ? '❯' : ' '}</Text>

          <Box width={20}>
            <Text color={i === 0 ? 'cyanBright' : 'white'} bold={i === 0}>
              {c.name}
            </Text>
          </Box>

          <Box width={12}>
            <Text dimColor>{c.commits} commits</Text>
          </Box>

          <Box width={10}>
            <Text color="green">+{c.linesAdded}</Text>
          </Box>

          <Box width={10}>
            <Text color="red">-{c.linesRemoved}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Contributors;
