import * as core from '@actions/core';
import { OctokitResponse, ReposGetContentResponseData } from '@octokit/types';

export const convertFiles = (
  file: OctokitResponse<ReposGetContentResponseData>,
) => {
  const extension = file.data.path.split('.').pop();
  switch (extension) {
    case 'csv':
      return {
        data: Buffer.from(file.data.content, 'base64').toString(),
        title: file.data.path.replace(/^.*\//g, '').split('.')[0],
      };
    case 'json':
      return {
        data: JSON.parse(Buffer.from(file.data.content, 'base64').toString()),
        title: file.data.path.replace(/^.*\//g, '').split('.')[0],
      };
    default:
      core.setFailed('extension is not vaild');
  }
};
