[![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT) [![npm version](https://badge.fury.io/js/screp-js.svg)](https://badge.fury.io/js/screp-js)

# screp-js

A pure Javascript version of [screp](https://github.com/icza/screp), a StarCraft: Remastered replay file parser, compiled from the original Go version using [GopherJS](https://github.com/gopherjs/gopherjs).

screp (StarCraft: Brood War Replay Parser) is a library for extracting information from StarCraft replay files. This simple wrapper library allows GopherJS, a compiler from Go to Javascript, to make it available for use in a browser or in Node.

## Installation

This library has been pre-compiled and can be installed through npm:

```
npm i --save screp-js
```

Keep in mind that the compiled screp library in JS is about 482 KB gzipped (and 2,8 MB otherwise).

## Usage

The screp library can be either included in an HTML page, in which case it will be added to the global namespace as `ScrepJS`, or it can be imported as a CommonJS module:

```js
const {ScrepJS} = require('screp-js')

const processRep(uint8arr) {
  // 'uint8arr' is a Uint8Array containing a .rep file.
  const [res, err] = ScrepJS.parseBuffer(uint8arr)

  // If something went wrong, 'err' will be a string with
  // an error thrown by Go. Otherwise, it will be null.
  if (err) {
    throw new Error(err)
  }

  // 'res' is an object containing the same output you'd get
  // from running 'screp' in Go or on the command line.
  return res
}
```

There is currently no way to set options (such as whether to include computed data, or map information, etc.)

The npm version of the library is pre-compiled.

## Copyright

[Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0), as per the original [screp](https://github.com/icza/screp) project.
