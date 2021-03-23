import * as React from "react";
import * as ReactDOM from "react-dom";
import { ArticleList } from "../../api/models/index";
import { toDateInputValue } from "../../helpers";


export interface IArticleListHeaderProps {
    articleList: ArticleList,
    saveClick: () => void,
    deleteClick: () => void
}

export function ArticleListHeader(props: IArticleListHeaderProps) {

    return (
        <nav className="navbar navbar-expand-xl navbar-light bg-light w-100">
            <div className="navbar-brand"></div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#headernav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="headernav">
                <div className="container px-0">
                    <div className="row w-100">
                        <div className="col-xl-10 col-12 px-0">
                            <div className="container">
                                <div className="row w-100">
                                    <div className="col-xl-3 col-12">
                                        <span>ID: {props.articleList.id}</span>
                                    </div>
                                    <div className="col-xl-3 col-12">
                                        <span>Nome: {props.articleList.nome}</span>
                                    </div>
                                    <div className="col-xl-3 col-12">
                                        <span>Stato: {props.articleList.stato}</span>
                                    </div>
                                    <div className="col-xl-3 col-12">
                                        <span>Data: {toDateInputValue(props.articleList.creationDate)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-12 px-0" style={{textAlign:"end"}}>
                            <button className="btn btn-primary mx-1"
                                onClick={props.saveClick}>Salva</button>
                            <button className="btn btn-danger"
                                onClick={props.deleteClick}>Elimina</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );

}