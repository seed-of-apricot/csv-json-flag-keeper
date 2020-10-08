import * as core from '@actions/core';
import * as github from '@actions/github';
import { OctokitResponse, ReposGetCommitResponseData } from '@octokit/types';

export const getCommits = async (): Promise<
  OctokitResponse<ReposGetCommitResponseData>[]
> => {
  const token = core.getInput('GITHUB_TOKEN');
  const octokit = github.getOctokit(token);

  const { repo, payload } = github.context;

  const commitIds = payload.commits.map((item: { id: string }) => item.id);

  return Promise.all(
    commitIds.map(
      async (
        item: string,
      ): Promise<OctokitResponse<ReposGetCommitResponseData>> =>
        octokit.repos.getCommit({
          ...repo,
          ref: item,
        }),
    ),
  );
};
