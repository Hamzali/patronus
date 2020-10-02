import React, { useState, PropsWithChildren } from "react";
import { TablePagination } from "@material-ui/core";

export interface PaginationState {
  page: number;
  rowsPerPage: number;
}
export interface PaginatedContentProps<T> {
  rowsPerPageOptions?: number[];
  initialPagination?: PaginationState;
  data: T[];
  render: (paginatedData: T[]) => JSX.Element;
}

function PaginatedContent<T>({
  rowsPerPageOptions = [5, 10, 25],
  initialPagination = {
    page: 0,
    rowsPerPage: rowsPerPageOptions[0] || 5,
  },
  data,
  render,
}: PropsWithChildren<PaginatedContentProps<T>>) {
  const [pagination, setPagination] = useState(initialPagination);
  const start = pagination.page * pagination.rowsPerPage;
  const end = start + pagination.rowsPerPage;
  const paginatedData = data.slice(start, end);
  return (
    <>
      {render(paginatedData)}
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={data.length}
        rowsPerPage={pagination.rowsPerPage}
        page={pagination.page}
        onChangePage={(_event, page) => {
          setPagination((p) => ({ ...p, page }));
        }}
        onChangeRowsPerPage={(event) => {
          setPagination((p) => ({
            ...p,
            rowsPerPage: parseInt(event.target.value),
          }));
        }}
      />
    </>
  );
}

export default PaginatedContent;
