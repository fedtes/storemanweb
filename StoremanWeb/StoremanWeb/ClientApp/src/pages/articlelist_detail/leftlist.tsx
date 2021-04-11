import * as React from "react";
import { Article } from "../../api/models/index";
import { useAPI } from "../../api/index";
import { Loader } from "../../route/PrivateRoute";
import { ArticleCard } from "./article_card";


interface IState {
    fetching: boolean,
    page: number,
    items: Article[]
    filter: {
        costruttore?: string,
        descrizione?: string,
        codice?: string
    }
}

export function LeftList(props:any) {
    const [state, setState] = React.useState<IState>({ fetching: false, page: 1, items: [], filter: {} });
    const api = useAPI();

    const setCodeFilter = (v) => {
        setState({ ...state, filter: { ...state.filter, codice: v } });
    }

    const setCtrFilter = (v) => {
        setState({ ...state, filter: { ...state.filter, costruttore: v } });
    }

    const setDescFilter = (v) => {
        setState({ ...state, filter: { ...state.filter, descrizione: v } });
    }

    const onEnter = (e: any) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            refreshGrid();
        }
    };

    const refreshGrid = () => setState({ ...state, fetching: true });

    const itemClick = (id: number) => { props.itemClicked(id); };

    const mapItems = () => {
        return state.items
            .map(a => { return { ...a, onClick: itemClick } })
            .map(p => (<ArticleCard key={p.id} {...p}></ArticleCard >));
    }

    if (state.fetching) {
        api.getArticles(state.page, state.filter)
            .then(i => setState({ ...state, items: i, fetching:false }));
        return <Loader></Loader>
    } else {
        return (
            <div className="containter pl-4 pr-1">

                <div className="row">
                    <div className="col-12 py-2">
                        <input type="text"
                            className="form-control"
                            placeholder="costruttore"
                            value={state.filter.costruttore}
                            onKeyDown={onEnter}
                            onChange={e => setCtrFilter(e.currentTarget.value)}>
                        </input>
                    </div>
                    <div className="col-12 py-2">
                        <input type="text"
                            className="form-control"
                            placeholder="codice"
                            value={state.filter.codice}
                            onKeyDown={onEnter}
                            onChange={e => setCodeFilter(e.currentTarget.value)}>
                        </input>
                    </div>
                    <div className="col-12 py-2">
                        <input type="text"
                            className="form-control"
                            placeholder="descrizione"
                            value={state.filter.descrizione}
                            onKeyDown={onEnter}
                            onChange={e => setDescFilter(e.currentTarget.value)}>
                        </input>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12" style={{textAlign:"end"}}>
                        <button className="btn btn-success" onClick={refreshGrid}>Aggiorna</button>
                    </div>
                </div>

                <div className="row" style={{maxHeight:"60vh", overflowY:"scroll"}}>
                    {mapItems()}
                </div>

            </div>
        );
    }
}