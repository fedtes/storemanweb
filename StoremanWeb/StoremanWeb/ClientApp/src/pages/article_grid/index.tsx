import * as React from "react";
import * as ReactDOM from "react-dom";
import { useAPI, appPath } from "../../api/index";
import { useHistory } from "react-router";
import { Article } from "../../api/models/index";
import { Loader } from "../../route/PrivateRoute";


interface IState {
    fetchStatus:number,
    page: number,
    items: Article[]
    filter: {
        costruttore?: string,
        descrizione?: string,
        codice?: string
    }
}

export function ArticleGrid() {
    const [state, setState] = React.useState<IState>({ fetchStatus: 0, page: 1, items: [], filter: {} });
    const history = useHistory();
    const api = useAPI();

    const rowClicked = (ID: number) => {
        history.push(appPath("/article/" + ID));
    };

    const search = () => {
        setState({ ...state, fetchStatus: 0 });
    }

    const recordNew = () => {
        history.push(appPath("/article/-1"));
    };

    const changePage = (page: number) => {
        setState({ ...state, page: page, fetchStatus: 0 });
    }

    if (0 === state.fetchStatus) {
        api.getArticles(state.page, state.filter)
            .then(r => setState({ ...state, items: r, fetchStatus: 1 }));
        return (
            <Loader></Loader>
        );
    } else {
        return (
            <div className="container mx-0 mx-xl-auto" style={{ maxWidth:"unset"}}>
                
                <div className="row list-filter">
                    <div className="col-md-4 col-12">
                        <input type="text" placeholder="codice"
                            className="form-control"
                            value={state.filter.codice}
                            onInput={e => setState({ ...state, filter: {...state.filter, codice: e.currentTarget.value } })}></input>
                    </div>
                    <div className="col-md-4 col-12">
                        <input type="text" placeholder="descrizione"
                            className="form-control"
                            value={state.filter.descrizione}
                            onInput={e => setState({ ...state, filter: { ...state.filter, descrizione: e.currentTarget.value } })}></input>
                    </div>
                    <div className="col-md-4 col-12">
                        <input type="text" placeholder="costruttore"
                            className="form-control"
                            value={state.filter.costruttore}
                            onInput={e => setState({ ...state, filter: { ...state.filter, costruttore: e.currentTarget.value } })}></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col list-toolbar">
                        <button className="btn btn-primary" onClick={search}>Cerca</button>
                        <button className="btn btn-success" onClick={recordNew}>Nuovo</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col list-table">
                        <div className="table-responsive-sm">
                            <table className="table table-striped">
                                <colgroup>
                                    <col style={{ width: "5%" }}></col>
                                    <col style={{ width: "5%" }}></col>
                                    <col></col>
                                    <col style={{ width: "7%" }}></col>
                                    <col style={{ width: "7%" }}></col>
                                    <col style={{ width: "7%" }}></col>
                                    <col style={{ width: "7%" }}></col>
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th scope="col">Codice</th>
                                        <th scope="col">Costruttore</th>
                                        <th scope="col">Descrizione</th>
                                        <th scope="col">Prz.Acquisto</th>
                                        <th scope="col">Scorta</th>
                                        <th scope="col">Ricavo</th>
                                        <th scope="col">Prz.Unitario</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        state.items.map(i =>
                                                <TableRow
                                                    key={i.id}
                                                    codice={i.codice}
                                                    costruttore={i.costruttore}
                                                    descrizione={i.descrizione}
                                                    prezzoAcquisto={i.prezzoAcquisto}
                                                    scorta={i.scorta}
                                                    ricavo={i.ricavo}
                                                    prezzoUnitario={i.prezzoUnitario}
                                                    id={i.id}
                                                    rowClicked={rowClicked}
                                                >
                                                </TableRow>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <ul className="pagination justify-content-end">
                            <li onClick={() => changePage(1)} className={state.page === 1 ? "page-item active" : "page-item"}>
                                <span className="page-link">1</span>
                            </li>
                            <li onClick={() => changePage(2)} className={state.page === 2 ? "page-item active" : "page-item"}>
                                <span className="page-link">2</span>
                            </li>
                            <li onClick={() => changePage(3)} className={state.page === 3 ? "page-item active" : "page-item"}>
                                <span className="page-link">3</span>
                            </li>
                            <li className="page-item disabled">
                                <span className="page-link">...</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }  
}

function TableRow(props: any) {
    return (
        <tr key={props.id} onClick={() => props.rowClicked(props.id)}>
            <td>{props.codice}</td>
            <td>{props.costruttore}</td>
            <td>{props.descrizione}</td>
            <td>{props.prezzoAcquisto}</td>
            <td>{props.scorta}</td>
            <td>{props.ricavo}</td>
            <td>{props.prezzoUnitario}</td>
        </tr>
    );
}