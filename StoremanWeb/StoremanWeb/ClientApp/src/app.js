import * as React from "react";
import * as ReactDOM from "react-dom";
import { API, appPath } from "./api/index";
import { Router, Switch, Route, Redirect, NavLink } from "react-router-dom";
import { createBrowserHistory } from 'history';
import PrivateRoute from "./route/PrivateRoute";
import { Login } from "./pages/login/index";
import { ArticleDetail } from "./pages/article_detail/index";
import { ArticleGrid } from "./pages/article_grid/index";
const history = createBrowserHistory();
const App = () => {
    return (React.createElement(API, null,
        React.createElement(Router, { history: history },
            React.createElement(Switch, null,
                React.createElement(Route, { path: appPath("/login") },
                    React.createElement(Login, null)),
                React.createElement(PrivateRoute, { path: appPath("/articlelist/:id") }),
                React.createElement(PrivateRoute, { path: appPath("/articlelist") },
                    React.createElement(Navbar, null),
                    React.createElement("div", null, "article lists")),
                React.createElement(PrivateRoute, { path: appPath("/article/:id") },
                    React.createElement(Navbar, null),
                    React.createElement(ArticleDetail, null)),
                React.createElement(PrivateRoute, { path: appPath("/article") },
                    React.createElement(Navbar, null),
                    React.createElement(ArticleGrid, null)),
                React.createElement(Route, { path: appPath("/") },
                    React.createElement(Redirect, { to: { pathname: appPath("/article") } }))))));
};
const Navbar = () => {
    return (React.createElement("nav", { className: "navbar navbar-expand-md navbar-dark bg-info" },
        React.createElement("button", { className: "navbar-toggler", type: "button", "data-toggle": "collapse", "data-target": "#navbarNav", "aria-controls": "navbarNav", "aria-expanded": "false", "aria-label": "Toggle navigation" },
            React.createElement("span", { className: "navbar-toggler-icon" })),
        React.createElement("div", { className: "collapse navbar-collapse", id: "navbarNav" },
            React.createElement("ul", { className: "navbar-nav mr-auto" },
                React.createElement("li", { className: "nav-item" },
                    React.createElement(NavLink, { className: "nav-link", to: appPath("/article") }, "Articoli")),
                React.createElement("li", { className: "nav-item" },
                    React.createElement(NavLink, { className: "nav-link", to: appPath("/articlelist") }, "Distinte"))))));
};
ReactDOM.render(React.createElement(App, null), document.getElementById("root"));
//# sourceMappingURL=app.js.map