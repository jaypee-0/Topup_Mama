import "../styles/Login.scss";
import React from "react";
import { Link } from "react-router-dom";
import { Authcontext } from "../context/Authcontext";
import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	const history = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const handleLogin = (values: any) => {
		let params = {
			email: values.email,
			password: values.password,
		};
		axios
			.post("https://reqres.in/api/login", params)
			.then(function (response) {
				if (response.status === 200) {
					swal(response.data.messgae, {
						title: "Successful",
						text: "Account Created.",
						icon: "success",
						timer: 5000,
					});
					localStorage.setItem("auth", response.data.token);
					setTimeout(() => {
						history("/");
					}, 3000);
				}
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
		<div id="login">
			<div className="vh-100 d-flex align-items-center">
				<div className="formbox col-10 col-sm-7 col-md-6 col-lg-4 mx-auto py-4 px-3">
					<h2 className="pb-1">Welcome back!</h2>
					<p>Login with your details.</p>
					<div className="w-100">
						<form id="loginForm" onSubmit={handleSubmit(handleLogin)} className="form-text">
							{errors.email && <p className="tiro mb-0 fs-6x text-danger">{errors.email.message}</p>}
							<input type="email" placeholder="Email Address" className="my-3 py-3 ps-2" {...register("email", { required: "Email is required!" })} />
							<div className="d-flex flex-row">
								<input
									id="password"
									type={passwordShow ? "text" : "password"}
									placeholder="Password"
									{...register("password", {
										required: "Password is required!",
									})}
									className="w-100 position-relative my-2 py-3 ps-2"
								/>
								<p onClick={togglePassword} className="show cursor-pointer pt-2 mt-3 position-absolute">
									SHOW
								</p>
								{errors.password && <p className="text-danger">{errors.password.message}</p>}
							</div>
							<button type="submit" className="py-3 mt-4 w-100">
								Login
							</button>
							<p className="text-center text-dark mb-0 mt-1">Don't have an account?</p>
							<p className="text-center">
								Register
								<span className="text-decoration-underline">
									<Link to="/register">here</Link>
								</span>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
