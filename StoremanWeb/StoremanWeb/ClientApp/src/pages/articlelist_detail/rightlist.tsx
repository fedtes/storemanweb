import * as React from "react";
import { Article } from "../../api/models/index";
import { useAPI } from "../../api/index";
import { RightCard } from "./rightlist_card";
import { Loader } from "../../route/PrivateRoute";
import { formulaPrezzo, round2 } from "../../helpers";

type ArticleItem = Article & {isDirty: boolean}

interface IState {
    fetching: boolean,
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
    const [state, setState] = React.useState<IState>({ fetching: true, items: [] });
    const api = useAPI();

    const pushItem = (items: ArticleItem[], item: Article) => items.concat([{ ...item, isDirty: false }]);

    const addItem = (id: number) => {
        api.addArticleItem(id, props.listId)
            .then(a => setState({ ...state, items: pushItem(state.items, a) }));
    };

    const removeItem = (id: number) => {
        api.removeArticleItem(id, props.listId)
            .then(() => setState({ ...state, items: state.items.filter(i => i.id !== id) }));
    };

    const saveItem = (id: number) => {
        let item = state.items.find(v => v.id === id); 
        api.updateArticleItem(item, props.listId)
            .then(() => {
                item.isDirty = false;
                setState({ ...state });
            })
    };

    const fieldChange = (id: number, field: string, value: any) => {
        let item = state.items.find(v => v.id === id);
        item[field] = value;
        item.isDirty = true;

        if (field !== "totale") {
            item.totale = formulaPrezzo(item.prezzoAcquisto, item.ricavo) * item.quantita;
        }

        setState({ ...state });
    };

    const mapItems = () => {
        return state.items
            .map(i => { return { ...i, removeItem: removeItem, saveItem: saveItem, fieldChange: fieldChange } })
            .map(i => <RightCard {...i}></RightCard>);
    }

    ref.current = { addItem: addItem };

    if (state.fetching) {
        api.getArticleItems(props.listId)
            .then(a => a.map(x => { return { ...x, isDirty: false }; }))
            .then(a => setState({ ...state, fetching: false, items: a }));
        return (<Loader></Loader>)
    } else {
        return (
            <div className="container w-100 mw-100" >
                <div className="row" style={{ maxHeight: "75vh", overflowY: "scroll" }}>
                    {mapItems()}
                </div>
                <div className="row">
                    <div className="col pt-2">
                        <div className="overline pt-1" style={{ fontSize: "1.5em" }}>
                            <span className="txt-grey">TOTALE: </span>
                            <span>{round2(state.items.map(x => x.totale).reduce((acc:any, v:any) => parseFloat(acc) + parseFloat(v), 0))}</span>
                            <span> €</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

