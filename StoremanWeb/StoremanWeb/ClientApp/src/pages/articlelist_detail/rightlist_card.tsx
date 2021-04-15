import * as React from "react";
import { Article } from "../../api/models/index";
import { round2 } from "../../helpers";
import { NumberInput } from "../../components/NumberInput";

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
                    <div className="col-1 px-0 txt-align-center">
                        <div className="flex-center-container">
                            <button
                            className="btn btn-danger btn-round bi-trash"
                            onClick={() => props.removeItem(props.id)}>
                            </button>
                        </div>
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
                                    <div className="txt-grey txt-align-start">PZ. ACQUISTO</div>
                                    <div className="input-group">
                                        <NumberInput
                                            value={round2(props.prezzoAcquisto)}
                                            onChange={e => props.fieldChange(props.id, "prezzoAcquisto", e)}>
                                        </NumberInput>
                                        <div className="input-group-append">
                                            <div className="input-group-text">€</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-3 px-1">
                                    <div className="txt-grey txt-align-start">RICAVO</div>
                                    <div className="input-group">
                                        <NumberInput
                                            value={props.ricavo}
                                            integer={true}
                                            onChange={e => props.fieldChange(props.id, "ricavo", e)}>
                                        </NumberInput>
                                        <div className="input-group-append">
                                            <div className="input-group-text">%</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-3 px-1">
                                    <div className="txt-grey txt-align-start">QUANTITA'</div>
                                    <div className="input-group">
                                        <NumberInput
                                            value={props.quantita}
                                            onChange={e => props.fieldChange(props.id, "quantita", e)}>
                                        </NumberInput>
                                        <div className="input-group-append">
                                            <div className="input-group-text">{props.unitaMisura}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-3 px-1">
                                    <div className="txt-grey txt-align-start">TOTALE</div>
                                    <div className="input-group">
                                        <NumberInput 
                                            value={round2(props.totale)}
                                            onChange={e => props.fieldChange(props.id, "totale", e)}>
                                        </NumberInput>
                                        <div className="input-group-append">
                                            <div className="input-group-text">€</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="col-1 px-0 txt-align-center">
                        <div className="flex-center-container">
                            <button disabled={!props.isDirty}
                                className="btn btn-primary btn-round bi-check2"
                                onClick={() => props.saveItem(props.id)}>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}