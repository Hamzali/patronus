package handlers

import (
	"log"
	"net/http"
)

func writeResponse(w http.ResponseWriter, status int, data []byte) {
	w.WriteHeader(status)
	_, err := w.Write(data)
	if err != nil {
		log.Println("write err: ", err)
	}
}
