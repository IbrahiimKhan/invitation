import React, { useState } from "react";
import AlertComponent from "./AlertComponent";
import Select from "react-select";
import { Form } from "react-bootstrap";

const AlertDisplay = () => {
  const [type, setType] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  const options = [
    { value: "Error", label: "Error" },
    { value: "Warning", label: "Warning" },
    { value: "Success", label: "Success" },
  ];

  const showAlert = () => {
    if (type || title || desc) {
      setShow(true);
      setType(type?.toLowerCase());
      setTitle(title?.toLowerCase());
      setDesc(desc?.toLowerCase());
    } else {
      alert("Please put at least one value");
      return;
    }
  };

  const closeAlert = () => {
    setShow(false);
  };

  return (
    <>
      <AlertComponent
        isShow={show}
        type={type}
        title={title}
        description={desc}
        onClose={closeAlert}
      />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="w-25">
          <p>Select alert type</p>
          <Select
            options={options}
            onChange={(selectedOption: any) => {
              setShow(false);
              setType(selectedOption.value);
            }}
          />
          <br />
          <Form.Control
            type="text"
            placeholder="Alert Title..."
            onChange={(e) => {
              setShow(false);
              setTitle(e.target.value);
            }}
          />
          <br />
          <Form.Control
            type="text"
            placeholder="Alert Description..."
            onChange={(e) => {
              setShow(false);
              setDesc(e.target.value);
            }}
          />
          <br />
          <button onClick={showAlert} className="btn btn-primary">
            Show Alert
          </button>
        </div>
      </div>
    </>
  );
};

export default AlertDisplay;
