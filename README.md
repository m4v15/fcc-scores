# Get FCC scores

 Script to populate spreadsheet with FCC scores, given a username

## Requirements:

- node

## Set up

1. Clone this repo
2. Run `$ npm i` in terminal to install dependencies

## How to use:

1. Download/put a csv file into the `csvs` folder with the name `applicants.csvs`
  - This should have a column called `Free Code Camp Username` with the format of those cells being a FCC url with the username as the final path: `https://www.freecodecamp.org/[username]`
2. From the terminal, in this directory, run `npm start`
3. The file named `applicants-with-scores.csv` will be the same as the original CSV file but with the scores filled in. Open this with your spreadsheet program of choice.