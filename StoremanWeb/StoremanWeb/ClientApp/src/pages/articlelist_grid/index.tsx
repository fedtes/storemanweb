import * as React from "react";
import * as ReactDOM from "react-dom";
import { useAPI, appPath } from "../../api/index";
import { useHistory } from "react-router";
import { Article, ArticleList } from "../../api/models/index";
import { Loader } from "../../route/PrivateRoute";
import { toDateInputValue, fromDateInputValue } from "../../helpers";


interface IState {
    fetching: boolean,
    showFormNew: boolean,
    page: number,
    items: ArticleList[]
    filter: {
        nome?: string,
        stato?: string,
        dateFrom?: Date,
        dateTo?: Date
    }
}

export function ArticleListGrid() {
    const [state, setState] = React.useState<IState>({
        fetching: true,
        showFormNew: false,
        page: 1,
        items: [],
        filter: {}
    });
    const history = useHistory();
    const api = useAPI();
    const inputRef = React.useRef<any>();

    const rowClicked = (ID: number) => {
        history.push(appPath("/articlelist/" + ID));
    };

    const onEnter = (e: any) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            search();
        }
    };

    const search = () => {
        setState({ ...state, fetching: true });
    }

    const executeRecordNew = (name:string) => {
        api.createArticleList({
            creationDate: new Date(),
            historyStatus: 1,
            id: -1,
            nome: name,
            stato: "Da Scaricare"
        }).then(a => history.push(appPath("/articlelist/" + a.id)));
    };

    const recordNew = () => {
        setState({ ...state, showFormNew: true });
    };

    const changePage = (page: number) => {
        setState({ ...state, page: page, fetching: true});
    }

    if (state.fetching) {
        api.getArticleLists(state.page, state.filter)
            .then(i => setState({ ...state, fetching: false, items: i }));
        return (
            <Loader></Loader>
        );
    } 
    else if (state.showFormNew) {
        return (
            <div className="container">
                <div className="row">
                    <div className="container py-2">
                        <div className="row justify-content-center">
                            <div className="col-6">
                                <input type="text"
                                    ref={inputRef}
                                    placeholder="nome"
                                    className="form-control">
                                </input>
                            </div>
                            <div className="col-2">
                                <button
                                    onClick={() => executeRecordNew(inputRef.current.value)}
                                    className="btn btn-primary">Crea</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="container mx-0 mx-xl-auto" style={{ maxWidth: "unset" }}>

                <div className="row list-filter">
                    <div className="col-md-3 col-12 pt-1">
                        <label className="mb-0">Nome</label>
                        <input type="text" placeholder="nome"
                            className="form-control"
                            onKeyDown={onEnter}
                            value={state.filter.nome}
                            onInput={e => setState({ ...state, filter: { ...state.filter, nome: e.currentTarget.value} })}></input>
                    </div>
                    <div className="col-md-3 col-12 pt-1">
                        <label className="mb-0">Stato</label>
                        <select className="form-control"
                            placeholder="stato"
                            onKeyDown={onEnter}
                            onChange={e => setState({ ...state, filter: { ...state.filter, stato: e.currentTarget.value } })}
                            value={state.filter.stato}>
                            <option></option>
                            <option>Da Scaricare</option>
                            <option>Scaricata</option>
                        </select>
                    </div>
                    <div className="col-md-3 col-12 pt-1">
                        <label className="mb-0">Da data</label>
                        <input type="date" placeholder="da data"
                            onKeyDown={onEnter}
                            className="form-control"
                            value={toDateInputValue(state.filter.dateFrom)}
                            onInput={e => setState({ ...state, filter: { ...state.filter, dateFrom: fromDateInputValue(e.currentTarget.value) } })}></input>
                    </div>
                    <div className="col-md-3 col-12 pt-1">
                        <label className="mb-0">A data</label>
                        <input type="date" placeholder="a data"
                            onKeyDown={onEnter}
                            className="form-control"
                            value={toDateInputValue(state.filter.dateTo)}
                            onInput={e => setState({ ...state, filter: { ...state.filter, dateTo: fromDateInputValue(e.currentTarget.value) } })}></input>
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
                                    <col></col>
                                    <col></col>
                                    <col></col>
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Stato</th>
                                        <th scope="col">Data Creazione</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        state.items.map(i =>
                                            <TableRow
                                                key={i.id}
                                                nome={i.nome}
                                                stato={i.stato}
                                                creationDate={i.creationDate}
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
            <td>{props.nome}</td>
            <td>{props.stato}</td>
            <td>{props.creationDate}</td>
        </tr>
    );
}