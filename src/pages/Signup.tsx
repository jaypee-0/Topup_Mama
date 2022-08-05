import { faGoogle, faTwitter, faFacebookF } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome";
import { Authcontext } from "../context/Authcontext";
import { Link } from "react-router-dom";
import "../Login/Login.scss";
import React from "react";
import company from "../../Assets/loginpage.png";

export const Signup = () => {
	interface Auth {
		errorreg: object | Boolean
		user: Boolean | object
		handleRegisterStudent: (e: React.FormEvent) => void
	  }
	
	let { handleRegisterStudent, errorreg, user } : Auth = React.useContext(Authcontext);
	const [passwordShow, setPasswordShow] = React.useState<Boolean>(false);

	const togglePassword: Function = () => {
		setPasswordShow(!passwordShow);
	};

	return (
		<div id="loginPage">
			<div className="d-flex align-items-center flex-row">
				<div className="position-relative col-6 d-none d-lg-block">
					<img className="imglogin" src={company} alt="" />
				</div>
				<div className="col-10 col-lg-6 mx-auto px-3">
					<h2 className="h2blue pb-1">Let's get you signed up</h2>
					<p className="text-left logintext">Fill in your details.</p>
					<div className="w-100">
						<form id="loginForm" onSubmit={handleRegisterStudent} className="form-text">
							<input type="text" placeholder="First Name" name="firstName" className="my-3 py-3 ps-2" required />
							<input type="text" placeholder="Last Name" name="lastName" className="my-3 py-3 ps-2" required />
							<input id="email" type="email" name="email" placeholder="jaypee@gmail.com" className="w-100 position-relative my-2 py-3 ps-2" required />
							{errorreg && <p className="tiro fs-6x text-danger">{errorreg.email}</p>}
							<div className="d-flex flex-row">
								<input id="password" type={passwordShow ? "text" : "password"} placeholder="Password" name="password" className="w-100 position-relative my-2 py-3 ps-2" />
								<p onClick={togglePassword} className="pe-2 cursor-pointer pt-2 mt-3 position-absolute">
									SHOW
								</p>
							</div>
							{errorreg &&
								errorreg.password?.map((error: string | number, index:number): any => {
									return (
										<p key={index} className="d-flex mb-0 flex-column tiro fs-6x text-danger" style={{ pointerEvents: "none" }}>
											{error}
										</p>
									);
								})}
							<button type="submit" className="mt-2 py-3 w-100">
								Sign Up
							</button>
							<div className="d-flex my-2">
								<hr className="w-100 " />
								<p className="px-3 mb-0 align-self-center">OR</p>
								<hr className="w-100 " />
							</div>
							<div className="d-flex justify-content-evenly mb-2">
								<button className="reidlight rounded-pill py-2 btn">
									<FA icon={faGoogle} />
								</button>
								<button className="reidlight rounded-pill py-2 btn">
									<FA icon={faTwitter} />
								</button>
								<button className="reidlight rounded-pill py-2 btn">
									<FA icon={faFacebookF} />
								</button>
							</div>
							<p className="text-center text-dark mb-0 mt-1">Already have an account</p>
							<Link to={user ? "/login" : "/"}>
								<p className="text-center">Back to Login</p>
							</Link>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
