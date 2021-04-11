import * as React from "react";
import * as ReactDOM from "react-dom";
import { useAPI, appPath } from "../../api/index";
import { useHistory } from "react-router";

export function Login() {
    const [state, setState] = React.useState({ username: "", password: "" });
    const api = useAPI();
    const history = useHistory();

    const showWrongUsrPsw = () => {
        $("#msd-err").css("display", "unset");

    };

    const onEnter = (e: any) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            onLoginClick();
        }
    };

    const onLoginClick = () => {
        api.login(state.username, state.password)
            .then(r => "" === r ? history.push(appPath("/")) : showWrongUsrPsw())
    };

    return (
        <div className="container login-page">
            <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6 col-12">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div style={{height:"30vh"}} ></div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-8 col-12">
                                <div className="col-12">
                                    <label>Username</label>
                                </div>
                                <div className="col-12">
                                    <input type="text"
                                        id="txtusername"
                                        onKeyDown={onEnter}
                                        onInput={e => setState({ ...state, username: e.currentTarget.value })}></input>
                                </div>
                                <div className="col-12">
                                    <label>Password</label>
                                </div>
                                <div className="col-12">
                                    <input
                                        type="password"
                                        id="txtpassword"
                                        onKeyDown={onEnter}
                                        onInput={e => setState({ ...state, password: e.currentTarget.value })}></input>
                                </div>
                                <div className="col-12 login-btn">
                                    <button className="btn btn-primary" onClick={onLoginClick}>Login</button>
                                </div>
                                <div className="col-12">
                                    <div id="msd-err" style={{ display: "none", color: "red" }}>Username o password errate!</div>
                                </div>
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3"></div>
            </div>
        </div>
    );
}