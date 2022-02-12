#!/usr/bin/env sh

BASEDIR=$(dirname "$0")

if ! command -v gopherjs &> /dev/null; then
    echo "error: gopherjs command not available."
    echo "Install it from here: <https://github.com/gopherjs/gopherjs>"
    exit 1
fi

gopherjs build -vo "$BASEDIR"/dist/index.js "$BASEDIR"/src/main.go
