import React from "react";
import { Card, Input, Button } from "@nextui-org/react";
import NavBar from "./NavBar";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const SignUp = () => {
  return (
    <div className="form-card">
      <NavBar />
      <Card className="form-card">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
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

                <Field
                  name="confirmPassword"
                  type="password"
                  as={Input}
                  placeholder="Confirm your password"
                  className="input-card "
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <div>{errors.confirmPassword}</div>
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
