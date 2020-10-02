package handlers

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/hamzali/patroni-ui/conf"
	"io/ioutil"
	"net/http"
)

type Patroni struct {}

var patroni = Patroni{}

func (p *Patroni) toUri(host string, port int) string {
	return fmt.Sprintf("http://%s:%d", host, port)
}

func (p *Patroni) HealthCheck(host string, port int) (bool, error) {
	uri := p.toUri(host, port) + "/health"
	resp, err := http.Get(uri)
	if err != nil {
		return false, err
	}
	return resp.StatusCode == http.StatusOK, nil
}

type ClusterMember struct {
	Name  string `json:"name"`
	Host  string `json:"host"`
	Port  int    `json:"port"`
	Role  string `json:"role"`
	State string `json:"state"`
}

type GetClusterResponse struct {
	Members []ClusterMember `json:"members"`
}

func (p *Patroni) GetCluster(host string, port int) (*GetClusterResponse, error) {
	uri := p.toUri(host, port) + "/cluster"
	resp, err := http.Get(uri)
	if err != nil {
		return nil, err
	}

	if resp.StatusCode != http.StatusOK {
		return nil, errors.New("request failed")
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var clusterData GetClusterResponse
	err = json.Unmarshal(body, &clusterData)
	if err != nil {
		return nil, err
	}
	return &clusterData, nil
}

func (p *Patroni) GetHealthyHost(clusterName string) (host string, port int, err error) {
	err, config := conf.LoadConfig()
	if err != nil {
		return
	}

	clusterConfig := config.ClusterMap[clusterName]
	for _, h := range clusterConfig.Hosts {
		isHealthy, _ := p.HealthCheck(h, clusterConfig.Port)
		if isHealthy {
			host = h
			port = clusterConfig.Port
			return
		}
	}

	err = errors.New("no healthy host exists")
	return
}

type PatroniCluster struct {
	Name    string          `json:"name"`
	Ok      bool            `json:"ok"`
	Members []ClusterMember `json:"members"`
}

func (p *Patroni) GetClusters() ([]PatroniCluster, error) {
	err, config := conf.LoadConfig()
	if err != nil {
		return nil, err
	}

	var result []PatroniCluster
	for clusterName, _ := range config.ClusterMap {
		c := PatroniCluster{Name: clusterName, Ok: false, Members: nil}

		host, port, err := p.GetHealthyHost(clusterName)
		if err == nil {
			c.Ok = true
		}

		getClusterResp, err := p.GetCluster(host, port)
		if err == nil {
			c.Members = getClusterResp.Members
		}

		result = append(result, c)
	}

	return result, nil
}
