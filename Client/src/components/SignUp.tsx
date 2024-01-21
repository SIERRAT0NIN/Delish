import React from "react";
import { Card, Input, Button } from "@nextui-org/react";
import NavBar from "./NavBar";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";

// TypeScript interface for form values
interface FormValues {
  name: string;
  email: string;
  password: string;
}

// Yup validation schema
const SignUpSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SignUp: React.FC = () => {
  const initialValues: FormValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    fetch("http://127.0.0.1:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.name,
        email: values.email,
        password: values.password,
        // confirmPassword is not sent to the server
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setSubmitting(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setSubmitting(false);
      });
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
                  name="name"
                  as={Input}
                  placeholder="Enter your name"
                  className="input-card "
                />
                {errors.name && touched.name ? <div>{errors.name}</div> : null}

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
