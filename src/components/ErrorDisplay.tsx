import React from 'react';
import { Box, Text } from 'ink';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      borderColor="red"
      padding={1}
      width={60}
    >
      <Text color="red" bold>
        🍺✖ The brew spilled!
      </Text>
      <Box marginTop={1}>
        <Text color="red" dimColor>
          {message}
        </Text>
      </Box>
      <Box marginTop={1}>
        <Text dimColor italic>
          Make sure you are inside a git repository and try again.
        </Text>
      </Box>
    </Box>
  );
};

export default ErrorDisplay;
