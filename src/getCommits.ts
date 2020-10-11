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
    switch (payload.action) {
      case 'push':
        return payload.commits.map((item: { id: string }) => item.id);
      case 'pull_request':
        return (
          await octokit.pulls.listCommits({
            ...repo,
            pull_number: payload.pull_request!.number,
          })
        ).data.map(item => item.sha);
      default:
        return ['null'];
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
