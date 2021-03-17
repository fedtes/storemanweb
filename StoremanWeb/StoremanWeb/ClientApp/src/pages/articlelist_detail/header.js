import * as React from "react";
import { toDateInputValue } from "../../helpers";
export function ArticleListHeader(props) {
    return (React.createElement("nav", { className: "navbar navbar-expand-md navbar-light bg-light" },
        React.createElement("div", { className: "collapse navbar-collapse", id: "navbarSupportedContent" },
            React.createElement("div", { className: "navbar-brand" }),
            React.createElement("button", { className: "navbar-toggler", type: "button", "data-toggle": "collapse", "data-target": "#navbarNav", "aria-controls": "navbarNav", "aria-expanded": "false", "aria-label": "Toggle navigation" },
                React.createElement("span", { className: "navbar-toggler-icon" })),
            React.createElement("div", { className: "collapse navbar-collapse", id: "navbarNav" },
                React.createElement("form", { className: "container" },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-2 col-12" },
                            React.createElement("label", null, "ID"),
                            React.createElement("input", { type: "text", readOnly: true, value: props.articleList.id })),
                        React.createElement("div", { className: "col-md-2 col-12" },
                            React.createElement("label", null, "Nome"),
                            React.createElement("input", { type: "text", readOnly: true, value: props.articleList.nome })),
                        React.createElement("div", { className: "col-md-2 col-12" },
                            React.createElement("label", null, "Stato"),
                            React.createElement("input", { type: "text", readOnly: true, value: props.articleList.stato })),
                        React.createElement("div", { className: "col-md-2 col-12" },
                            React.createElement("label", null, "Data"),
                            React.createElement("input", { type: "text", readOnly: true, value: toDateInputValue(props.articleList.creationDate) })),
                        React.createElement("div", { className: "col-md-2 col-12" },
                            React.createElement("button", { className: "btn btn-primary", onClick: props.saveClick }, "Salva")),
                        React.createElement("div", { className: "col-md-2 col-12" },
                            React.createElement("button", { className: "btn btn-danger", onClick: props.deleteClick }, "Elimina"))))))));
}
//# sourceMappingURL=header.js.map