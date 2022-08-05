import { Authcontext } from "../context/Authcontext";
import { Link } from "react-router-dom";
import "../styles/Register.scss";
import React from "react";
import swal from "sweetalert";
import company from "../assets/images/company.jpg";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
	const history = useNavigate();
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm();
	const submitData = (data: any) => {
		let params = {
			email: data.email,
			password: data.password,
			confirmpassword: data.cpassword,
		};
		console.log(data);
		axios
			.post("https://reqres.in/api/register", params)
			.then(function (response) {
				swal(response.data.message, {
          title: "Successful",
          text: "Account Created.",
          icon: "success",
          timer: 5000,
        });
				reset();
				setTimeout(() => {
					history("/login");
				}, 3000);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const [passwordShow, setPasswordShow] = React.useState<Boolean>(false);

	const togglePassword = () => {
		setPasswordShow(!passwordShow);
	};

	return (
		<div id="register">
			<div className="vh-100 d-flex align-items-center">
        <div className=" d-none d-lg-block col-lg-6">
          <img className="imgbg" src={company} alt="" />
        </div>
        <div className="formbox col-10 col-sm-7 col-md-9 col-lg-5 mx-auto py-4 px-3">
          <h2 className="pb-1">Register as a new user</h2>
          <div className="w-100">
            <form id="registerForm" onSubmit={handleSubmit(submitData)} className="form-text">
              <input type="email" placeholder="Email Address" className="my-3 py-3 ps-2" {...register("email", { required: "Email is required!" })} />
              {errors.email && (
												<p className="text-danger">
													{errors.email.message}
												</p>
											)}

              <input type="password"
												min="8" placeholder="Password" className="my-3 py-3 ps-2" 
												{...register("password", {
													required: "Password is required!",
												})}
											/> 
              {errors.password && (
												<p className="text-danger">
													{errors.password.message}
												</p>
											)}
              <div className="d-flex flex-row">
                <input
                  id="confirmpassword"
                  placeholder="Confirm Password"
                  type={passwordShow ? 'text' : 'password'}
                  
												min="8"
                  className="w-100 position-relative my-2 py-3 ps-2"
                  {...register("cpassword", {
													required: "Confirm Password is required",

													validate: (value) => value === watch("password") || "Passwords don't match.",
												})}
                />
                <p onClick={togglePassword} className="show cursor-pointer pt-2 mt-3 position-absolute">
                  SHOW
                </p>
              </div>
              {errors.cpassword && (
												<p className="text-danger">
													{errors.cpassword.message}
												</p>
											)}
              <button type="submit" className="py-3 mt-3 w-100">
                Register User
              </button>
              <p className="text-center text-dark mb-0 mt-1">Have an account?</p>
              <Link to="/login">
                 <p className="text-center">&rarr; To login</p>
              </Link>
            </form>
          </div>
        </div>
      </div> 
		</div>
	);
};
