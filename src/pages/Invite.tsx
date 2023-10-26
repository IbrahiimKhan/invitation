import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Form } from "react-bootstrap";
import AlertComponent from "../task1/component/AlertComponent";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Invite = () => {
  //types
  type roletype = {
    value: number | string;
    label: string;
  };

  const uuid = process.env.REACT_APP_UUID;
  const { data, loading, error } = useFetch(`/security/accounts/${uuid}/roles`);
  //   console.log("roles", data);
  const [errorType, setErrorType] = useState<string>("");
  const [errorHeader, setErrorHeader] = useState<string>("");
  const [errorDesc, setErrorDesc] = useState<string>("");
  const [type, setType] = useState<roletype[]>([]);
  const [email, setEmail] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [options, setOptions] = useState<any>([]);
  const base_url = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_ACCESS_TOKEN;
  const navigate = useNavigate();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  function validateEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  const handleInvite = () => {
    if (!email) {
      setErrorType("warning");
      setErrorHeader("Email");
      setErrorDesc("is required");
      setShow(true);
      return;
    }
    if (!validateEmail(email)) {
      setErrorType("warning");
      setErrorHeader("Email");
      setErrorDesc("is invalid");
      setShow(true);
      return;
    }
    if (type?.length > 1) {
      setErrorType("warning");
      setErrorHeader("Role");
      setErrorDesc("is required");
      setShow(true);
      return;
    }
    const data = {
      emailInvitedTo: email,
      rolesInvitedTo: type?.map((option: any) => option?.value),
    };
    console.log(data);
    axios
      .post(base_url + `/security/accounts/${uuid}/invite-user`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.status === 201) {
          setErrorType("success");
          setErrorHeader("user");
          setErrorDesc("created successfully");
          setShow(true);
          // navigate("/task2");
        }
      })
      .catch((error) => {
        setErrorType("Error");
        setErrorHeader("Can't");
        setErrorDesc("create user");
        setShow(true);
      });
  };

  const closeAlert = () => {
    setShow(false);
  };
  useEffect(() => {
    setOptions(
      data?.map((item: any) => ({
        value: item?.id,
        label: item?.name,
      }))
    );
  }, [data]);

  const handleSelect = (selectedOption: roletype[]) => {
    setShow(false);
    setType(selectedOption);
  };
  // console.log(type);
  return (
    <>
      <AlertComponent
        isShow={show}
        type={errorType}
        title={errorHeader}
        description={errorDesc}
        onClose={closeAlert}
      />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="w-25">
          <h2 className="py-2 fw-bold text-center text-decoration-underline ">
            Invite user
          </h2>
          <p className="py-2 fw-bold ">User Email</p>
          <Form.Control
            type="text"
            placeholder="Type email..."
            onChange={(e) => {
              setShow(false);
              setEmail(e.target.value);
            }}
          />
          <p className="py-2 fw-bold ">Select Role</p>
          <Select
            isMulti
            options={options}
            onChange={(selectedOption: any) => {
              handleSelect(selectedOption);
            }}
          />
          <br />
          <br />
          <button onClick={handleInvite} className="btn btn-primary">
            Invite
          </button>
        </div>
      </div>
    </>
  );
};

export default Invite;
