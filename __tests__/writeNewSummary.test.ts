import { writeNewSummary } from '../src/writeNewSummary';
import summary from './mock/summary.json';

test('convert to object', async () => {
  const array = writeNewSummary(summary);
  expect(await array).toEqual(1);
});
