package handlers

import (
	"encoding/json"
	"net/http"
)

func ClustersHandler(w http.ResponseWriter, r *http.Request) {
	clusters, err := patroni.GetClusters()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	parsedClusters, err := json.Marshal(clusters)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	writeResponse(w, http.StatusOK, parsedClusters)
}
