import * as core from '@actions/core';
import { getPayload } from './getPayload';

const main = async (): Promise<void> => {
  try {
    console.log('Initializing.');
    const str = await getPayload();

    if (str) {
      console.log(str);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
};

main();
