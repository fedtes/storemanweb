import * as React from "react";
import { useAPI, appPath } from "../../api/index";
import { useHistory } from "react-router";
import { Loader } from "../../route/PrivateRoute";
export function ArticleGrid() {
    const [state, setState] = React.useState({ fetchStatus: 0, page: 1, items: [], filter: {} });
    const history = useHistory();
    const api = useAPI();
    const rowClicked = (ID) => {
        history.push(appPath("/article/" + ID));
    };
    const search = () => {
        setState(Object.assign({}, state, { fetchStatus: 0 }));
    };
    const recordNew = () => {
        history.push(appPath("/article/-1"));
    };
    const changePage = (page) => {
        setState(Object.assign({}, state, { page: page, fetchStatus: 0 }));
    };
    if (0 === state.fetchStatus) {
        api.getArticles(state.page, state.filter)
            .then(r => setState(Object.assign({}, state, { items: r, fetchStatus: 1 })));
        return (React.createElement(Loader, null));
    }
    else {
        return (React.createElement("div", { className: "container mx-0 mx-xl-auto", style: { maxWidth: "unset" } },
            React.createElement("div", { className: "row list-filter" },
                React.createElement("div", { className: "col-md-4 col-12" },
                    React.createElement("input", { type: "text", placeholder: "codice", className: "form-control", value: state.filter.codice, onInput: e => setState(Object.assign({}, state, { filter: Object.assign({}, state.filter, { codice: e.currentTarget.value }) })) })),
                React.createElement("div", { className: "col-md-4 col-12" },
                    React.createElement("input", { type: "text", placeholder: "descrizione", className: "form-control", value: state.filter.descrizione, onInput: e => setState(Object.assign({}, state, { filter: Object.assign({}, state.filter, { descrizione: e.currentTarget.value }) })) })),
                React.createElement("div", { className: "col-md-4 col-12" },
                    React.createElement("input", { type: "text", placeholder: "costruttore", className: "form-control", value: state.filter.costruttore, onInput: e => setState(Object.assign({}, state, { filter: Object.assign({}, state.filter, { costruttore: e.currentTarget.value }) })) }))),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col list-toolbar" },
                    React.createElement("button", { className: "btn btn-primary", onClick: search }, "Cerca"),
                    React.createElement("button", { className: "btn btn-success", onClick: recordNew }, "Nuovo"))),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col list-table" },
                    React.createElement("div", { className: "table-responsive-sm" },
                        React.createElement("table", { className: "table table-striped" },
                            React.createElement("colgroup", null,
                                React.createElement("col", { style: { width: "5%" } }),
                                React.createElement("col", { style: { width: "5%" } }),
                                React.createElement("col", null),
                                React.createElement("col", { style: { width: "7%" } }),
                                React.createElement("col", { style: { width: "7%" } }),
                                React.createElement("col", { style: { width: "7%" } }),
                                React.createElement("col", { style: { width: "7%" } })),
                            React.createElement("thead", null,
                                React.createElement("tr", null,
                                    React.createElement("th", { scope: "col" }, "Codice"),
                                    React.createElement("th", { scope: "col" }, "Costruttore"),
                                    React.createElement("th", { scope: "col" }, "Descrizione"),
                                    React.createElement("th", { scope: "col" }, "Prz.Acquisto"),
                                    React.createElement("th", { scope: "col" }, "Scorta"),
                                    React.createElement("th", { scope: "col" }, "Ricavo"),
                                    React.createElement("th", { scope: "col" }, "Prz.Unitario"))),
                            React.createElement("tbody", null, state.items.map(i => React.createElement(TableRow, { key: i.id, codice: i.codice, costruttore: i.costruttore, descrizione: i.descrizione, prezzoAcquisto: i.prezzoAcquisto, scorta: i.scorta, ricavo: i.ricavo, prezzoUnitario: i.prezzoUnitario, id: i.id, rowClicked: rowClicked }))))))),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col" },
                    React.createElement("ul", { className: "pagination justify-content-end" },
                        React.createElement("li", { onClick: () => changePage(1), className: state.page === 1 ? "page-item active" : "page-item" },
                            React.createElement("span", { className: "page-link" }, "1")),
                        React.createElement("li", { onClick: () => changePage(2), className: state.page === 2 ? "page-item active" : "page-item" },
                            React.createElement("span", { className: "page-link" }, "2")),
                        React.createElement("li", { onClick: () => changePage(3), className: state.page === 3 ? "page-item active" : "page-item" },
                            React.createElement("span", { className: "page-link" }, "3")),
                        React.createElement("li", { className: "page-item disabled" },
                            React.createElement("span", { className: "page-link" }, "...")))))));
    }
}
function TableRow(props) {
    return (React.createElement("tr", { key: props.id, onClick: () => props.rowClicked(props.id) },
        React.createElement("td", null, props.codice),
        React.createElement("td", null, props.costruttore),
        React.createElement("td", null, props.descrizione),
        React.createElement("td", null, props.prezzoAcquisto),
        React.createElement("td", null, props.scorta),
        React.createElement("td", null, props.ricavo),
        React.createElement("td", null, props.prezzoUnitario)));
}
//# sourceMappingURL=index.js.map