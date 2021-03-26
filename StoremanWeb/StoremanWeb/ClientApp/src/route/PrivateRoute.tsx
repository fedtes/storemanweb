import { Route, Redirect, withRouter } from "react-router";
import * as React from "react";
import { APIContext, appPath } from "../api/index";

class PrivateRoute extends Route {
    static contextType = APIContext

    public constructor(props: any) {
        super(props);
        this.state = { gotoLogin: false };
    }

    async componentDidMount() {
        if (await this.context.ping()) {
            this.setState({ gotoLogin: false });
        } else {
            this.setState({ gotoLogin: true });
        }
    }

    render() {
        if (this.context.hasLoggedUser()) {
            return super.render();
        } else if (this.state.gotoLogin) {
            return <Redirect to={appPath('/login')} />;
        } else
            return (<Loader />)
    }
};


export function Loader() {
    return (
        <div className="flex-center-container">
            <div className="spinner-border text-info" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default PrivateRoute;