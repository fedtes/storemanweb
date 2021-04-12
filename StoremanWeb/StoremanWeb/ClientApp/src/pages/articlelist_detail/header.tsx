import * as React from "react";
import * as ReactDOM from "react-dom";
import { ArticleList } from "../../api/models/index";
import { toDateInputValue } from "../../helpers";


export interface IArticleListHeaderProps {
    articleList: ArticleList,
    deleteClick: () => void,
    dowload: () => void,
    markDone: () => void,
    newName: (v:string) => void
}

export function ArticleListHeader(props: IArticleListHeaderProps) {
    const [state, setState] = React.useState({ showModal: false });
    const onNewName = (value: string) => {
        setState({ showModal: false });
        props.newName(value);
    }

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
                            <div className="container h-100">
                                <div className="row w-100">
                                    <div className="col-xl-3 col-12">
                                        <span>ID: {props.articleList.id}</span>
                                    </div>
                                    <ChangeNameInput edit={state.showModal} nome={props.articleList.nome} newName={onNewName}></ChangeNameInput>
                                    <div className="col-xl-3 col-12">
                                        <span>Stato: {props.articleList.stato}</span>
                                    </div>
                                    <div className="col-xl-3 col-12">
                                        <span>Data: {toDateInputValue(props.articleList.creationDate)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-12 px-0" style={{ textAlign: "end" }}>
                            <button className="btn btn-secondary bi-pencil mx-1"
                                title="Cambia Nome"
                                onClick={() => setState({showModal: !state.showModal})}></button>
                            <button className="btn btn-primary bi-cloud-arrow-down mx-1"
                                title="Scarica"
                                onClick={props.dowload}></button>
                            <button className="btn btn-success bi-check2-square mx-1"
                                title="Segna come scaricato"
                                onClick={props.markDone}></button>
                            <button className="btn btn-danger bi-trash mx-1"
                                title="Elimina"
                                onClick={props.deleteClick}></button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );

}


function ChangeNameInput(props: {edit:boolean, nome:string, newName: (v:string) => void}) {
    var [state, setState] = React.useState("");

    if (!props.edit) {
        return (
            <div className="col-xl-3 col-12">
                <span>Nome: {props.nome}</span>
            </div>
        );
    } else {
        return (
            <div className="col-xl-3 col-12">
                <input
                    type="text"
                    className="form-control inline-top"
                    onChange={e => setState(e.currentTarget.value)}
                    placeholder="Nuovo nome">
                </input>
                <button
                    className="btn btn-primary bi-pencil ml-1 inline-top"
                    onClick={() => props.newName(state)}></button>
            </div>
        );
    }
}