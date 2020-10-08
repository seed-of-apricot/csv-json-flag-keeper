import * as core from '@actions/core';
import * as github from '@actions/github';
import { OctokitResponse, ReposGetContentResponseData } from '@octokit/types';

export const getSummary = async (): Promise<
  OctokitResponse<ReposGetContentResponseData>
> => {
  const token = core.getInput('myToken');
  const octokit = github.getOctokit(token);

  const path = core.getInput('summaryPath');
  return octokit.repos.getContent({
    ...github.context.repo,
    ref: github.context.ref,
    headers: { accept: 'application/vnd.github.v3.raw' },
    path,
  });
};
