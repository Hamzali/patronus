package handlers

import (
	"github.com/hamzali/patroni-ui/conf"
	"net/http"
	"net/http/httputil"
	"net/url"
	"strconv"
	"strings"
)

func PatroniProxy(w http.ResponseWriter, r *http.Request) {
	_, config := conf.LoadConfig()
	paths := strings.Split(r.URL.Path, "/")
	clusterName := paths[2]
	clusterData, ok := config.ClusterMap[clusterName]
	if !ok {
		http.NotFound(w, r)
		return
	}
	newPath := strings.Join(paths[3:len(paths)], "/")
	scheme := "http"
	if clusterData.Ssl {
		scheme += "s"
	}

	targetUrl := url.URL{
		Path:   newPath,
		Scheme: scheme,
	}

	host, port, err := patroni.GetHealthyHost(clusterName)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	targetUrl.Host = host + ":" + strconv.Itoa(port)
	proxy := httputil.NewSingleHostReverseProxy(&targetUrl)
	// Update the headers to allow for SSL redirection
	r.URL.Host = targetUrl.Host
	r.Header.Set("X-Forwarded-Host", r.Header.Get("Host"))
	r.Host = host

	// Note that ServeHttp is non blocking and uses a go routine under the hood
	proxy.ServeHTTP(w, r)
}
