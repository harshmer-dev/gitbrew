import React from 'react';
import { Box, Text } from 'ink';
import type { FileStatusSummary } from '../git/types.js';

interface ChangesProps {
  currentChanges: FileStatusSummary[];
}

const getMark = (c: FileStatusSummary): string => {
  if (c.index === '?' && c.working_dir === '?') return '?';
  if (c.working_dir !== ' ') return c.working_dir;
  if (c.index !== ' ') return c.index;
  return '~';
};

const getLabel = (c: FileStatusSummary): string => {
  if (c.index === '?' && c.working_dir === '?') return 'untracked';
  if (c.index !== ' ' && c.working_dir !== ' ') return 'staged + modified';
  if (c.index !== ' ') return 'staged';
  return 'unstaged';
};

const getMarkColor = (mark: string): string => {
  if (mark === 'M') return 'yellow';
  if (mark === 'A') return 'green';
  if (mark === 'D') return 'red';
  if (mark === '?') return 'gray';
  return 'white';
};

const Changes: React.FC<ChangesProps> = ({ currentChanges }) => {
  if (currentChanges.length === 0) {
    return <></>;
  }

  return (
    <Box flexDirection="column" marginBottom={1}>
      <Box marginBottom={1}>
        <Text bold color="yellow">
          CURRENT CHANGES{' '}
        </Text>
        <Text dimColor>({currentChanges.length} files)</Text>
      </Box>

      {currentChanges.map((c) => {
        const mark = getMark(c);
        const label = getLabel(c);

        return (
          <Box key={c.path} gap={2}>
            <Text color={getMarkColor(mark)} bold>
              {mark}
            </Text>
            <Box width={35}>
              <Text color="white">
                {c.path.length > 33 ? '...' + c.path.slice(-30) : c.path}
              </Text>
            </Box>
            <Text dimColor>{label}</Text>
          </Box>
        );
      })}
    </Box>
  );
};

export default Changes;
