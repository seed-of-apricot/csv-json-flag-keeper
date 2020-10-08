import { readFileSync } from 'fs';
import path from 'path';
import { processFiles } from '../src/processFiles';

test('convert to object', async () => {
  const fs = readFileSync(path.join(__dirname, './mock/summary.csv'));
  const fs2 = readFileSync(path.join(__dirname, './mock/flag.csv'));
  const data = fs.toString();
  const data2 = fs2.toString();
  const array = processFiles(data, [data2]);
  expect(await array).toHaveLength(9);
});
