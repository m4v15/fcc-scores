const request = require('request');
const path = require('path')
const csv = require('csvtojson')
const axios = require('axios')
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs')


const csvFilePath = path.join(__dirname, 'csvs', 'applicants.csv')
const newFilePath = path.join(__dirname, 'csvs', 'applicants-with-scores.csv')

const getJSON = () => csv()
  .fromFile(csvFilePath)


const FCCUrl = username => `https://www.freecodecamp.org/api/users/get-public-profile?username=${username}`


const getPoints = async applicant => {
  const username = applicant['Free Code Camp Username'].split('/').reverse()[0]

  const { data } = await axios({
    method: 'get',
    url: FCCUrl(username)
  })

  const points = data.entities ?
    data.entities.user[data.result].points : 'n/a'

  const updated = { ...applicant, 'FCC Score': points }

  return updated
}

const run = async function () {
  try {
    const applicants = await getJSON()

    console.log("Fetching scores...")
    const updatedJSON = await Promise.all(
      applicants.map(getPoints)
    )
    console.log("Got scores, writing to file...")

    // Parse back into csv
    const parser = new Json2csvParser();
    const newCsv = parser.parse(updatedJSON);

    // Write to new file
    const writeStream = fs.createWriteStream(newFilePath)
    writeStream.write(newCsv, 'UTF8');
    writeStream.end();
    writeStream.on('finish', function () {
      console.log("Write completed.");
    });

  } catch (e) {
    console.log('!!!!!!!!!');
    console.error(e)

    return;
  }
}

run()