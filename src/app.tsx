import React, { useEffect, useState } from 'react';
import { Box, useApp } from 'ink';
import { collect } from './git/collect.js';
import type { GitBrewReport } from './git/types.js';
import Header from './components/Header.js';
import Overview from './components/Overview.js';
import Activity from './components/Activity.js';
import Contributors from './components/Contributors.js';
import Hotspots from './components/Hotspots.js';
import ErrorDisplay from './components/ErrorDisplay.js';
import Spinner from './components/Spinner.js';
import Changes from './components/Changes.js';

interface AppProps {
  since: string;
  author?: string;
}

type Phase = 'LOADING' | 'REPORT' | 'ERROR';

const App: React.FC<AppProps> = ({ since, author }) => {
  const { exit } = useApp();
  const [phase, setPhase] = useState<Phase>('LOADING');
  const [report, setReport] = useState<GitBrewReport | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    collect(process.cwd(), since, author)
      .then((r) => {
        setReport(r);
        setPhase('REPORT');
      })
      .catch((e) => {
        setError(e.message);
        setPhase('ERROR');
      });
  }, []);

  useEffect(() => {
    if (phase === 'REPORT' || phase === 'ERROR') {
      setTimeout(() => exit(), 100);
    }
  }, [phase]);

  return (
    <Box flexDirection="column" padding={1}>
      <Header repoName={report?.repoName} branch={report?.branch} />
      {phase === 'LOADING' && <Spinner label="Brewing your repo insights..." />}
      {phase === 'ERROR' && <ErrorDisplay message={error} />}
      {phase === 'REPORT' && report && (
        <Box flexDirection="column" gap={1}>
          <Overview report={report} />
          <Activity activityByDay={report.activityByDay} since={since} />
          <Changes currentChanges={report.currentChanges} />
          <Contributors contributors={report.contributors} />
          <Hotspots hotspots={report.hotspots} />
        </Box>
      )}
    </Box>
  );
};

export default App;
