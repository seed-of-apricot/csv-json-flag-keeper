import * as core from '@actions/core';
import { getPayload } from './getPayload';

const main = async (): Promise<void> => {
  try {
    core.debug('Initializing.');

    const str = await getPayload();

    if (str) {
      core.debug(str);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
};

main();
