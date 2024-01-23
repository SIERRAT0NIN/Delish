import React, { useState } from "react";
import { Card, Input, Button } from "@nextui-org/react";
import NavBar from "../Home/NavBar";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
// TypeScript interface for form values
interface FormValues {
  username: string;
  email: string;
  password: string;
}
import { useNavigate } from "react-router-dom";

// Yup validation schema
const SignUpSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SignUp: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const navigate = useNavigate();
  const initialValues: FormValues = {
    username: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm, setStatus }: FormikHelpers<FormValues>
  ) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
      });
      if (!response.ok) throw new Error("Signup failed");

      const data = await response.json();
      console.log("Success:", data);
      setSnackbarMessage(data.message || "User created successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      resetForm();
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      setSnackbarMessage("Failed to sign up. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
    setSubmitting(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <>
      <NavBar />
      <div className="form-card mx-auto max-w-md space-y-6">
        <Card className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 p-5">
          <h1 className="pt-3">Sign Up!</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={SignUpSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="input-card ">
                <div className="input-card">
                  <Field
                    name="username"
                    as={Input}
                    placeholder="Enter your username"
                    className="input-card "
                  />
                  {errors.username && touched.username ? (
                    <div>{errors.username}</div>
                  ) : null}

                  <Field
                    name="email"
                    as={Input}
                    placeholder="Enter your email"
                    className="input-card "
                  />
                  {errors.email && touched.email ? (
                    <div>{errors.email}</div>
                  ) : null}

                  <Field
                    name="password"
                    type="password"
                    as={Input}
                    placeholder="Create a password"
                    className="input-card "
                  />
                  {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                  ) : null}

                  <Button variant="shadow" color="primary" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>{" "}
    </>
  );
};

export default SignUp;
