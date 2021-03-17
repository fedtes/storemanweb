import * as React from "react";
import * as ReactDOM from "react-dom";
import { useAPI, appPath } from "../../api/index";
import { useHistory, useParams } from "react-router";
import { Article, ArticleList } from "../../api/models/index";
import { Loader } from "../../route/PrivateRoute";
import { toDateInputValue, fromDateInputValue } from "../../helpers";
import { ArticleListHeader } from "./header";
import { LeftList } from "./leftlist";
import { RightList, IRef } from "./rightlist";



interface IState {
    fetching: boolean,
    isDirty: boolean,
    isNew: boolean,
    articleList?: ArticleList
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
    const api = useAPI();
    const [state, setState] = React.useState<IState>({ fetching: true, isDirty: false, isNew: id === "-1", articleList: defaultArticleList });
    const rightListRef = React.useRef<IRef>();

    const recordSave = () => { };
    const recordDelete = () => { };

    /* ------------- Sync beteew left-right ------------------- */ 
    const onLeftItemAddClick = (id: number) => { };



    if (state.fetching) {
        api.getArticleList(id)
            .then(a => setState({ ...state, fetching: false, articleList: a }));
        return (<Loader></Loader>)
    }
    else {
        return (
            <div className="container">
                
                <div className="row">
                    <ArticleListHeader articleList={state.articleList} saveClick={recordSave} deleteClick={recordDelete} ></ArticleListHeader>
                </div>

                <div className="row d-md-none">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <div className="nav-link active"></div>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link"></div>
                        </li>
                    </ul>
                </div>

                <div className="row">
                    <div className="col-md-4 col-12">
                        <LeftList itemClicked={onLeftItemAddClick}></LeftList>
                    </div>
                    <div className="col-md-8 col-12">
                        
                    </div>
                </div>
                

            </div>
        );
    }
}