import * as core from '@actions/core';
import * as github from '@actions/github';
import {
  OctokitResponse,
  ReposGetCommitResponseData,
  ReposGetContentResponseData,
} from '@octokit/types';
import globToRegex from 'glob-to-regExp';
import axios, { AxiosResponse } from 'axios';
import { convertFiles } from './convertFiles';

export const getFiles = async (
  commits: OctokitResponse<ReposGetCommitResponseData>[],
): Promise<{ data: string | Object; title: string }[]> => {
  const token = core.getInput('GITHUB_TOKEN');
  const path = globToRegex(core.getInput('flagPath'), { globstar: true });
  const octokit = github.getOctokit(token);

  const files = commits
    .sort((a, b) =>
      a.data.commit.author.date > b.data.commit.author.date ? -1 : 1,
    )
    .flatMap(item =>
      item.data.files.reduce((prev, file) => {
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

  const fileContents = (await Promise.all(files))
    .filter(
      (item, index, array) =>
        array.map(element => element.data.path).indexOf(item.data.path) ===
        index,
    )
    .map(async item =>
      convertFiles(item.data.path)(await axios.get(item.data.download_url)),
    );

  return Promise.all(fileContents);
};
