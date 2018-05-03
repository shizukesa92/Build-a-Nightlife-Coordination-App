import React, {
	Component
} from "react";
import ReactDOM from "react-dom";
import {
	BrowserRouter
} from "react-router-dom";
import {
	connect
} from "react-redux";
import Routes from "./routes";
import Header from "./components/Header";
import Footer from "./components/Footer";


require("./main.scss");
require("./components/Components.scss");

export default class App extends Component {

	render() {
		return (
			<BrowserRouter>
			<div id = "wrapper">
            <Header />
			<div id ="content">
				<Routes />
			</div>
	<Footer />
</div>
			</BrowserRouter>
		);
	}
}
