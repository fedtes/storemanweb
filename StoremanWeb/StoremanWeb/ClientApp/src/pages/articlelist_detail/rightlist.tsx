import * as React from "react";
import { Article } from "../../api/models/index";
import { useAPI } from "../../api/index";
import { RightCard } from "./rightlist_card";

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
        setState({ ...state });
    };

    const mapItems = () => {
        return state.items
            .map(i => { return { ...i, removeItem: removeItem, saveItem: saveItem, fieldChange: fieldChange } })
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

