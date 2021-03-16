import * as React from "react";
import { Article } from "../../api/models/index";
import { func } from "prop-types";

interface IState {
    items:Article[]
}

interface IRef {
    addItem: (id: number) => void;
}

export const RightList = React.forwardRef<IRef,any>(_RightList);

function _RightList(props: any, ref: React.MutableRefObject<IRef>) {
    const [state, setState] = React.useState<IState>({items:[]});

    const addItem = (id:number) => { };

    const mapItems = () => {
        return state.items.map(i => { return { ...i } })
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

type ICardProps = Article

function RightCard(props: ICardProps) {
    return (
        <div className="col-12">
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <button className="btn btn-danger">Remove</button>
                    </div>
                    <div className="col-8">
                        <div className="col-3">
                            {props.codice}
                        </div>
                        <div className="col-9">
                            {props.descrizione}
                        </div>
                        <div className="col-3">
                            <input type="number" value={props.ricavo}></input>
                        </div>
                        <div className="col-3">
                            <input type="number" value={props.prezzoUnitario}></input>
                        </div>
                        <div className="col-3">
                            <input type="number" value={props.quantita}></input>
                        </div>
                        <div className="col-3">
                            <input type="number" value={props.totale}></input>
                        </div>
                    </div>
                    <div className="col-2">
                        <button className="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}