import * as React from "react";
import { useAPI, appPath } from "../../api/index";
import { useHistory, useParams } from "react-router";
import { Loader } from "../../route/PrivateRoute";
const defaultArticle = {
    id: -1,
    historyStatus: 0,
    listID: -1,
    costruttore: "",
    codice: "",
    descrizione: "",
    prezzoAcquisto: 0.00,
    scorta: 0,
    ricavo: 10,
    prezzoUnitario: 0.00,
    unitaMisura: "NR",
    quantita: 0,
    totale: 0
};
export function ArticleDetail() {
    const { id } = useParams();
    const [state, setState] = React.useState({ fetching: true, isDirty: false, isNew: id === "-1", article: Object.assign({}, defaultArticle) });
    const api = useAPI();
    const history = useHistory();
    const formulaPrezzo = (prezzoBase, ricavo) => {
        return Math.round(((prezzoBase * (1 + ricavo / 100)) + Number.EPSILON) * 100) / 100;
    };
    const setPrezzo = (value) => {
        const p = formulaPrezzo(value, state.article.ricavo);
        setState(Object.assign({}, state, { isDirty: true, article: Object.assign({}, state.article, { prezzoAcquisto: value, prezzoUnitario: p }) }));
    };
    const setRicavo = (value) => {
        const p = formulaPrezzo(state.article.prezzoAcquisto, value);
        setState(Object.assign({}, state, { isDirty: true, article: Object.assign({}, state.article, { ricavo: value, prezzoUnitario: p }) }));
    };
    const recordSave = () => {
        api.updateArticle(state.article)
            .then(() => setState(Object.assign({}, state, { isDirty: false, fetching: true })))
            .catch(() => window.alert("Errore inaspettato ricaricare la pagina"));
    };
    const recordDelete = () => {
        if (window.confirm("Sei sicuro di voler eliminare l'elemento?")) {
            api.deleteArticle(state.article.id)
                .then(() => history.push(appPath("/article")))
                .catch(() => window.alert("Errore inaspettato ricaricare la pagina"));
        }
    };
    const recordNew = () => {
        if ("" === state.article.codice || null === state.article.codice)
            window.alert("Campo codice obbligatorio");
        else if ("" === state.article.costruttore || null === state.article.costruttore)
            window.alert("Campo costruttore obbligatorio");
        else if (null === state.article.prezzoAcquisto)
            window.alert("Campo Prezzo acquisto obbligatorio");
        else if (null === state.article.ricavo)
            window.alert("Campo Ricavo obbligatorio");
        else if ("" === state.article.descrizione || null === state.article.descrizione)
            window.alert("Campo Descrizione obbligatorio");
        else
            api.createArticle(state.article)
                .then(a => history.push(appPath("/article/" + a.id)))
                .catch(() => window.alert("Errore inaspettato ricaricare la pagina"));
        ;
    };
    if (state.fetching && !state.isNew) {
        api.getArticle(id)
            .then(a => setState(Object.assign({}, state, { fetching: false, article: a })));
        return (React.createElement(Loader, null));
    }
    else {
        return (React.createElement("div", { className: "container" },
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col list-toolbar" },
                    React.createElement("button", { disabled: !state.isDirty, className: "btn btn-primary", onClick: state.isNew ? recordNew : recordSave }, "Salva"),
                    React.createElement("button", { disabled: state.isNew, className: "btn btn-danger", onClick: recordDelete }, "Elimina"))),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-sm-4 col-12" },
                    React.createElement("label", null, "Codice"),
                    React.createElement("input", { type: "text", className: "form-control", onInput: e => setState(Object.assign({}, state, { isDirty: true, article: Object.assign({}, state.article, { codice: e.currentTarget.value }) })), value: state.article.codice })),
                React.createElement("div", { className: "col-sm-4 col-12" },
                    React.createElement("label", null, "Costruttore"),
                    React.createElement("input", { type: "text", className: "form-control", onInput: e => setState(Object.assign({}, state, { isDirty: true, article: Object.assign({}, state.article, { costruttore: e.currentTarget.value }) })), value: state.article.costruttore })),
                React.createElement("div", { className: "col-sm-4 col-12" })),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-sm-4 col-12" },
                    React.createElement("label", null, "Prezzo Acquisto"),
                    React.createElement("input", { type: "number", className: "form-control", onInput: e => setPrezzo(parseFloat(e.currentTarget.value)), value: state.article.prezzoAcquisto, step: "0.01", min: "0" })),
                React.createElement("div", { className: "col-sm-4 col-12" },
                    React.createElement("label", null, "Ricavo"),
                    React.createElement("input", { type: "number", className: "form-control", onInput: e => setRicavo(parseInt(e.currentTarget.value)), value: state.article.ricavo, step: "0", min: "0" })),
                React.createElement("div", { className: "col-sm-4 col-12" },
                    React.createElement("label", null, "Prezzo Unitario"),
                    React.createElement("input", { type: "number", className: "form-control", readOnly: true, value: state.article.prezzoUnitario, step: "0.01", min: "0" }))),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-12" },
                    React.createElement("label", null, "Descrizione"),
                    React.createElement("textarea", { className: "form-control", onInput: e => setState(Object.assign({}, state, { isDirty: true, article: Object.assign({}, state.article, { descrizione: e.currentTarget.value }) })), value: state.article.descrizione }))),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-sm-4 col-12" },
                    React.createElement("label", null, "Scorta"),
                    React.createElement("input", { type: "number", className: "form-control", onInput: e => setState(Object.assign({}, state, { isDirty: true, article: Object.assign({}, state.article, { scorta: parseInt(e.currentTarget.value) }) })), value: state.article.scorta, step: "1", min: "0" })),
                React.createElement("div", { className: "col-sm-4 col-12" },
                    React.createElement("label", null, "Unita di Misura"),
                    React.createElement("input", { type: "text", className: "form-control", onInput: e => setState(Object.assign({}, state, { isDirty: true, article: Object.assign({}, state.article, { unitaMisura: e.currentTarget.value }) })), value: state.article.unitaMisura })))));
    }
}
//# sourceMappingURL=index.js.map