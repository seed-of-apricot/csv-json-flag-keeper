import * as core from '@actions/core';
import * as github from '@actions/github';
import stringify from 'csv-stringify/lib/sync';
import { writeFile } from 'fs';

export const writeNewSummary = async (summary: Object[]) => {
  console.log(summary);
  const str = stringify(summary, { header: true });
  console.log(str);
  const path = core.getInput('summaryPath') || './summary.csv';

  writeFile(path, str, () => {});
  return 1;
};
