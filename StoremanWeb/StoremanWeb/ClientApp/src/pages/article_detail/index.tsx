import * as React from "react";
import * as ReactDOM from "react-dom";
import { useAPI, appPath } from "../../api/index";
import { useHistory, useParams } from "react-router";
import { Article } from "../../api/models/index";
import { Loader } from "../../route/PrivateRoute";
import { round2, formulaPrezzo } from "../../helpers";
import { NumberInput } from "../../components/NumberInput";


interface IState {
    fetching: boolean,
    isDirty: boolean,
    isNew: boolean,
    article?: Article
}

const defaultArticle: Article = {
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
}

export function ArticleDetail() {
    const { id } = useParams();
    const [state, setState] = React.useState<IState>({ fetching: true, isDirty: false, isNew: id === "-1", article: { ...defaultArticle} });
    const api = useAPI();
    const history = useHistory();

    const setPrezzo = (value:number) => {
        const p = formulaPrezzo(value, state.article.ricavo);
        setState({ ...state, isDirty: true, article: { ...state.article, prezzoAcquisto: value, prezzoUnitario: p } })
    };

    const setRicavo = (value: number) => {
        const p = formulaPrezzo(state.article.prezzoAcquisto, value);
        setState({ ...state, isDirty: true, article: { ...state.article, ricavo: value, prezzoUnitario: p } })
    };

    const recordSave = () => {
        if (window.confirm("Confermi di voler modificare l'elemento?")) {
            api.updateArticle(state.article)
                .then(() => setState({ ...state, isDirty: false, fetching: true }))
                .catch(() => window.alert("Errore inaspettato ricaricare la pagina"));
        }
    };

    const recordDelete = () => {
        if (window.confirm("Sei sicuro di voler eliminare l'elemento?")) {
            api.deleteArticle(state.article.id)
                .then(() => history.push(appPath("/article")))
                .catch(() => window.alert("Errore inaspettato ricaricare la pagina"));
        }
    };

    const recordClone = () => {
        if (window.confirm("Clonare l'elemento?")) {
            history.push(appPath("/article/-1"));
            setState({
                ...state,
                isDirty: true,
                fetching: false,
                isNew: true,
                article: { ...state.article, id: -1, codice: state.article.codice + "_copia" }
            })
        }
    }

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
                .then(a => {
                    history.push(appPath("/article/" + a.id));
                    setState({ ...state, fetching: true, isNew: false, article:a });
                })
                .catch(() => window.alert("Errore inaspettato ricaricare la pagina"));;
    };

    if (state.fetching && !state.isNew) {
        api.getArticle(id)
            .then(a => setState({...state, fetching:false, article: a}))
        return (<Loader></Loader>);
    }
    else {
        return (
            <div className="container">
                <div className="row">
                    <div className="col list-toolbar">
                        <button disabled={!state.isDirty} className="btn btn-primary" onClick={state.isNew ? recordNew : recordSave}>Salva</button>
                        <button disabled={state.isNew} className="btn btn-primary" onClick={recordClone}>Clona</button>
                        <button disabled={state.isNew} className="btn btn-danger" onClick={recordDelete}>Elimina</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4 col-12">
                        <label>Codice</label>
                        <input type="text"
                            className="form-control"
                            onInput={e => setState({ ...state, isDirty:true, article: {...state.article, codice: e.currentTarget.value}})}
                            value={state.article.codice} ></input>
                    </div>
                    <div className="col-sm-4 col-12">
                        <label>Costruttore</label>
                        <input type="text"
                            className="form-control"
                            onInput={e => setState({ ...state, isDirty: true, article: { ...state.article, costruttore: e.currentTarget.value } })}
                            value={state.article.costruttore}></input>
                    </div>
                    <div className="col-sm-4 col-12">
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4 col-12">
                        <label>Prezzo Acquisto</label>
                        <NumberInput
                            onChange={e => setPrezzo(parseFloat(e))}
                            value={state.article.prezzoAcquisto}>
                        </NumberInput>
                    </div>
                    <div className="col-sm-4 col-12">
                        <label>Ricavo</label>
                        <NumberInput
                            onChange={e => setRicavo(parseInt(e))}
                            integer={true}
                            value={state.article.ricavo}>
                        </NumberInput>
                    </div>
                    <div className="col-sm-4 col-12">
                        <label>Prezzo Unitario</label>
                        <NumberInput 
                            readOnly={true}
                            value={ round2(state.article.prezzoUnitario)}>
                        </NumberInput>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <label>Descrizione</label>
                        <textarea
                            className="form-control"
                            onInput={e => setState({ ...state, isDirty: true, article: { ...state.article, descrizione: e.currentTarget.value } })}
                            value={state.article.descrizione}></textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4 col-12">
                        <label>Scorta</label>
                        <NumberInput
                            onChange={e => setState({ ...state, isDirty: true, article: { ...state.article, scorta: parseInt(e) } })}
                            value={state.article.scorta}
                            integer={true}>
                        </NumberInput>
                    </div>
                    <div className="col-sm-4 col-12">
                        <label>Unita di Misura</label>
                        <input type="text"
                            className="form-control"
                            onInput={e => setState({ ...state, isDirty: true, article: { ...state.article, unitaMisura: e.currentTarget.value } })}
                            value={state.article.unitaMisura}></input>
                    </div>
                </div>
            </div>
        );
    }

   
}