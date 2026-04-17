import React from 'react'
import { Box, Text } from 'ink'
import type { HotspotFile } from '../git/types.js'

interface HotspotsProps {
  hotspots: HotspotFile[]
}

const Hotspots: React.FC<HotspotsProps> = ({ hotspots }) => {
  if (hotspots.length === 0) {
    return (
      <Box marginBottom={1}>
        <Text dimColor>No hotspot files found in this time window.</Text>
      </Box>
    )
  }

  const max = hotspots[0].changes

  const getBar = (changes: number) => {
    const filled = Math.round((changes / max) * 10)
    return '█'.repeat(filled) + '░'.repeat(10 - filled)
  }

  return (
    <Box flexDirection="column" marginBottom={1}>
      <Box marginBottom={1}>
        <Text bold color="yellow">
          HOTSPOT FILES
        </Text>
      </Box>

      {hotspots.map((h, i) => (
        <Box key={h.file} gap={2}>
          <Text color="cyanBright">{i === 0 ? '❯' : ' '}</Text>

          <Box width={35}>
            <Text color={i === 0 ? 'cyanBright' : 'white'} bold={i === 0}>
              {h.file.length > 33 ? '...' + h.file.slice(-30) : h.file}
            </Text>
          </Box>

          <Text color="yellow">{getBar(h.changes)}</Text>

          <Text dimColor>{h.changes} changes</Text>
        </Box>
      ))}
    </Box>
  )
}

export default Hotspots
