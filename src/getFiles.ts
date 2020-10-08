import * as core from '@actions/core';
import * as github from '@actions/github';
import {
  OctokitResponse,
  ReposGetCommitResponseData,
  ReposGetContentResponseData,
} from '@octokit/types';

export const getFiles = async (
  commits: OctokitResponse<ReposGetCommitResponseData>[],
): Promise<OctokitResponse<ReposGetContentResponseData>[]> => {
  const token = core.getInput('myToken');
  const octokit = github.getOctokit(token);
  const files = commits.flatMap(item =>
    item.data.files.reduce((prev, file) => {
      if (file.filename.split('.').pop() === 'csv') {
        return [
          ...prev,
          octokit.repos.getContent({
            ...github.context.repo,
            headers: { accept: 'application/vnd.github.v3.raw' },
            path: file.filename,
          }),
        ];
      } else {
        return prev;
      }
    }, [] as Promise<OctokitResponse<ReposGetContentResponseData>>[]),
  );
  return Promise.all(files);
};
