import React, { useState } from "react";
import { Card, Input, Button } from "@nextui-org/react";
import NavBar from "./NavBar";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
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

      setSnackbarMessage(data.message || "Login successful");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      localStorage.setItem("token", data.access_token);

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
        <Card className="">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleLoginSubmit}
          >
            {({ errors, touched }) => (
              <Form className="form-card">
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
                  placeholder="Enter your password"
                  className="input-card "
                />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}

                <Button type="submit">Submit</Button>
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
