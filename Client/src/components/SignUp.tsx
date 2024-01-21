import React from "react";
import { Card, Input, Button } from "@nextui-org/react";
import NavBar from "./NavBar";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";

// TypeScript interface for form values
interface FormValues {
  username: string;
  email: string;
  password: string;
}

// Yup validation schema
const SignUpSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SignUp: React.FC = () => {
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
      const data = await response.json();
      console.log("Success:", data);
      // Set a success status message
      setStatus({ success: data.message });
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      // Set an error status message
      setStatus({ error: "Failed to sign up. Please try again." });
    }
    setSubmitting(false);
  };
  return (
    <div className="form-card">
      <NavBar />
      <Card className="form-card">
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

                <Button type="submit">Submit</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default SignUp;
