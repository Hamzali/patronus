package handlers

import (
	"fmt"
	"net/http"
	"strings"
)

type FileSystem struct {
	fs http.FileSystem
}

// Open opens file
func (fs FileSystem) Open(path string) (http.File, error) {
	fmt.Println("some log here", path)
	f, err := fs.fs.Open(path)
	if err != nil {
		return nil, err
	}

	s, err := f.Stat()
	if err != nil {
		return nil, err
	}
	if s.IsDir() {
		index := strings.TrimSuffix(path, "/") + "/index.html"
		if _, err := fs.fs.Open(index); err != nil {
			return nil, err
		}
	}

	return f, nil
}

func FileServer(servePath, dirPath string) {
	fileServer := http.FileServer(FileSystem{http.Dir(dirPath)})
	http.Handle(servePath, http.StripPrefix(strings.TrimRight(servePath, "/"), fileServer))
}
