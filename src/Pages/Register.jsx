import React, { useState, useEffect } from "react";
import Logo from "../ImageResources/Logo.png";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Formik } from "formik";
import { RegisterSchema } from "../Utils/Validations/RegisterSchema";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../Features/auth/authSlice";
import { reset } from "../Features/auth/authSlice";
import { BallTriangle } from "react-loader-spinner";

const Register = () => {
  const [visible, setVisible] = useState(false);
  const togglePassword = () => {
    setVisible(!visible);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log("Not LoggedIn");
    }
    if(isSuccess || user ) {
      navigate("/")
    }

    dispatch(reset());
  }, [isError, isSuccess, user, dispatch, navigate]);

  if (isLoading) {
    return (
      <div className="spinner">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#000"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="container overflow-x-hidden w-[80%] flex flex-col justify-center items-center mx-auto mt-[15%] py-12 px-6 border border-solid border-veryLightgrey rounded-lg md:w-[450px] md:mt-[3%]">
      <img
        src={Logo}
        alt="Movix Logo"
        className="flex justify-center items-center mx-auto mb-8"
        width={50}
        height={50}
      />
      <div>
        <h1 className="text-3xl font-bold flex justify-center  font-700 font-WorkSans">
          Hi, Welcome
        </h1>
        <p className="text-lightGrey text-center font-WorkSans">
          Please sign-up to start your experience
        </p>
      </div>
      <Formik
        initialValues={{ fullname: "", password: "", email: "" }}
        validationSchema={RegisterSchema}
        onSubmit={async (values, { setSubmitting }) => {
          dispatch(register(values));
          setSubmitting(true);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col mb-8 space-y-4 mt-4 w-[100%]"
          >
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-[100%] p-1.5 border border-solid border-veryLightgrey rounded-md md:p-3 font-WorkSans"
                name="fullname"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {errors.fullname && touched.fullname ? (
                <small
                  style={{
                    textAlign: "left",
                    color: "orangered",
                  }}
                >
                  {errors.fullname}
                </small>
              ) : null}
              <input
                type="text"
                placeholder="Email"
                className="w-[100%] p-1.5 border border-solid border-veryLightgrey rounded-md md:p-3 font-WorkSans"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email ? (
                <small
                  style={{
                    textAlign: "left",
                    color: "orangered",
                  }}
                >
                  {errors.email}
                </small>
              ) : null}
              <div>
                <input
                  type={visible ? "text" : "password"}
                  placeholder="Password"
                  className="w-[100%] p-1.5 border border-solid border-veryLightgrey rounded-md md:p-3 font-WorkSans"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <div
                  className="relative left-[85%] -mt-8  md:left-[90%] md:-mt-10 md:mb-4"
                  onClick={togglePassword}
                >
                  {visible ? (
                    <FaEyeSlash size={30} color={"lightGrey"} />
                  ) : (
                    <FaEye size={30} color={"lightGrey"} />
                  )}
                </div>
                {errors.password && touched.password ? (
                  <small
                    style={{
                      textAlign: "left",
                      color: "orangered",
                    }}
                  >
                    {errors.password}
                  </small>
                ) : null}
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-white bg-black rounded-md p-1.5 md:p-3 font-Inter"
            >
              {isSubmitting ? "REGISTERING" : "REGISTER"}
            </button>
          </form>
        )}
      </Formik>
      <p className="text-lightGrey text-center font-WorkSans">
        Already have an account?{" "}
        <Link to={"/Login"}>
          <span className="text-orangeRed">Login</span>
        </Link>
      </p>
    </div>
  );
};

export default Register;