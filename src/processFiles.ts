import * as core from '@actions/core';
import parse from 'csv-parse/lib/sync';

export const processFiles = async (
  summary: string,
  files: { data: string; title: string }[],
): Promise<{ [key in string]: string }[]> => {
  const mode = core.getInput('mode');
  const idColumn = core.getInput('id') || 'id';
  const summaryObject: { [key in string]: string }[] = parse(summary, {
    columns: true,
  });
  files.map(file => {
    const data = parse(file.data, {
      columns: true,
    });
    data.map((row: { [key in string]: string }) => {
      const keys = Object.keys(row).slice(1);
      const id = row[idColumn];
      keys.map(key => {
        const name = () => {
          switch (mode) {
            case 'single':
              return file.title;
            case 'multiple':
              return `${file.title}_${key}`;
            default:
              return 'null';
          }
        };
        const index = summaryObject.findIndex(item => item[idColumn] === id);
        if (index > -1) {
          summaryObject[index][name()] = row[key];
        } else {
          core.setFailed('no id found!');
        }
      });
    });
  });
  return summaryObject;
};
