#!/usr/bin/env sh

BASEDIR=$(dirname "$0")

if ! command -v gopherjs &> /dev/null; then
    echo "error: gopherjs command not available."
    echo "Install it from here: <https://github.com/gopherjs/gopherjs>"
    exit 1
fi

echo "icza/screp" $(cat ./go.mod | grep "^\s\+github.com/icza/screp" | head -n 1 | grep -o "v\(.*\)")
gopherjs build -vo "$BASEDIR"/dist/index.js "$BASEDIR"/src/main.go
sed 's/$module.exports.ScrepJS/if ($module) $module.exports.ScrepJS/g' dist/index.js > dist/_index.js
rm dist/index.js
mv dist/_index.js dist/index.js
