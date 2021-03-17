import * as React from "react";
import { useAPI } from "../../api/index";
export const RightList = React.forwardRef(_RightList);
function _RightList(props, ref) {
    const [state, setState] = React.useState({ items: [] });
    const api = useAPI();
    const pushItem = (items, item) => items.concat([Object.assign({}, item, { isDirty: false })]);
    const addItem = (id) => {
        api.addArticle(id, props.listId)
            .then(a => setState(Object.assign({}, state, { items: pushItem(state.items, a) })));
    };
    const removeItem = (id) => {
        api.removeArticle(id, props.listId)
            .then(() => setState(Object.assign({}, state, { items: state.items.filter(i => i.id !== id) })));
    };
    const saveItem = (id) => { };
    const fieldChange = (id) => { };
    const mapItems = () => {
        return state.items.map(i => { return Object.assign({}, i, { removeItem: removeItem, saveItem: saveItem, fieldChange: fieldChange }); })
            .map(i => React.createElement(RightCard, Object.assign({}, i)));
    };
    ref.current = { addItem: addItem };
    return (React.createElement("div", { className: "container" },
        React.createElement("div", { className: "row" }, mapItems())));
}
function RightCard(props) {
    return (React.createElement("div", { className: "col-12" },
        React.createElement("div", { className: "container" },
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-2" },
                    React.createElement("button", { className: "btn btn-danger", onClick: () => props.removeItem(props.id) }, "Remove")),
                React.createElement("div", { className: "col-8" },
                    React.createElement("div", { className: "col-3" }, props.codice),
                    React.createElement("div", { className: "col-9" }, props.descrizione),
                    React.createElement("div", { className: "col-3" },
                        React.createElement("div", { className: "input-group" },
                            React.createElement("input", { type: "number", value: props.ricavo, step: "1", min: "0", onChange: e => props.fieldChange(props.id, "ricavo", e.currentTarget.value) }),
                            React.createElement("div", { className: "input-group-append" },
                                React.createElement("div", { className: "input-group-text" }, "%")))),
                    React.createElement("div", { className: "col-3" },
                        React.createElement("div", { className: "input-group" },
                            React.createElement("input", { type: "number", value: props.prezzoUnitario, step: "0.01", min: "0", onChange: e => props.fieldChange(props.id, "prezzoUnitario", e.currentTarget.value) }),
                            React.createElement("div", { className: "input-group-append" },
                                React.createElement("div", { className: "input-group-text" }, "\u20AC")))),
                    React.createElement("div", { className: "col-3" },
                        React.createElement("div", { className: "input-group" },
                            React.createElement("input", { type: "number", value: props.quantita, step: "0.01", min: "0", onChange: e => props.fieldChange(props.id, "quantita", e.currentTarget.value) }),
                            React.createElement("div", { className: "input-group-append" },
                                React.createElement("div", { className: "input-group-text" }, props.unitaMisura)))),
                    React.createElement("div", { className: "col-3" },
                        React.createElement("div", { className: "input-group" },
                            React.createElement("input", { type: "number", value: props.totale, step: "0.01", min: "0", onChange: e => props.fieldChange(props.id, "totale", e.currentTarget.value) }),
                            React.createElement("div", { className: "input-group-append" },
                                React.createElement("div", { className: "input-group-text" }, "\u20AC"))))),
                React.createElement("div", { className: "col-2" },
                    React.createElement("button", { disabled: !props.isDirty, className: "btn btn-primary", onClick: () => props.removeItem(props.id) }, "Save"))))));
}
//# sourceMappingURL=rightlist.js.map