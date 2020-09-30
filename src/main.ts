import * as core from '@actions/core';
import { getPayload } from './getPayload';

const main = async (): Promise<void> => {
  try {
    // eslint-disable-next-line no-console
    console.log('Initializing.');

    const str = await getPayload();

    if (str) {
      core.debug(str);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
};

main();
