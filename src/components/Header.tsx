import React from 'react'
import { Box, Text } from 'ink'
import Gradient from 'ink-gradient'
import BigText from 'ink-big-text'

interface HeaderProps {
  repoName?: string
  branch?: string
}

const Header: React.FC<HeaderProps> = ({ repoName, branch }) => {
  return (
    <Box flexDirection="column">
      <Gradient colors={['#f7971e', '#ffd200', '#00c6ff', '#0072ff']}>
        <BigText text="gitbrew" font="block" />
      </Gradient>

      <Box gap={1}>
        <Text color="cyanBright" italic>
          🍺 Repo insights, brewed fresh in your terminal
        </Text>
      </Box>

      {repoName && branch && (
        <Box marginTop={1} gap={2}>
          <Box gap={1}>
            <Text dimColor>repo</Text>
            <Text color="yellow" bold>
              {repoName}
            </Text>
          </Box>
          <Box gap={1}>
            <Text dimColor>branch</Text>
            <Text color="green" bold>
              {branch}
            </Text>
          </Box>
        </Box>
      )}

      <Box marginTop={1}>
        <Text dimColor>
          ─────────────────────────────────────────────────────
        </Text>
      </Box>
    </Box>
  )
}

export default Header
