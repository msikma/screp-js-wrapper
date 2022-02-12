package main

import (
	"github.com/gopherjs/gopherjs/js"
	"github.com/icza/screp/rep"
	"github.com/icza/screp/repparser"
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

// Declares the ScrepJS object on the global object.
func main() {
	js.Global.Set("ScrepJS", map[string]interface{}{
		"parseBuffer": parseBuffer,
	})
	js.Module.Get("exports").Set("ScrepJS", map[string]interface{}{
		"parseBuffer": parseBuffer,
	})
}
