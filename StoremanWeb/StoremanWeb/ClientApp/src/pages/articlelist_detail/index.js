import * as React from "react";
import { useAPI } from "../../api/index";
import { useParams } from "react-router";
import { Loader } from "../../route/PrivateRoute";
import { ArticleListHeader } from "./header";
import { LeftList } from "./leftlist";
const defaultArticleList = {
    id: -1,
    creationDate: new Date,
    historyStatus: 0,
    nome: "",
    stato: ""
};
export function ArticleListDetail() {
    const { id } = useParams();
    const api = useAPI();
    const [state, setState] = React.useState({ fetching: true, isDirty: false, isNew: id === "-1", articleList: defaultArticleList });
    const rightListRef = React.useRef();
    const recordSave = () => { };
    const recordDelete = () => { };
    /* ------------- Sync beteew left-right ------------------- */
    const onLeftItemAddClick = (id) => { };
    if (state.fetching) {
        api.getArticleList(id)
            .then(a => setState(Object.assign({}, state, { fetching: false, articleList: a })));
        return (React.createElement(Loader, null));
    }
    else {
        return (React.createElement("div", { className: "container" },
            React.createElement("div", { className: "row" },
                React.createElement(ArticleListHeader, { articleList: state.articleList, saveClick: recordSave, deleteClick: recordDelete })),
            React.createElement("div", { className: "row d-md-none" },
                React.createElement("ul", { className: "nav nav-tabs" },
                    React.createElement("li", { className: "nav-item" },
                        React.createElement("div", { className: "nav-link active" })),
                    React.createElement("li", { className: "nav-item" },
                        React.createElement("div", { className: "nav-link" })))),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-md-4 col-12" },
                    React.createElement(LeftList, { itemClicked: onLeftItemAddClick })),
                React.createElement("div", { className: "col-md-8 col-12" }))));
    }
}
//# sourceMappingURL=index.js.map