
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios"

function Form() {
  const [post, setPost] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
  });

  /// Schema
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
  });

  ///--1---
  const formSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Must have a valid email address")
      .required("Email is required"),
    password: yup.string().required("Must have a valid password"),
    terms: yup
      .boolean()
      .oneOf([true], "Please agree with the Terms and Conditions"),
  });

  ////--2--
  useEffect(() => {
    formSchema.isValid(formData).then((valid) => {
      setIsButtonDisabled(!valid);
    });
  }, [formData]);

  ////---3---

  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch((err) => {
        console.log(err);
        setErrors({ ...errors, [e.target.name]: err.errors[0] });
      });
  };





 


  /////////

  const inputChange = (e) => {
    e.persist();
    const newFormData = {
      ...formData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };
    validateChange(e)
    setFormData(newFormData);
  };

  const formSubmit = (e) => {
         e.preventDefault();
        axios
         .post("https://requres.in/api/users", formData)
         .then((response) => {
            setPost(response.data);
            setFormData({
              name: "",
              email: "",
              motivation: "",
              positions: "",
              terms: ""
            });
          })
          .catch((err) => console.log(err.response));
       };


  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="nameInput">
        Name:
        <input
          type="text"
          id="nameInput"
          name="name"
          value={formData.name}
          onChange={inputChange}
        />
         {errors.name.length > 0 ? (
          <p className="error">{errors.name}</p>
        ) : null}
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          id="emailInput"
          name="email"
          value={formData.email}
          onChange={inputChange}
        />
           {errors.email.length > 0 ? (
          <p className="error">{errors.email}</p>
        ) : null}
      </label>
      <br />
      <label htmlFor="passwordInput">
        Password:
        <input
          type="password"
          id="passwordInput"
          name="password"
          value={formData.password}
          onChange={inputChange}
        />
         {errors.password.length > 0 ? (
          <p className="error">{errors.password}</p>
        ) : null}
      </label>
      <br />
      <label htmlFor="termsInput">
        Terms & Conditions
        <input
          type="checkbox"
          id="termsInput"
          name="terms"
          checked={formData.terms}
          onChange={inputChange}
        />
         {/* {errors.terms.length > 0 ? (
          <p className="error">{errors.terms}</p>
        ) : null} */}
      </label>
      <br />
      <button type="submit" disabled={isButtonDisabled}>
        Submit
      </button>
    </form>
  );
}
export default Form;

