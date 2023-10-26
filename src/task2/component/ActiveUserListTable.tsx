import {
  GridColDef,
  GridValueGetterParams,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import React, { useMemo } from "react";
import DataTable from "./DataTable";
import useFetch from "../../hooks/useFetch";
import { CircularProgress, Typography } from "@mui/material";
const ActiveUserListTable = () => {
  const uuid = process.env.REACT_APP_UUID;
  const base_url = process.env.REACT_APP_API_URL;
  const { data, loading, error } = useFetch(`/security/accounts/${uuid}/users`);

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: "id", headerName: "ID", width: 70 },
      {
        field: "image",
        headerName: "Profile",
        width: 100,
        renderCell: (params: GridRenderCellParams) => (
          <img
            src={base_url + params.row.profilePicture}
            alt="User Image"
            style={{ width: "50px", height: "50px" }}
          />
        ),
      },
      { field: "firstName", headerName: "First Name", width: 130 },
      { field: "lastName", headerName: "Last name", width: 130 },
      { field: "email", headerName: "Email", width: 250 },
      {
        field: "User Account Id",
        headerName: "User Account Id",
        width: 150,
        renderCell: (params: GridRenderCellParams) => (
          <>
            {params.row.roles.map((user: any) => (
              <span className="list-group-item" key={user.accountId}>
                {user.accountId}
              </span>
            ))}
          </>
        ),
      },
      {
        field: "roles",
        headerName: "Roles",
        width: 150,
        renderCell: (params: GridRenderCellParams) => (
          <ul>
            {params.row.roles.map((role: any) => (
              <li className="list-group-item" key={role.id}>
                {role.name}
              </li>
            ))}
          </ul>
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

export default ActiveUserListTable;
