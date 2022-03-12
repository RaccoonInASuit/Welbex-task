import React, {useState} from "react";
import {Formik, Form, Field} from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import "./RegistrationPage.css";

const RegistrationPage = () => {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    "firstName": "",
    "lastName": "",
    "email": "",
    "password": ""
  };

  const onSubmit = (data) => {
    setLoading(true);
    axios.post("http://localhost:3001/users", data).then((response) => {
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className="createUserPage">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className="formContainer">
          <label>First Name</label>
          <Field autocomplete="off" className="input" name="firstName" placeholder="First Name"/>

          <label>Last Name</label>
          <Field autocomplete="off" className="input" name="lastName" placeholder="Last Name"/>

          <label>E-mail</label>
          <Field autocomplete="off" className="input" name="email" placeholder="Email"/>

          <label>Password</label>
          <Field autocomplete="off" className="input" name="password" placeholder="Password"/>

          <LoadingButton type="submit" loading={loading} variant="contained" sx={{width: 500}}>
            Registration
          </LoadingButton>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationPage;
