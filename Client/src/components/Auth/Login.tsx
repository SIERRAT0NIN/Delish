import React, { useState } from "react";
import { Card, Input, Button } from "@nextui-org/react";
import NavBar from "../Home/NavBar";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "error"
  );
  const handleLoginSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      localStorage.setItem("token", data.access_token);
      navigate("/");
      setSnackbarMessage(data.message || "Login successful");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // Redirect or update UI state
    } catch (error) {
      setSnackbarMessage(error.message || "Failed to login. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
    setSubmitting(false);
  };

  return (
    <div>
      <NavBar />
      <div className="  form-card mx-auto max-w-md space-y-6">
        <Card className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          <h1 className="pt-3">Login</h1>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleLoginSubmit}
          >
            {({ errors, touched }) => (
              <Form className="form-card ">
                <Field
                  name="email"
                  as={Input}
                  placeholder="Enter your email"
                  className="input-card  "
                />
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}

                <Field
                  name="password"
                  type="password"
                  as={Input}
                  placeholder="Enter your password"
                  className="input-card "
                />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}

                <Button variant="shadow" color="primary" type="submit">
                  Submit
                </Button>
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
      </div>
    </div>
  );
};

export default Login;
