import * as core from '@actions/core';
import { getCommits } from './getCommits';
import { getFiles } from './getFiles';
import { getSummary } from './getSummary';
import { processFiles } from './processFiles';
import { writeNewSummary } from './writeNewSummary';

const main = async (): Promise<void> => {
  try {
    console.log('Initializing.');

    const commits = await getCommits();

    if (!commits) {
      return;
    }

    const summary = getSummary();
    const files = getFiles(commits);
    const newSummary = await processFiles(
      ((await summary).data as unknown) as string,
      (await files).map(item => (item.data as unknown) as string),
    );
    writeNewSummary(newSummary);
  } catch (error) {
    core.setFailed(error.message);
  }
};

main();
