import * as React from "react";
import { Article } from "../../api/models/index";
import { func } from "prop-types";
import { useAPI } from "../../api/index";

type ArticleItem = Article & {isDirty: boolean}

interface IState {
    items: ArticleItem[]
}

export interface IRef {
    addItem: (id: number) => void;
}

export interface RightListProps {
    listId: number
}

export const RightList = React.forwardRef<IRef, RightListProps>(_RightList);

function _RightList(props: RightListProps, ref: React.MutableRefObject<IRef>) {
    const [state, setState] = React.useState<IState>({ items: [] });
    const api = useAPI();

    const pushItem = (items: ArticleItem[], item: Article) => items.concat([{ ...item, isDirty: false }]);

    const addItem = (id: number) => {
        api.addArticle(id, props.listId)
            .then(a => setState({ ...state, items: pushItem(state.items, a) }));
    };

    const removeItem = (id: number) => {
        api.removeArticle(id, props.listId)
            .then(() => setState({ ...state, items: state.items.filter(i => i.id !== id) }));
    };

    const saveItem = (id: number) => { };

    const fieldChange = (id: number) => { };

    const mapItems = () => {
        return state.items.map(i => { return { ...i, removeItem: removeItem, saveItem: saveItem, fieldChange: fieldChange  } })
            .map(i => <RightCard {...i}></RightCard>);
    }

    ref.current = { addItem: addItem };

    return (
        <div className="container">
            <div className="row">
                {mapItems()}
            </div>
        </div>
    );

}

type ICardProps = Article & {
    isDirty: boolean
    removeItem: (id: number) => void,
    saveItem: (id: number) => void,
    fieldChange: (id:number, field:string, value:any) => void
}

function RightCard(props: ICardProps) {
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