import React from 'react';
import { Box, Text } from 'ink';
import { FileStatusSummary } from '../git/types.js';

interface ChangesProps {
  currentChanges: FileStatusSummary[];
}

const Changes: React.FC<ChangesProps> = ({ currentChanges }) => {
  if (currentChanges.length === 0) <></>;

  return (
    <Box flexDirection="column" marginBottom={1}>
      <Box marginBottom={1}>
        <Text bold color="yellow">
          CURRENT CHANGES{' '}
        </Text>
      </Box>

      {currentChanges.map((c) => {
        const mark = c.working_dir === '?' ? 'U' : c.working_dir;

        return (
          <Box gap={2}>
            <Text color={'white'}>{`${c.path}  (${c.working_dir})`}</Text>
          </Box>
        );
      })}
    </Box>
  );
};

export default Changes;
