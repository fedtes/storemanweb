import * as React from "react";
import { useAPI, appPath } from "../../api/index";
import { useHistory } from "react-router";
import { Loader } from "../../route/PrivateRoute";
function toDateInputValue(date) {
    if (!date)
        return null;
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    return date.getFullYear() + "-" + (month) + "-" + (day);
}
function fromDateInputValue(date) {
    var x = date.split("-");
    return new Date(parseInt(x[0]), parseInt(x[1]), parseInt(x[2]));
}
export function ArticleListGrid() {
    const [state, setState] = React.useState({ fetching: true, page: 1, items: [], filter: {} });
    const history = useHistory();
    const api = useAPI();
    const rowClicked = (ID) => {
        history.push(appPath("/articlelist/" + ID));
    };
    const search = () => {
        setState(Object.assign({}, state, { fetching: true }));
    };
    const recordNew = () => {
        history.push(appPath("/articlelist/-1"));
    };
    const changePage = (page) => {
        setState(Object.assign({}, state, { page: page, fetching: true }));
    };
    if (state.fetching) {
        api.getArticleLists(state.page, state.filter)
            .then(i => setState(Object.assign({}, state, { fetching: false, items: i })));
        return (React.createElement(Loader, null));
    }
    else {
        return (React.createElement("div", { className: "container mx-0 mx-xl-auto", style: { maxWidth: "unset" } },
            React.createElement("div", { className: "row list-filter" },
                React.createElement("div", { className: "col-md-3 col-12" },
                    React.createElement("input", { type: "text", placeholder: "nome", className: "form-control", value: state.filter.nome, onInput: e => setState(Object.assign({}, state, { filter: Object.assign({}, state.filter, { nome: e.currentTarget.value }) })) })),
                React.createElement("div", { className: "col-md-3 col-12" },
                    React.createElement("input", { type: "text", placeholder: "stato", className: "form-control", value: state.filter.stato, onInput: e => setState(Object.assign({}, state, { filter: Object.assign({}, state.filter, { stato: e.currentTarget.value }) })) })),
                React.createElement("div", { className: "col-md-3 col-12" },
                    React.createElement("input", { type: "date", placeholder: "da data", className: "form-control", value: toDateInputValue(state.filter.dateFrom), onInput: e => setState(Object.assign({}, state, { filter: Object.assign({}, state.filter, { dateFrom: fromDateInputValue(e.currentTarget.value) }) })) })),
                React.createElement("div", { className: "col-md-3 col-12" },
                    React.createElement("input", { type: "date", placeholder: "a data", className: "form-control", value: toDateInputValue(state.filter.dateTo), onInput: e => setState(Object.assign({}, state, { filter: Object.assign({}, state.filter, { dateTo: fromDateInputValue(e.currentTarget.value) }) })) }))),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col list-toolbar" },
                    React.createElement("button", { className: "btn btn-primary", onClick: search }, "Cerca"),
                    React.createElement("button", { className: "btn btn-success", onClick: recordNew }, "Nuovo"))),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col list-table" },
                    React.createElement("div", { className: "table-responsive-sm" },
                        React.createElement("table", { className: "table table-striped" },
                            React.createElement("colgroup", null,
                                React.createElement("col", null),
                                React.createElement("col", null),
                                React.createElement("col", null)),
                            React.createElement("thead", null,
                                React.createElement("tr", null,
                                    React.createElement("th", { scope: "col" }, "Nome"),
                                    React.createElement("th", { scope: "col" }, "Data Creazione"),
                                    React.createElement("th", { scope: "col" }, "Stao"))),
                            React.createElement("tbody", null, state.items.map(i => React.createElement(TableRow, { key: i.id, nome: i.nome, stato: i.stato, creationDate: i.creationDate, id: i.id, rowClicked: rowClicked }))))))),
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
        React.createElement("td", null, props.nome),
        React.createElement("td", null, props.stato),
        React.createElement("td", null, props.creationDate)));
}
//# sourceMappingURL=index.js.map