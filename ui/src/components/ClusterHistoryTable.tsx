import React, { FunctionComponent } from "react";

import { useTranslation } from "react-i18next";

import { ClusterHistoryAction } from "services/patroni.interface";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

import PaginatedContent from "components/PaginatedContent";
import { formatDateTime } from "common/date";

export interface ClusterHistoryTable {
  history: ClusterHistoryAction[];
}

const ClusterHistoryTable: FunctionComponent<ClusterHistoryTable> = ({
  history,
}) => {
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper}>
      <PaginatedContent<ClusterHistoryAction>
        data={history}
        render={(historyData) => {
          return (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t("clusterHistory.id")}</TableCell>
                  <TableCell>{t("clusterHistory.ref")}</TableCell>
                  <TableCell>{t("clusterHistory.action")}</TableCell>
                  <TableCell>
                    {t("clusterHistory.timestamp")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historyData.map((historyAction) => (
                  <TableRow key={historyAction.id}>
                    <TableCell component="th" scope="row">
                      {historyAction.id}
                    </TableCell>
                    <TableCell>{historyAction.ref}</TableCell>
                    <TableCell>{historyAction.action}</TableCell>
                    <TableCell>
                      {formatDateTime(historyAction.timestamp)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          );
        }}
      />
    </TableContainer>
  );
};

export default ClusterHistoryTable;
