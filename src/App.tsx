import "./styles/App.scss";
import React from "react";
import { Nav } from "./layouts/Nav";
import { Home } from "./pages/Home";
import { Users } from "./pages/Users";
import { Login } from "./pages/Login";
import { Footer } from "./layouts/Footer";
import { Authcontext } from "./context/Authcontext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Error from "./components/Error";
import PrivateRoute from "./utils/PrivateRoute";
import Account from "./pages/Account";
import { Signup } from "./pages/Signup";

function App() {
	interface Auth {
		user: boolean | object;
	}

	const user: Auth = React.useContext(Authcontext);

	return (
		<Router>
			{user && <Nav />}
			<Routes>
				{!user && <Route path={"/login"} element={<Login />} />}
				{!user && <Route path={"/register"} element={<Signup />} />}
				<Route element={<PrivateRoute />}>
					{user && <Route path={"/"} element={<Home />} />}
					<Route path="/account" element={<Account />} />
					<Route path="/users" element={<Users />} />
				</Route>
				<Route path="*" element={<Error />} />
			</Routes>
			{user && <Footer />}
		</Router>
	);
}

export default App;
