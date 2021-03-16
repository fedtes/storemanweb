import * as React from "react";
import { Article } from "../../api/models/index";

type IProps = Article & {onClick: (id:number) => void}

export function ArticleCard(props: IProps) {
    return (
        <div className="col-12">
            <div className="container">
                <div className="row">
                    <div className="col-9">
                        <div className="col-12">
                            {props.descrizione}
                        </div>
                        <div className="col-6">
                            {props.codice + " - " + props.costruttore}
                        </div>
                        <div className="col-6">
                            {"" + props.prezzoAcquisto + " + " + props.ricavo + "% = " + props.prezzoUnitario }
                        </div>
                    </div>
                    <div className="col-3">
                        <button className="btn btn-primary" onClick={() => props.onClick(props.id)}>Aggiungi</button>
                    </div>
                </div>
            </div>
        </div>    
    );
}