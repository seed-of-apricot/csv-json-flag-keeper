import * as core from '@actions/core';
import * as github from '@actions/github';
import { OctokitResponse, ReposGetCommitResponseData } from '@octokit/types';

export const getCommits = async (): Promise<
  OctokitResponse<ReposGetCommitResponseData>[]
> => {
  const token = core.getInput('GITHUB_TOKEN');
  const octokit = github.getOctokit(token);

  const { repo, payload } = github.context;

  console.log(payload);

  const commitIds = async (): Promise<string[]> => {
    if (payload.pull_request) {
      return (
        await octokit.pulls.listCommits({
          ...repo,
          pull_number: payload.number,
        })
      ).data.map(item => item.sha);
    } else {
      return payload.commits.map((item: { id: string }) => item.id);
    }
  };
  console.log(await commitIds());

  return Promise.all(
    (await commitIds()).map(
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
