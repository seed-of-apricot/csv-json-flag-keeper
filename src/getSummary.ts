import * as core from '@actions/core';
import * as github from '@actions/github';
import axios from 'axios';
import { convertFiles } from './convertFiles';

export const getSummary = async (): Promise<{
  data: string | Object;
  title: string;
}> => {
  const token = core.getInput('GITHUB_TOKEN');
  const octokit = github.getOctokit(token);

  const path = core.getInput('summaryPath');
  const file = await octokit.repos.getContent({
    ...github.context.repo,
    ref: github.context.sha,
    path,
  });

  const contents = convertFiles(file.data.path)(
    await axios.get(file.data.download_url),
  );

  if (!contents) {
    core.setFailed('invalid summary contents!');
  }

  return contents;
};
