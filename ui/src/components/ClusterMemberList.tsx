import React, { FunctionComponent } from "react";

import {
  DynamicFeed,
  Error,
  CheckCircle,
  Flag,
  SyncProblem,
  Sync,
} from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  ButtonGroup,
} from "@material-ui/core";

import {
  ClusterMember,
  ClusterMemberRole,
  ClusterMemberStatus,
} from "../services/patroni.interface";
import { useTranslation } from "react-i18next";

const NotOk = () => <Error color="error" />;
const Ok = () => <CheckCircle color="primary" />;

export enum MemberActionType {
  Switchover,
  Failover,
}

export type MemberActionCallback = (
  actionType: MemberActionType,
  member: ClusterMember
) => void;

export interface ClusterMemberListItemProps {
  member: ClusterMember;
  onActionClick?: MemberActionCallback;
}
const ClusterMemberListItem: FunctionComponent<ClusterMemberListItemProps> = ({
  member,
  onActionClick,
}) => {
  const { t } = useTranslation();
  return (
    <ListItem>
      <ListItemIcon>
        {member.state !== ClusterMemberStatus.Running ? (
          <NotOk />
        ) : (
          <Ok />
        )}

        {member.role === ClusterMemberRole.Leader ? (
          <Flag />
        ) : (
          <DynamicFeed />
        )}
      </ListItemIcon>

      <ListItemText primary={member.name} secondary={member.host} />
      {onActionClick && (
        <ButtonGroup variant="outlined" color="primary">
          <Button
            startIcon={<Sync />}
            color="primary"
            onClick={() =>
              onActionClick(MemberActionType.Switchover, member)
            }
          >
            {t("button.switchover")}
          </Button>
          <Button
            startIcon={<SyncProblem />}
            color="secondary"
            onClick={() =>
              onActionClick(MemberActionType.Failover, member)
            }
          >
            {t("button.failover")}
          </Button>
        </ButtonGroup>
      )}
    </ListItem>
  );
};

export interface ClusterMemberListProps {
  members?: ClusterMember[];
  onMemberActionClick?: MemberActionCallback;
}

const ClusterMemberList: FunctionComponent<ClusterMemberListProps> = ({
  members,
  onMemberActionClick,
}) => {
  if (!members) {
    return (
      <MuiAlert severity="warning">There is no member data</MuiAlert>
    );
  }
  return (
    <List>
      {members.map((member) => (
        <ClusterMemberListItem
          key={member.name}
          member={member}
          onActionClick={onMemberActionClick}
        />
      ))}
    </List>
  );
};

export default ClusterMemberList;
