import "../styles/Error.scss";
import { Link } from "react-router-dom";
import error from "../assets/images/error.png";

const Error = () => {
	return (
		<div id="Error" className="container d-flex flex-column-reverse flex-md-row justify-content-center">
			<div className="col-12 col-md-7">
				<img className="img-fluid" src={error} alt="" />
			</div>
			<div className="col-12 col-md-5 align-self-center">
				<h2>OH NO!</h2>
				<h5>PAGE NOT FOUND</h5>
				<p className="fs-5 col-md-7 col-lg-5">It seems the page you're looking for doesn't exist.</p>
				<Link to={"/" || "/login"}>
					<button className="px-4 py-3">GO BACK TO HOME</button>
				</Link>
			</div>
		</div>
	);
};

export default Error;
