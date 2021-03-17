import * as React from "react";
import { useAPI } from "../../api/index";
import { Loader } from "../../route/PrivateRoute";
import { ArticleCard } from "./article_card";
export function LeftList(props) {
    const [state, setState] = React.useState({ fetching: false, page: 1, items: [], filter: {} });
    const api = useAPI();
    const setCodeFilter = (v) => {
        setState(Object.assign({}, state, { filter: Object.assign({}, state.filter, { codice: v }) }));
    };
    const setCtrFilter = (v) => {
        setState(Object.assign({}, state, { filter: Object.assign({}, state.filter, { costruttore: v }) }));
    };
    const setDescFilter = (v) => {
        setState(Object.assign({}, state, { filter: Object.assign({}, state.filter, { descrizione: v }) }));
    };
    const refreshGrid = () => setState(Object.assign({}, state, { fetching: true }));
    const itemClick = (id) => { props.itemClicked(id); };
    const mapItems = () => {
        return state.items
            .map(a => { return Object.assign({}, a, { onClick: itemClick }); })
            .map(p => (React.createElement(ArticleCard, Object.assign({ key: p.id }, p))));
    };
    if (state.fetching) {
        api.getArticles(state.page, state.filter)
            .then(i => setState(Object.assign({}, state, { items: i })));
        return React.createElement(Loader, null);
    }
    else {
        return (React.createElement("div", { className: "containter" },
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-12" },
                    React.createElement("input", { type: "text", className: "form-control", placeholder: "codice", value: state.filter.codice, onChange: e => setCodeFilter(e.currentTarget.value) })),
                React.createElement("div", { className: "col-12" },
                    React.createElement("input", { type: "text", className: "form-control", placeholder: "descrizione", value: state.filter.descrizione, onChange: e => setDescFilter(e.currentTarget.value) })),
                React.createElement("div", { className: "col-12" },
                    React.createElement("input", { type: "text", className: "form-control", placeholder: "costruttore", value: state.filter.costruttore, onChange: e => setCtrFilter(e.currentTarget.value) }))),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-12 justify-content-righ" },
                    React.createElement("button", { className: "btn btn-success", onClick: refreshGrid }, "Aggiorna"))),
            React.createElement("div", { className: "row" }, mapItems())));
    }
}
//# sourceMappingURL=leftlist.js.map