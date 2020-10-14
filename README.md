# csv-json-flag-keeper

Keep flags on your records 📃.

## Example

Suppose you have a _summary sheet_, where:

| id  | flag1 |
| --- | ----- |
| 100 | 1     |
| 101 |       |
| 102 |       |
| 103 | 1     |
| 104 |       |
| 105 | 1     |
| ... |       |

several _flags_ have been attached to the csv record.

Pushing csv like this:

| id  | flag2 |
| --- | ----- |
| 102 | 1     |
| 104 | 1     |
| 105 | 1     |

will annex the column to the csv record.

| id  | flag1 | flag2 |
| --- | ----- | ----- |
| 100 | 1     |       |
| 101 |       |       |
| 102 |       | 1     |
| 103 | 1     |       |
| 104 |       | 1     |
| 105 | 1     | 1     |
| ... |       |       |

This process could be done with any combination of csv and json. (e.g., summary: json, flag-file:csv).

## Usage

This is an example used in this repository.

```yml
name: 'update-summary'

on:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@v2
      - name: update-summary
        uses: ./
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          summaryPath: example/example.csv
          flagPath: example/flags/*.csv
      - name: add-and-commit
        uses: EndBug/add-and-commit@v4
        with:
          message: summary has been re-written
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

1. Checkout
2. Use this action
3. Commit or make a pull request, depending on your needs

The parameters that this action refers to are:

| parameter    | required | default  | What is this                                                                                                    |
| ------------ | -------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| GITHUB_TOKEN | Yes      |          | GitHub token                                                                                                    |
| summaryPath  | Yes      |          | Path to the summary <br /> Extension must be either csv or json. file                                           |
| flagPath     | Yes      |          | Path to the flag files to be <br /> Extension must be either csv or json retrieved                              |
| id           |          | `id`     | Column name of id                                                                                               |
| mode         |          | `single` | `single` uses the file name as the column name <br /> `multiple` uses filename + column name as the column name |

## License

MIT License. This repository uses the [typescript-action template](https://github.com/actions/typescript-action) so the original MIT license also applies.
