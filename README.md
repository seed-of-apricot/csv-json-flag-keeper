# csv-flag-keeper

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

## Usage

This is an example used in this repository.

```yml
name: 'update-summary'
on:
  push:
    branches:
      - update-summary

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@v2
        with:
          ref: update-summary
      - name: update-summary
        uses: ./
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          summaryPath: example/example.csv
          flagPath: example/flags/*.csv
      - name: pull-request
        uses: peter-evans/create-pull-request@master
        with:
          commit-message: update summary
          title: Update Summary
          body: summary updated
          base: main
```

1. Checkout
2. Use this action
3. Commit or make a pull request, depending on your needs

The parameters that this action refers to are:

| parameter    | required | default                       |
| ------------ | -------- | ----------------------------- |
| summaryPath  | Yes      |                               |
| flagPath     | Yes      |                               |
| GITHUB_TOKEN |          | `${{ secrets.GITHUB_TOKEN }}` |
| id           |          | `'id'`                        |

## License

MIT License. This repository uses the [typescript-action template](https://github.com/actions/typescript-action) so the original MIT license also applies.
