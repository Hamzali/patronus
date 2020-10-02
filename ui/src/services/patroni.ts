import { Api, useAsync } from "./utils";
import { useCallback } from "react";
import {
  ClusterConfig,
  ClusterDetail,
  ClusterHistory,
  ClusterHistoryAction,
  ClusterInfo,
  ClusterItem,
} from "./patroni.interface";

class PatroniApi extends Api {
  readClusters() {
    return this.call<ClusterItem[]>("/clusters");
  }

  readClusterDetails(clusterName: string) {
    return this.call<ClusterDetail>(`/${clusterName}/cluster`);
  }

  async readHistory(clusterName: string) {
    const response = await this.call<
      Array<[number, number, string, string]>
    >(`/${clusterName}/history`);

    return response.map(
      ([id, ref, action, ts]): ClusterHistoryAction => ({
        id,
        ref,
        action,
        timestamp: new Date(ts),
      })
    );
  }

  readConfig(clusterName: string) {
    return this.call<ClusterConfig>(`/${clusterName}/config`);
  }
}

const patroniApi = new PatroniApi("/api");
export const useReadClusterInfo = (clusterName: string) => {
  const cb = useCallback(async (): Promise<ClusterInfo> => {
    const [detail, config, history] = await Promise.all<
      ClusterDetail,
      ClusterConfig,
      ClusterHistory
    >([
      patroniApi.readClusterDetails(clusterName),
      patroniApi.readConfig(clusterName),
      patroniApi.readHistory(clusterName),
    ]);
    return {
      members: detail.members,
      config,
      history,
    };
  }, [clusterName]);
  return useAsync(cb);
};

export const useReadClusters = () => {
  const cb = useCallback(() => patroniApi.readClusters(), []);
  return useAsync(cb);
};

export default patroniApi;
