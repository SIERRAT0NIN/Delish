import React from "react";
import { Card, Input, Button } from "@nextui-org/react";
import NavBar from "./NavBar";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  return (
    <div>
      <NavBar />
      <div className="form-card">
        <Card className="">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
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
      </div>
    </div>
  );
};

export default Login;
