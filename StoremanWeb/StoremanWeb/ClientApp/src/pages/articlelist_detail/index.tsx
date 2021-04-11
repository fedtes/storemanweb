import * as React from "react";
import * as ReactDOM from "react-dom";
import { useAPI, appPath } from "../../api/index";
import { useParams, useHistory } from "react-router";
import { Article, ArticleList } from "../../api/models/index";
import { Loader } from "../../route/PrivateRoute";
import { ArticleListHeader } from "./header";
import { LeftList } from "./leftlist";
import { RightList, IRef } from "./rightlist";



interface IState {
    fetching: boolean,
    isDirty: boolean,
    isNew: boolean,
    articleList?: ArticleList,
    showLeft: boolean
}

const defaultArticleList: ArticleList = {
    id: -1,
    creationDate: new Date,
    historyStatus: 0,
    nome: "",
    stato: ""
}

export function ArticleListDetail() {
    const { id } = useParams();
    const history = useHistory();
    const api = useAPI();
    const [state, setState] = React.useState<IState>({
        fetching: true,
        isDirty: false,
        isNew: id === "-1",
        articleList: defaultArticleList,
        showLeft: false
    });

    const rightListRef = React.useRef<IRef>();
    const recordChangeName = (value:string) => {
        state.articleList.nome = value;
        api.updateArticleList(state.articleList)
            .then(() => setState({ ...state, fetching: true }))
            .catch(() => window.alert("Errore inaspettato ricaricare la pagina"));
    };
    const recordMarkDone = () => {
        if (window.confirm("Marca come scaricato?")) {
            state.articleList.stato = "Scaricata";
            api.updateArticleList(state.articleList)
                .then(() => setState({...state, fetching:true}))
                .catch(() => window.alert("Errore inaspettato ricaricare la pagina"));
        }
    };
    const recordDownload = () => {
        api.downloadArticleList(state.articleList.id);
    };
    const recordDelete = () => {
        if (window.confirm("Sei sicuro di voler eliminare l'elemento?")) {
            api.deleteArticleList(state.articleList.id)
                .then(() => history.push(appPath("/articlelist")))
                .catch(() => window.alert("Errore inaspettato ricaricare la pagina"));
        }
    };

    const changeTab = (t: number) => {
        setState({ ...state, showLeft: (t === 0 ? false : true) });
    };

    /* ------------- Sync beteew left-right ------------------- */ 
    const onLeftItemAddClick = (id: number) => {
        rightListRef.current.addItem(id);
    };


    if (state.fetching) {
        api.getArticleList(id)
            .then(a => setState({ ...state, fetching: false, articleList: a }));
        return (<Loader></Loader>)
    }
    else {
        return (
            <div className="container px-xl-1 px-0 mx-auto" style={{maxWidth:"95%"}}>
                
                <div className="row">
                    <ArticleListHeader
                        newName={recordChangeName}
                        articleList={state.articleList}
                        markDone={recordMarkDone}
                        dowload={recordDownload}
                        deleteClick={recordDelete} ></ArticleListHeader>
                </div>

                <div className="row d-xl-none">
                    <ul className="nav nav-tabs w-100">
                        <li className="nav-item" onClick={() => changeTab(1)}>
                            <div className={"nav-link " + (state.showLeft ? "active" : "")}>Listino</div>
                        </li>
                        <li className="nav-item" onClick={() => changeTab(0)}>
                            <div className={"nav-link " + (state.showLeft ? "" : "active")}>Articoli</div>
                        </li>
                    </ul>
                </div>

                <div className="row">
                    <div className={state.showLeft ? "col-xl-4 col-12 px-0" : "col-xl-4 col-12 px-0 d-none d-xl-block"}>
                        <LeftList itemClicked={onLeftItemAddClick}></LeftList>
                    </div>
                    <div className={state.showLeft ? "col-xl-8 col-12 d-none d-xl-block" : "col-xl-8 col-12"}>
                        <RightList ref={rightListRef} listId={state.articleList.id}></RightList>
                    </div>
                </div>

            </div>
        );
    }
}