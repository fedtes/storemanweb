import * as React from "react";
import { Article } from "../../api/models/index";

type ICardProps = Article & {
    isDirty: boolean
    removeItem: (id: number) => void,
    saveItem: (id: number) => void,
    fieldChange: (id: number, field: string, value: any) => void
}

export function RightCard(props: ICardProps) {
    return (
        <div className="col-12">
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <button className="btn btn-danger" onClick={() => props.removeItem(props.id)}>Remove</button>
                    </div>
                    <div className="col-8">
                        <div className="col-3">
                            {props.codice}
                        </div>
                        <div className="col-9">
                            {props.descrizione}
                        </div>
                        <div className="col-3">
                            <div className="input-group">
                                <input type="number"
                                    value={props.ricavo}
                                    step="1"
                                    min="0"
                                    onChange={e => props.fieldChange(props.id, "ricavo", e.currentTarget.value)}>
                                </input>
                                <div className="input-group-append">
                                    <div className="input-group-text">%</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="input-group">
                                <input type="number"
                                    value={props.prezzoUnitario}
                                    step="0.01"
                                    min="0"
                                    onChange={e => props.fieldChange(props.id, "prezzoUnitario", e.currentTarget.value)}>
                                </input>
                                <div className="input-group-append">
                                    <div className="input-group-text">€</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="input-group">
                                <input type="number"
                                    value={props.quantita}
                                    step="0.01"
                                    min="0"
                                    onChange={e => props.fieldChange(props.id, "quantita", e.currentTarget.value)}>
                                </input>
                                <div className="input-group-append">
                                    <div className="input-group-text">{props.unitaMisura}</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="input-group">
                                <input type="number"
                                    value={props.totale}
                                    step="0.01"
                                    min="0"
                                    onChange={e => props.fieldChange(props.id, "totale", e.currentTarget.value)}>
                                </input>
                                <div className="input-group-append">
                                    <div className="input-group-text">€</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-2">
                        <button disabled={!props.isDirty} className="btn btn-primary" onClick={() => props.removeItem(props.id)}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}