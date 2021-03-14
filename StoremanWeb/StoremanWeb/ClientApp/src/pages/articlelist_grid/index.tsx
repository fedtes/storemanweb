import * as React from "react";
import * as ReactDOM from "react-dom";
import { useAPI, appPath } from "../../api/index";
import { useHistory } from "react-router";
import { Article, ArticleList } from "../../api/models/index";
import { Loader } from "../../route/PrivateRoute";


interface IState {
    fetching: boolean,
    page: number,
    items: ArticleList[]
    filter: {
        nome?: string,
        stato?: string,
        dateFrom?: Date,
        dateTo?: Date
    }
}

function toDateInputValue(date: Date) {
    if (!date) return null;
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    return date.getFullYear() + "-" + (month) + "-" + (day);
}

function fromDateInputValue(date: string) {
    var x = date.split("-");
    return new Date(parseInt(x[0]), parseInt(x[1]), parseInt(x[2]));
}

export function ArticleListGrid() {
    const [state, setState] = React.useState<IState>({ fetching: true, page: 1, items: [], filter: {} });
    const history = useHistory();
    const api = useAPI();

    const rowClicked = (ID: number) => {
        history.push(appPath("/articlelist/" + ID));
    };

    const search = () => {
        setState({ ...state, fetching: true });
    }

    const recordNew = () => {
        history.push(appPath("/articlelist/-1"));
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
    else {
        return (
            <div className="container mx-0 mx-xl-auto" style={{ maxWidth: "unset" }}>

                <div className="row list-filter">
                    <div className="col-md-3 col-12">
                        <input type="text" placeholder="nome"
                            className="form-control"
                            value={state.filter.nome}
                            onInput={e => setState({ ...state, filter: { ...state.filter, nome: e.currentTarget.value} })}></input>
                    </div>
                    <div className="col-md-3 col-12">
                        <input type="text" placeholder="stato"
                            className="form-control"
                            value={state.filter.stato}
                            onInput={e => setState({ ...state, filter: { ...state.filter, stato: e.currentTarget.value } })}></input>
                    </div>
                    <div className="col-md-3 col-12">
                        <input type="date" placeholder="da data"
                            className="form-control"
                            value={toDateInputValue(state.filter.dateFrom)}
                            onInput={e => setState({ ...state, filter: { ...state.filter, dateFrom: fromDateInputValue(e.currentTarget.value) } })}></input>
                    </div>
                    <div className="col-md-3 col-12">
                        <input type="date" placeholder="a data"
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
                                        <th scope="col">Data Creazione</th>
                                        <th scope="col">Stao</th>
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