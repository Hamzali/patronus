package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/hamzali/patroni-ui/conf"
	"github.com/hamzali/patroni-ui/handlers"
)

func main() {
	err, config := conf.LoadConfig()
	if err != nil {
		log.Fatal(err)
	}

	// API & PROXY
	http.HandleFunc("/api/clusters", handlers.ClustersHandler)
	http.HandleFunc("/api/", handlers.PatroniProxy)

	// UI & FILE SERVER

	handlers.FileServer("/dist/", "./ui/dist")
	handlers.FileServer("/assets/", "./ui/assets")
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./ui/entry.html")
	})
	fmt.Println("listening on", config.Port)
	err = http.ListenAndServe("0.0.0.0:"+strconv.Itoa(config.Port), nil)
	log.Fatal(err)
}
