import * as core from '@actions/core';
import { getCommits } from './getCommits';
import { getFiles } from './getFiles';
import { getSummary } from './getSummary';
import { processFiles } from './processFiles';
import { writeNewSummary } from './writeNewSummary';

const main = async (): Promise<void> => {
  try {
    console.log('initialized');

    const commits = await getCommits();

    console.log('commit has been retrieved');

    if (!commits) {
      console.log('no commits');
      return;
    }

    console.log(commits);

    const summary = getSummary();
    console.log('summary has been retrieved');
    const files = getFiles(commits);
    console.log('files have been retrieved');
    const newSummary = processFiles(
      ((await summary).data as unknown) as string,
      (await files).map(item => ({
        data: item.data.content,
        title: item.data.path.replace(/^.*\//g, '').split('.')[0],
      })),
    );
    console.log('new summary has been compiled');
    writeNewSummary(await newSummary);
    console.log('new summary has been written');
  } catch (error) {
    console.log(error);
    core.setFailed(error.message);
  }
};

main();
