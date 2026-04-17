import { collect } from './git/collect.js';

const report = await collect(process.cwd(), '30d');
console.log(JSON.stringify(report, null, 2));
