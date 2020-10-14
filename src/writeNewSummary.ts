import * as core from '@actions/core';
import * as github from '@actions/github';
import stringify from 'csv-stringify/lib/sync';
import { writeFile } from 'fs';

export const writeNewSummary = async (summary: Object[]) => {
  const columns = summary
    .flatMap(item => Object.keys(item))
    .filter((item, index, array) => array.indexOf(item) === index);
  const str = stringify(summary, { header: true, columns });

  const path = core.getInput('summaryPath') || './summary.csv';

  writeFile(path, str, () => {});
  return 1;
};
