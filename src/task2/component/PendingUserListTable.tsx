import {
  GridColDef,
  GridValueGetterParams,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import React, { useMemo } from "react";
import DataTable from "./DataTable";
import useFetch from "../../hooks/useFetch";
import { CircularProgress, Typography } from "@mui/material";

const PendingUserListTable = () => {
  const uuid = process.env.REACT_APP_UUID;
  const base_url = process.env.REACT_APP_API_URL;
  const { data, loading, error } = useFetch(
    `/security/accounts/${uuid}/pending-invites`
  );
  const columns = useMemo<GridColDef[]>(
    () => [
      { field: "id", headerName: "ID", width: 70 },
      { field: "emailInvitedTo", headerName: "Email", width: 250 },
      {
        field: "accountId",
        headerName: "User Account Id",
        width: 150,
      },
      {
        field: "invitedBy",
        headerName: "Invited By",
        width: 150,
        renderCell: (params: GridRenderCellParams) => (
          <>
            {params?.row?.invitedBy?.firstName +
              " " +
              params?.row?.invitedBy?.lastName}
          </>
        ),
      },
    ],
    []
  );

  if (loading) {
    return <CircularProgress color="primary" />;
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" sx={{ my: 2 }}>
        Failed to Load data
      </Typography>
    );
  }

  return <DataTable columns={columns} data={data || []} />;
};

export default PendingUserListTable;
