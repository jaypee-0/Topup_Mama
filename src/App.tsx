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

function App() {
	interface Auth {
		user: boolean | object;
	}

	const  user : Auth = React.useContext(Authcontext);

	return (
		<Router>
			<Nav />
			<Routes>
				{user === null && <Route path={"/"} element={<Login />} />}
				<Route element={<PrivateRoute />}>
					{user !== null && <Route path={"/"} element={<Home />} />}
					<Route path="/account" element={<Account />} />
					<Route path="/users" element={<Users />} />
				</Route>
				<Route path="*" element={<Error />} />
			</Routes>
			{user !== null && <Footer />}
		</Router>
	);
}

export default App;
