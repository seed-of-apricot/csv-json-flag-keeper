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
  console.log(core.getInput('flagPath'));
  console.log(path);
  const octokit = github.getOctokit(token);
  const files = commits.flatMap(item =>
    item.data.files.reduce((prev, file) => {
      console.log(file.filename);
      console.log(file.filename.match(path));
      if (file.filename.match(path) !== null && file.status !== 'removed') {
        return [
          ...prev,
          octokit.repos.getContent({
            ...github.context.repo,
            headers: { accept: 'application/vnd.github.v3.raw' },
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
