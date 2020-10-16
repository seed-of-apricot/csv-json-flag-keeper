import * as core from '@actions/core';
import { OctokitResponse, ReposGetContentResponseData } from '@octokit/types';
import { AxiosResponse } from 'axios';

export const convertFiles = (path: string) => (
  file: AxiosResponse<unknown>,
) => {
  switch (path.split('.').pop()) {
    case 'csv':
      return {
        data: file.data as string,
        title: path.replace(/^.*\//g, '').split('.')[0],
      };
    case 'json':
      return {
        data: JSON.parse(file.data as string),
        title: path.replace(/^.*\//g, '').split('.')[0],
      };
    default:
      core.setFailed('extension is not vaild');
      throw new Error('');
  }
};
