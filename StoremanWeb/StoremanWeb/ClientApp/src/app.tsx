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
    return (
        <API>
            <Router history={history}>
                <Switch>
                    <Route path={appPath("/login")}>
                        <Login></Login>
                    </Route>
                    <PrivateRoute path={appPath("/articlelist/:id")}>
                        
                    </PrivateRoute>
                    <PrivateRoute path={appPath("/articlelist")}>
                        <Navbar></Navbar>
                        <div>article lists</div>
                    </PrivateRoute>
                    <PrivateRoute path={appPath("/article/:id")}>
                        <Navbar></Navbar>
                        <ArticleDetail></ArticleDetail>
                    </PrivateRoute>
                    <PrivateRoute path={appPath("/article")}>
                        <Navbar></Navbar>
                        <ArticleGrid></ArticleGrid>
                    </PrivateRoute>

                    <Route path={appPath("/")}>
                        <Redirect to={{ pathname: appPath("/article") }}></Redirect>
                    </Route>
                </Switch>
            </Router>
        </API>
    );
};


const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-info">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to={appPath("/article")}>Articoli</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to={appPath("/articlelist")}>Distinte</NavLink>
                    </li>
                </ul>
            </div>
        </nav>    
    );
}
ReactDOM.render(<App />, document.getElementById("root"));