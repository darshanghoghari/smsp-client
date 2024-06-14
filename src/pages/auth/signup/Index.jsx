import React, { useCallback } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignUpImage from '../assets/SignUp-Image.webp';
import { signup } from "../../../features/auth/authSlice";

const initialValues = {
  fullName: "",
  email: "",
  contactNo: "",
  password: "",
  confirmPassword: "",
};

export const signUpSchema = Yup.object({
  fullName: Yup.string().min(2).max(25).required("Please enter your full name"),
  email: Yup.string().email().required("Please enter your email"),
  contactNo: Yup.string().min(10).max(15).required("Please enter your contact number"),
  password: Yup.string().min(6).required("Please enter your password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values, action) => {
      handleSubmit(values, action);
    },
  });

  const handleSubmit = useCallback((values, action) => {
    dispatch(signup(values))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch, navigate]);

  return (
    <Wrapper>
      <div className="container">
        <div className="modal">
          <div className="modal-container">
            <div className="modal-right">
              <img src={SignUpImage} alt="Sign Up" />
            </div>
            <div className="modal-left">
              <h1 className="modal-title">Welcome!</h1>
              <p className="modal-desc">
                To the Society Management System.
              </p>
              <form onSubmit={formik.handleSubmit}>
                <div className="input-block">
                  <label htmlFor="fullName" className="input-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    name="fullName"
                    id="fullName"
                    placeholder="Full Name"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.fullName && formik.touched.fullName ? (
                    <p className="form-error">{formik.errors.fullName}</p>
                  ) : null}
                </div>
                <div className="input-block">
                  <label htmlFor="email" className="input-label">
                    Email
                  </label>
                  <input
                    type="email"
                    autoComplete="off"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <p className="form-error">{formik.errors.email}</p>
                  ) : null}
                </div>
                <div className="input-block">
                  <label htmlFor="contactNo" className="input-label">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    name="contactNo"
                    id="contactNo"
                    placeholder="Contact Number"
                    value={formik.values.contactNo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.contactNo && formik.touched.contactNo ? (
                    <p className="form-error">{formik.errors.contactNo}</p>
                  ) : null}
                </div>
                <div className="input-block">
                  <label htmlFor="password" className="input-label">
                    Password
                  </label>
                  <input
                    type="password"
                    autoComplete="off"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <p className="form-error">{formik.errors.password}</p>
                  ) : null}
                </div>
                <div className="input-block">
                  <label htmlFor="confirmPassword" className="input-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    autoComplete="off"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                    <p className="form-error">{formik.errors.confirmPassword}</p>
                  ) : null}
                </div>
                <div className="modal-buttons">
                  <button className="input-button" type="submit">
                    Register
                  </button>
                </div>
              </form>
              <p className="sign-up">
                Already have an account? <a href="/">Login Here</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #efedee;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    width: 100%;
    background: rgba(51, 51, 51, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: 0.4s;
  }
  .modal-container {
    display: flex;
    max-width: 60vw;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    position: absolute;
    transition-duration: 0.3s;
    background: #fff;
  }
  .modal-title {
    margin: 0;
    font-weight: 400;
    color: #55311c;
  }
  .form-error {
    font-size: 1.4rem;
    color: #b22b27;
  }
  .modal-desc {
    margin: 6px 0 30px 0;
  }
  .modal-left {
    padding: 60px 30px 20px;
    background: #fff;
    flex: 1.5;
    transition-duration: 0.5s;
    opacity: 1;
  }

  .modal-right {
    flex: 2;
    font-size: 0;
    transition: 0.3s;
    overflow: hidden;
  }
  .modal-right img {
    width: 100%;
    height: 100%;
    transform: scale(1);
    object-fit: cover;
    transition-duration: 1.2s;
  }

  .modal.is-open .modal-left {
    transform: translateY(0);
    opacity: 1;
    transition-delay: 0.1s;
  }
  .modal-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .modal-buttons a {
    color: rgba(51, 51, 51, 0.6);
    font-size: 14px;
  }

  .sign-up {
    margin: 60px 0 0;
    font-size: 14px;
    text-align: center;
  }
  .sign-up a {
    color: #8c7569;
  }

  .input-button {
    padding: 0.5rem 2rem;
    outline: none;
    text-transform: uppercase;
    border: 0;
    color: #fff;
    border-radius: 4px;
    background: #8c7569;
    transition: 0.3s;
    cursor: pointer;
    font-family: "Nunito", sans-serif;
  }
  .input-button:hover {
    background: #55311c;
  }

  .input-label {
    font-size: 11px;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.7px;
    color: #8c7569;
    transition: 0.3s;
  }

  .input-block {
    display: flex;
    flex-direction: column;
    padding: 10px 10px 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 20px;
    transition: 0.3s;
  }
  .input-block input {
    outline: 0;
    border: 0;
    padding: 4px 0 0;
    font-size: 14px;
  }

  .input-block input::-moz-placeholder {
    color: #ccc;
    opacity: 1;
  }
  .input-block input:-ms-input-placeholder {
    color: #ccc;
    opacity: 1;
  }
  .input-block input::placeholder {
    color: #ccc;
    opacity: 1;
  }
  .input-block:focus-within {
    border-color: #8c7569;
  }
  .input-block:focus-within .input-label {
    color: rgba(140, 117, 105, 0.8);
  }

  @media (max-width: 750px) {
    .modal-container {
      max-width: 90vw;
    }

    .modal-right {
      display: none;
    }
  }
`;

export default RegistrationPage;
