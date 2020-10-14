import * as core from '@actions/core';
import * as github from '@actions/github';
import {
  OctokitResponse,
  ReposGetCommitResponseData,
  ReposGetContentResponseData,
} from '@octokit/types';
import globToRegex from 'glob-to-regExp';

export const getFiles = async (
  commits: OctokitResponse<ReposGetCommitResponseData>[],
): Promise<OctokitResponse<ReposGetContentResponseData>[]> => {
  const token = core.getInput('GITHUB_TOKEN');
  const path = globToRegex(core.getInput('flagPath'), { globstar: true });
  const octokit = github.getOctokit(token);
  console.log(commits);
  const files = commits.flatMap(item =>
    item.data.files.reduce((prev, file) => {
      console.log(file);
      if (file.filename.match(path) !== null && file.status !== 'removed') {
        return [
          ...prev,
          octokit.repos.getContent({
            ...github.context.repo,
            path: file.filename,
            ref: item.data.sha,
          }),
        ];
      } else {
        return prev;
      }
    }, [] as Promise<OctokitResponse<ReposGetContentResponseData>>[]),
  );
  return Promise.all(files);
};
