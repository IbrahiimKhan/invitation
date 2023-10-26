import { Container, Button, Skeleton } from "@mui/material";
import React, { lazy, Suspense } from "react";
import DataTable from "../task2/component/DataTable";
import { useNavigate } from "react-router-dom";

const ActiveUserListTable = lazy(
  () => import("../task2/component/ActiveUserListTable")
);
const PendingUserListTable = lazy(
  () => import("../task2/component/PendingUserListTable")
);

const Task2 = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Container sx={{ my: 4 }}>
        <h2 className="py-2 fw-bold text-center " style={{fontSize:"40px"}}>Account Invitation App</h2>
        <Button
          onClick={() => navigate("/task2/invite")}
          variant="contained"
          sx={{ backgroundColor: "black", my: 2 }}
        >
          Invite a new User
        </Button>
        <br />
        <Button sx={{ color: "black", my: 2 }}>Accounts User List</Button>
        <Suspense
          fallback={
            <Container>
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
            </Container>
          }
        >
          <ActiveUserListTable />
        </Suspense>
        <Button sx={{ color: "black", my: 2 }}>Pending User List</Button>
        <Suspense
          fallback={
            <Container>
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
            </Container>
          }
        >
          <PendingUserListTable />
        </Suspense>
      </Container>
    </div>
  );
};

export default Task2;
