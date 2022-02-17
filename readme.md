[![Apache 2.0 license](https://img.shields.io/badge/license-Apache--2.0-green)](https://www.apache.org/licenses/LICENSE-2.0) [![npm version](https://badge.fury.io/js/screp-js-wrapper.svg)](https://badge.fury.io/js/screp-js-wrapper)

# screp-js-wrapper

A pure Javascript version of [screp](https://github.com/icza/screp), a StarCraft: Remastered replay file parser, compiled from the original Go version using [GopherJS](https://github.com/gopherjs/gopherjs).

screp (StarCraft: Brood War Replay Parser) is a library for extracting information from StarCraft replay files. This simple wrapper library allows GopherJS, a compiler from Go to Javascript, to make it available for use in Node.

This is a very thin wrapper and actually has slightly different output compared to the Screp command line tool due to the way the data structure works. **It's recommended to use [screp-js](https://github.com/msikma/screp-js) instead of this package**, as it does additional processing to change the output to what you'd expect.

## Copyright

[Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0), as per the original [screp](https://github.com/icza/screp) project.
