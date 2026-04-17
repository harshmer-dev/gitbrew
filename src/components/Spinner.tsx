import React from 'react';
import { Box, Text } from 'ink';
import SpinnerLib from 'ink-spinner';

interface SpinnerProps {
  label: string;
}

const Spinner: React.FC<SpinnerProps> = ({ label }) => {
  return (
    <Box marginTop={1} gap={1}>
      <Text color="yellow">
        <SpinnerLib type="dots" />
      </Text>
      <Text bold color="white">
        {label}
      </Text>
    </Box>
  );
};

export default Spinner;
