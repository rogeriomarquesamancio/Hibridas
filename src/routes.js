import { DefaultLayout } from "./layouts";
import { Redirect } from "react-router-dom";
import Home from "./views/home";

export default [{
	path: "/",
	exact: true,
	layout: DefaultLayout,
	component: () => <Redirect to="/home" />
}, {
	path: "/home",
	exact: true,
	layout: DefaultLayout,									/* Definindo a url da página a ser exibida */
	component: Home
}];
