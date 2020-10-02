import React, { FunctionComponent } from "react";

import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Typography,
  Grid,
  makeStyles,
  Button,
  ButtonGroup,
  Paper,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import SaveIcon from "@material-ui/icons/Save";
import RestorePageIcon from "@material-ui/icons/RestorePage";

import { useReadClusterInfo } from "../services/patroni";

import LoaderScreen from "components/LoaderScreen";
import JsonEditor from "components/JsonEditor";
import ClusterMemberList from "components/ClusterMemberList";
import ClusterHistoryTable from "components/ClusterHistoryTable";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
  },
  innerFlex: {
    flex: 1,
  },
  buttonGroup: {
    backgroundColor: theme.palette.common.white,
  },
}));

const ClusterDetail: FunctionComponent = () => {
  const { t } = useTranslation();
  const { clusterId } = useParams<{ clusterId: string }>();
  const { loading, data, error } = useReadClusterInfo(clusterId);
  const classes = useStyles();

  if (loading) {
    return <LoaderScreen />;
  }

  if (error) {
    return <MuiAlert severity="error">{error.message}</MuiAlert>;
  }

  if (!data) {
    return (
      <MuiAlert severity="warning">{t("message.noData")}</MuiAlert>
    );
  }
  return (
    <Grid
      className={classes.container}
      spacing={2}
      container
      direction="row"
      alignItems="stretch"
    >
      <Grid item xs={12} md={6}>
        <Grid spacing={1} container direction="column">
          <Grid item>
            <Typography variant="h3">{clusterId}</Typography>
          </Grid>
          <Grid item>
            <Paper>
              <ClusterMemberList
                members={data.members}
                onMemberActionClick={console.log}
              />
            </Paper>
          </Grid>
          <Grid item>
            <ClusterHistoryTable history={data.history} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} className={classes.innerFlex}>
        <Grid
          spacing={1}
          className={classes.container}
          container
          direction="column"
        >
          <Grid item>
            <ButtonGroup variant="outlined" color="primary">
              <Button
                startIcon={<SaveIcon />}
                className={classes.buttonGroup}
              >
                {t("button.save")}
              </Button>
              <Button
                startIcon={<RestorePageIcon />}
                className={classes.buttonGroup}
              >
                {t("button.reset")}
              </Button>
            </ButtonGroup>
          </Grid>

          <Grid item className={classes.innerFlex}>
            <JsonEditor json={JSON.stringify(data.config)} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ClusterDetail;
