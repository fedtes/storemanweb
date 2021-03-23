import * as React from "react";
import { Article } from "../../api/models/index";

type IProps = Article & {onClick: (id:number) => void}

export function ArticleCard(props: IProps) {
    return (
        <div className="col-12 px-0 my-2 article-card">
            <div className="container">
                <div className="row">
                    <div className="col-10 pr-0">
                        <div className="container px-1 py-2">
                            <div className="row">
                                <div className="col-12 mb-1 ellipsis">
                                    {props.descrizione}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-5 pr-0 ">
                                    {props.codice + " - " + props.costruttore}
                                </div>
                                <div className="col-7 pl-0">
                                    {"" + props.prezzoAcquisto + " + " + props.ricavo + "% = " + props.prezzoUnitario}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-2 pl-0" style={{textAlign:"end"}}>
                        <button className="btn btn-primary p-1 h-100" onClick={() => props.onClick(props.id)}>{">>"}</button>
                    </div>
                </div>
            </div>
        </div>    
    );
}