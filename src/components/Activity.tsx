import React from 'react'
import { Box, Text } from 'ink'
import sparkly from 'sparkly'

interface ActivityProps {
  activityByDay: Record<string, number>
  since: string
}

const Activity: React.FC<ActivityProps> = ({ activityByDay, since }) => {
  // sort days chronologically and extract counts
  const sorted = Object.entries(activityByDay).sort(([a], [b]) =>
    a.localeCompare(b)
  )
  const counts = sorted.map(([, count]) => count)

  if (counts.length === 0) {
    return (
      <Box marginBottom={1}>
        <Text dimColor>No activity in this time window.</Text>
      </Box>
    )
  }

  const spark = sparkly(counts)

  return (
    <Box flexDirection="column" marginBottom={1}>
      <Box marginBottom={1}>
        <Text bold color="yellow">
          ACTIVITY{' '}
        </Text>
        <Text dimColor>(last {since})</Text>
      </Box>

      <Box gap={2}>
        <Text dimColor>{sorted[0][0].slice(0, 7)}</Text>
        <Text color="cyanBright">{spark}</Text>
        <Text dimColor>{sorted[sorted.length - 1][0].slice(0, 7)}</Text>
      </Box>

      <Box marginTop={1} gap={2}>
        <Text dimColor italic>
          peak {Math.max(...counts)} commits/day
        </Text>
        <Text dimColor italic>
          avg {Math.round(counts.reduce((a, b) => a + b, 0) / counts.length)}{' '}
          commits/day
        </Text>
      </Box>
    </Box>
  )
}

export default Activity
