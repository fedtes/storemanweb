import * as React from "react";
import { useAPI, appPath } from "../../api/index";
import { useHistory } from "react-router";
export function Login() {
    const [state, setState] = React.useState({ username: "", password: "" });
    const api = useAPI();
    const history = useHistory();
    const showWrongUsrPsw = () => {
        $("#msd-err").css("display", "unset");
    };
    const onLoginClick = () => {
        api.login(state.username, state.password)
            .then(r => "" === r ? history.push(appPath("/")) : showWrongUsrPsw());
    };
    return (React.createElement("div", { className: "container login-page" },
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "col-lg-3" }),
            React.createElement("div", { className: "col-lg-6 col-12" },
                React.createElement("div", { className: "container" },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col" },
                            React.createElement("div", { style: { height: "30vh" } }))),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-2" }),
                        React.createElement("div", { className: "col-md-8 col-12" },
                            React.createElement("div", { className: "col-12" },
                                React.createElement("label", null, "Username")),
                            React.createElement("div", { className: "col-12" },
                                React.createElement("input", { type: "text", id: "txtusername", onInput: e => setState(Object.assign({}, state, { username: e.currentTarget.value })) })),
                            React.createElement("div", { className: "col-12" },
                                React.createElement("label", null, "Password")),
                            React.createElement("div", { className: "col-12" },
                                React.createElement("input", { type: "password", id: "txtpassword", onInput: e => setState(Object.assign({}, state, { password: e.currentTarget.value })) })),
                            React.createElement("div", { className: "col-12 login-btn" },
                                React.createElement("button", { className: "btn btn-primary", onClick: onLoginClick }, "Login")),
                            React.createElement("div", { className: "col-12" },
                                React.createElement("div", { id: "msd-err", style: { display: "none", color: "red" } }, "Username o password errate!"))),
                        React.createElement("div", { className: "col-md-2" })))),
            React.createElement("div", { className: "col-lg-3" }))));
}
//# sourceMappingURL=index.js.map