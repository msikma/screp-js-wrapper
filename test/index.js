// screp-js-wrapper <https://github.com/msikma/screp-js-wrapper>
// © Apache 2.0 license

const fs = require('fs').promises
const path = require('path')
const {promisify} = require('node:util')
const {unzip} = require('node:zlib')
const {ScrepJS} = require('../dist/index.js')

/** Promisified version of unzip(). */
const unzipP = promisify(unzip)

/** Test replay files by Light. */
const repFiles = [
  '3307 EverPJayP ErOsLightT.rep',
  '3308 ErOsLightT EverPJayP.rep',
  '3309 7000wonP ErOsLightT.rep'
]

/**
 * Parses a replay file with screp and returns its data after a JSON conversion roundtrip.
 */
const parseRepFile = async file => {
  const filepath = path.resolve(path.join(__dirname, `${file}.gz`))
  const data = await unzipP(await fs.readFile(filepath, {encoding: null}))
  const [res, err] = ScrepJS.parseBuffer(data)
  if (err) {
    throw new Error(err)
  }

  // In order to easily check for correctness, we convert the object to JSON and back.
  // This collapses things like Uint16Array objects into plain objects.
  // We do the same thing in 'screp-js' and 'screp-js-file' (plus additional processing)
  // since that's much easier output to work with in Javascript.
  return JSON.parse(JSON.stringify(res))
}

/**
 * Returns the parsed JSON data from a .rep.json file.
 */
const getRepJSON = async file => {
  const filepath = path.resolve(path.join(__dirname, `${file}.json.gz`))
  const buffer = await unzipP(await fs.readFile(filepath, {encoding: null}))
  return JSON.parse(buffer)
}

describe(`screp-js-wrapper package`, () => {
  test(`ScrepJS.parseBuffer()`, async () => {
    for (const repFile of repFiles) {
      const repData = await parseRepFile(repFile)
      const expectedData = await getRepJSON(repFile)
      expect(repData).toEqual(expectedData)
    }
  })
  test(`ScrepJS.getVersion()`, () => {
    const versionObject = ScrepJS.getVersion()
    expect(versionObject).toStrictEqual([
      ['screp version', 'v1.5.1'],
      ['Parser version', 'v1.7.0'],
      ['EAPM algorithm version', 'v1.0.4'],
      ['Platform', 'darwin js'], // note: this is hardcoded due to my build platform.
      ['Built with', 'go1.17.5'],
      ['Author', 'Andras Belicza'],
      ['Home page', 'https://github.com/icza/screp']
    ])
  })
})
