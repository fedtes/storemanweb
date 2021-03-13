var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Route, Redirect } from "react-router";
import * as React from "react";
import { APIContext, appPath } from "../api/index";
class PrivateRoute extends Route {
    constructor(props) {
        super(props);
        this.state = { gotoLogin: false };
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.context.ping()) {
                this.setState({ gotoLogin: false });
            }
            else {
                this.setState({ gotoLogin: true });
            }
        });
    }
    render() {
        if (this.context.hasLoggedUser()) {
            return super.render();
        }
        else if (this.state.gotoLogin) {
            return React.createElement(Redirect, { to: appPath('/login') });
        }
        else
            return (React.createElement(Loader, null));
    }
}
PrivateRoute.contextType = APIContext;
;
export function Loader() {
    return (React.createElement("div", null, "I'm loading"));
}
;
export default PrivateRoute;
//# sourceMappingURL=PrivateRoute.js.map