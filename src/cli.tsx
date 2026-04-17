#!/usr/bin/env node
import React from 'react'
import { render } from 'ink'
import { Command } from 'commander'
import App from './app.js'

const program = new Command()

program
  .name('gitbrew')
  .description('Repo activity and insights, brewed fresh in your terminal')
  .version('1.0.0')
  .option('-s, --since <window>', 'time window e.g. 7d, 30d, 3m, 1y', '30d')
  .option('-a, --author <name>', 'filter by author name or email')
  .option('--json', 'output raw JSON instead of UI')
  .action((opts) => {
    if (opts.json) {
      import('./git/collect.js').then(({ collect }) =>
        collect(process.cwd(), opts.since, opts.author)
          .then((report) => console.log(JSON.stringify(report, null, 2)))
          .catch((err) => {
            console.error(err.message)
            process.exit(1)
          })
      )
      return
    }

    render(<App since={opts.since} author={opts.author} />)
  })

program.parse(process.argv)
