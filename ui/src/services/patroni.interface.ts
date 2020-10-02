export enum ClusterMemberRole {
  Leader = "leader",
  Replica = "replica",
}

export enum ClusterMemberStatus {
  Running = "running",
  Stopped = "stopped",
  Failed = "failed",
}

export interface ClusterMember {
  name: string;
  host: string;
  port: number;
  role: ClusterMemberRole;
  state: ClusterMemberStatus;
  api_url: string;
  timeline: number;
  tags: Map<string, boolean>;
}

export interface ClusterItem {
  name: string;
  ok: boolean;
  members?: ClusterMember[];
}

export interface ClusterDetail {
  members: ClusterMember[];
  scheduled_switchover?: {
    at: Date;
    from: string;
  };
}

export interface ClusterConfig {
  ttl: number;
  loop_wait: number;
  retry_timeout: number;
  maximum_lag_on_failover: number;
  postgresql: {
    use_pg_rewind: boolean;
    parameters: {
      shared_preload_libraries: string;
      wal_level: string;
      max_wal_senders: number;
      max_replication_slots: number;
      synchronous_commit: boolean;
    };
  };
}

export interface ClusterHistoryAction {
  id: number;
  ref: number;
  action: string;
  timestamp: Date;
}

export type ClusterHistory = ClusterHistoryAction[];

export interface ClusterInfo {
  members: ClusterMember[];
  history: any;
  config: any;
}
