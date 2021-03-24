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
        <div className="col-12 px-1">
            <div className="container bor-round py-1 my-1">
                <div className="row">
                    <div className="col-1 pt-3 px-0 txt-align-center">
                        <button className="btn btn-danger" onClick={() => props.removeItem(props.id)}>X</button>
                    </div>
                    <div className="col-10 px-1 txt-align-center">
                        <div className="container">
                            <div className="row mb-2">
                                <div className="col-3">
                                    {props.codice}
                                </div>
                                <div className="col-9">
                                    {props.descrizione}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3 px-1">
                                    <div className="input-group">
                                        <input type="number"
                                            className="form-control"
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
                                <div className="col-3 px-1">
                                    <div className="input-group">
                                        <input type="number"
                                            className="form-control"
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
                                <div className="col-3 px-1">
                                    <div className="input-group">
                                        <input type="number"
                                            className="form-control"
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
                                            className="form-control"
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
                        </div>
                        
                    </div>
                    <div className="col-1 pt-3 px-0 txt-align-center">
                        <button disabled={!props.isDirty} className="btn btn-primary" onClick={() => props.removeItem(props.id)}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}