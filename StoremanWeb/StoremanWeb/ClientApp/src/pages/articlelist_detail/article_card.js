import * as React from "react";
export function ArticleCard(props) {
    return (React.createElement("div", { className: "col-12" },
        React.createElement("div", { className: "container" },
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-9" },
                    React.createElement("div", { className: "col-12" }, props.descrizione),
                    React.createElement("div", { className: "col-6" }, props.codice + " - " + props.costruttore),
                    React.createElement("div", { className: "col-6" }, "" + props.prezzoAcquisto + " + " + props.ricavo + "% = " + props.prezzoUnitario)),
                React.createElement("div", { className: "col-3" },
                    React.createElement("button", { className: "btn btn-primary", onClick: () => props.onClick(props.id) }, "Aggiungi"))))));
}
//# sourceMappingURL=article_card.js.map