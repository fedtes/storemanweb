import * as React from "react";
import { Article } from "../../api/models/index";
import { round2 } from "../../helpers";

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
                                <div className="col-3 txt-align-start  pl-1 pr-1">
                                    <div className="undeline">
                                        <span className="txt-grey ">CODICE: </span><span>{props.codice}</span>
                                    </div>
                                </div>
                                <div className="col-9 txt-align-start px-0">
                                    <div className="undeline ellipsis">
                                        <span className="txt-grey">DESC: </span><span>{props.descrizione}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-3 px-1">
                                    <div className="txt-grey txt-align-start">PZ. UNITARIO</div>
                                    <div className="input-group">
                                        <input type="number"
                                            className="form-control"
                                            value={round2(props.prezzoUnitario)}
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
                                    <div className="txt-grey txt-align-start">RICAVO</div>
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
                                    <div className="txt-grey txt-align-start">QUANTITA'</div>
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
                                <div className="col-3 px-1">
                                    <div className="txt-grey txt-align-start">TOTALE</div>
                                    <div className="input-group">
                                        <input type="number"
                                            className="form-control"
                                            value={round2(props.totale)}
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
                        <button disabled={!props.isDirty} className="btn btn-primary" onClick={() => props.saveItem(props.id)}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}