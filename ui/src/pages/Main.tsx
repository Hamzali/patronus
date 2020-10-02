import React, { FunctionComponent } from "react";

import MuiAlert from "@material-ui/lab/Alert";

import { useTranslation } from "react-i18next";

import { useReadClusters } from "../services/patroni";
import ClusterGridList from "../components/ClusterGridList";
import LoaderScreen from "../components/LoaderScreen";
import { useHistory } from "react-router-dom";

const Main: FunctionComponent = () => {
  const { loading, data, error } = useReadClusters();
  const { t } = useTranslation();
  const history = useHistory();
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
    <>
      <ClusterGridList
        clusterItems={data}
        onItemClick={(cluster) => history.push(`/${cluster.name}`)}
      />
    </>
  );
};

export default Main;
