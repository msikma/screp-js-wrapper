package main

import (
	"runtime"

	"github.com/gopherjs/gopherjs/js"
	"github.com/icza/screp/rep"
	"github.com/icza/screp/repparser"
)

// Note: copied from icza/screp/cmd/screp.
const (
	appName    = "screp"
	appVersion = "v1.5.1"
	appAuthor  = "Andras Belicza"
	appHome    = "https://github.com/icza/screp"
)

// Parses a binary buffer as through it's a .rep file and returns an object with the result.
func parseBuffer(buffer []byte) (*rep.Replay, *string) {
	res, err := repparser.ParseConfig(buffer, repparser.Config{Commands: true, MapData: true})

	if err != nil {
		errStr := err.Error()
		return nil, &errStr
	}

	// Add computed properties.
	res.Compute()

	return res, nil
}

// Returns the same version information that is also provided by the screp command line tool,
// as an array of items instead of a single string.
func getVersion() ([][]string) {
	return [][]string{
		{(appName + " version"), appVersion},
		{"Parser version", repparser.Version},
		{"EAPM algorithm version", rep.EAPMVersion},
		{"Platform", runtime.GOOS + " " + runtime.GOARCH},
		{"Built with", runtime.Version()},
		{"Author", appAuthor},
		{"Home page", appHome},
	}
}

// Exports the ScrepJS object as a CommonJS module.
func main() {
	js.Module.Get("exports").Set("ScrepJS", map[string]interface{}{
		"parseBuffer": parseBuffer,
		"getVersion": getVersion,
	})
}
