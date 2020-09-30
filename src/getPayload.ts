// import * as core from '@actions/core';
import * as github from '@actions/github';

export const getPayload = async (): Promise<string | undefined> => {
  // const token = core.getInput('myToken');
  // const octokit = github.getOctokit(token);
  console.log({ payload: github.context.payload });

  const { GITHUB_SHA } = process.env;
  return GITHUB_SHA;
};
