import React from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import "./task1.css";

function AlertComponent({
  isShow,
  type,
  title,
  description,
  onClose,
}: {
  isShow: boolean;
  type: string;
  title: string;
  description: string;
  onClose: () => void;
}) {
  return (
    <>
      {isShow && (
        <Alert
          className="w-25 py-1 mt-3  position-absolute "
          style={{ marginLeft: "20px" }}
          variant={`${
            type?.toLowerCase() === "error"
              ? "danger"
              : type?.toLowerCase() === "warning"
              ? "warning"
              : "success"
          }`}
          onClose={onClose}
          dismissible
        >
          <div className="d-flex align-items-center">
            <Button
              className="py-1 px-3"
              variant={`${
                type?.toLowerCase() === "error"
                  ? "danger"
                  : type === "warning"
                  ? "warning"
                  : "success"
              }`}
            >
              {type}
            </Button>
            <h6 className="mx-1 mt-2">{title}</h6>
            <small className="mx-1">{description}</small>
          </div>
        </Alert>
      )}
    </>
  );
}

export default AlertComponent;
