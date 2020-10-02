import React, { FunctionComponent } from "react";

import {
  Grid,
  Paper,
  makeStyles,
  Divider,
  Button,
} from "@material-ui/core";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";

import { ClusterItem } from "../services/patroni.interface";
import ClusterMemberList from "./ClusterMemberList";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

type ClusterItemClickCallback = (cluster: ClusterItem) => void;

export interface ClusterGridItemProps {
  cluster: ClusterItem;
  onClick?: ClusterItemClickCallback;
}

const ErrorIcon = () => <PriorityHighIcon color="error" />;

const ClusterGridItem: FunctionComponent<ClusterGridItemProps> = ({
  cluster,
  onClick,
}) => {
  const classes = useStyles();
  let btnIcon;
  if (!cluster.ok) {
    btnIcon = <ErrorIcon />;
  }
  return (
    <Grid item>
      <Paper className={classes.paper}>
        <Button
          fullWidth
          startIcon={btnIcon}
          disabled={!cluster.ok}
          onClick={() => onClick && onClick(cluster)}
          size="large"
        >
          {cluster.name}
        </Button>
        <Divider />
        <ClusterMemberList members={cluster.members} />
      </Paper>
    </Grid>
  );
};

export interface ClusterListProps {
  clusterItems: ClusterItem[];
  onItemClick?: ClusterItemClickCallback;
}

const ClusterGridList: FunctionComponent<ClusterListProps> = ({
  clusterItems,
  onItemClick,
}) => {
  return (
    <Grid container spacing={3}>
      {clusterItems.map((cluster) => (
        <ClusterGridItem
          key={cluster.name}
          cluster={cluster}
          onClick={onItemClick}
        />
      ))}
    </Grid>
  );
};

export default ClusterGridList;
