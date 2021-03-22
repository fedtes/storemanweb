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
        <nav className="navbar navbar-expand-md navbar-light bg-light w-100">
            <div className="navbar-brand"></div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#headernav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="headernav">
                <div className="container">
                    <div className="row">
                        <div className="col-md-2 col-12">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">ID</span>
                                </div>
                                <input type="text"
                                    className="form-control"
                                    readOnly={true}
                                    value={props.articleList.id}>
                                </input>
                            </div>
                        </div>
                        <div className="col-md-2 col-12">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Nome</span>
                                </div>
                                <input type="text"
                                    className="form-control"
                                    readOnly={true}
                                    value={props.articleList.nome}>
                                </input>
                            </div>
                        </div>
                        <div className="col-md-2 col-12">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Stato</span>
                                </div>
                                <input type="text"
                                    className="form-control"
                                    readOnly={true}
                                    value={props.articleList.stato}>
                                </input>
                            </div>
                        </div>
                        <div className="col-md-2 col-12">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Data</span>
                                </div>
                                <input type="text"
                                    className="form-control"
                                    readOnly={true}
                                    value={toDateInputValue(props.articleList.creationDate)}>
                                </input>
                            </div>
                        </div>
                        <div className="col-md-2 col-12">
                            <button className="btn btn-primary"
                                onClick={props.saveClick}>Salva</button>
                        </div>
                        <div className="col-md-2 col-12">
                            <button className="btn btn-danger"
                                onClick={props.deleteClick}>Elimina</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );

}