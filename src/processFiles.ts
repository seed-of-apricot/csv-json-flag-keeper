import * as core from '@actions/core';
import parse from 'csv-parse/lib/sync';

export const processFiles = async (
  summary: string,
  files: string[],
): Promise<{ [key in string]: string }[]> => {
  const idColumn = core.getInput('id') || 'id';
  const summaryObject: { [key in string]: string }[] = parse(summary, {
    columns: true,
  });
  files.map(file => {
    const data = parse(file, {
      columns: true,
    });
    data.map((row: { [key in string]: string }) => {
      const keys = Object.keys(row).slice(1);
      const id = row[idColumn];
      keys.map(key => {
        const index = summaryObject.findIndex(item => item[idColumn] === id);
        if (index > -1) {
          summaryObject[index][key] = row[key];
        }
      });
    });
  });
  return summaryObject;
};
