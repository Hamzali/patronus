package conf

import (
	"github.com/spf13/viper"
	"strings"
)

type Env string

const (
	Dev  Env = "dev"
	Prod     = "prod"
	Test     = "test"
)

type ClusterConfig struct {
	Hosts []string `mapstructure:"hosts"json:"hosts"`
	Port  int      `mapstructure:"port"json:"port"`
	Ssl   bool     `mapstructure:"ssl"json:"ssl"`
}

type AppConfig struct {
	Env        Env                      `mapstructure:"env"`
	Port       int                      `mapstructure:"port"`
	ClusterMap map[string]ClusterConfig `mapstructure:"clusters"`
}

var appConfig *AppConfig = nil

func LoadConfig() (error, *AppConfig) {
	if appConfig == nil {
		// conf file
		viper.AddConfigPath(".")
		viper.SetConfigName("config")
		viper.SetConfigType("yml")
		// env
		viper.SetEnvPrefix("iugo_auth")
		viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))
		viper.AutomaticEnv()
		// read configs
		err := viper.ReadInConfig()
		if err != nil {
			return err, nil
		}
		appConfig = &AppConfig{}
		err = viper.Unmarshal(appConfig)
		if err != nil {
			return err, nil
		}
	}

	return nil, appConfig
}
