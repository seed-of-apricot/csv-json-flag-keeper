import * as core from '@actions/core';
import { getPayload } from './getPayload';

try {
  core.debug('Initializing.');

  const str = await getPayload();

  if (str) {
    core.debug(str);
  }
} catch (error) {
  core.setFailed(error.message);
}
