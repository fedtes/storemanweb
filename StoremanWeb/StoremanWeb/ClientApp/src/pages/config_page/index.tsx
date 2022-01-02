import * as React from "react";
import { useAPI, appPath } from "../../api/index";



export function Configuration() {
    const api = useAPI();

    const exportAll = () => {
        api.downloadAll();
    };
    const emptyStorage = () => {
        if (window.confirm("Stai per azzerare tutte le scorte continuare?")) {
            api.emptyStorage()
                .then(() => window.confirm("Scorte azzerate"))
                .catch(() => window.alert("Errore inaspettato ricaricare la pagina"));
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-4 col-12">Azioni Massive</div>
            </div>
            <div className="row">
                <div className="col-sm-4 col-12 py-2">
                    <button onClick={exportAll} className="btn btn-primary">Esporta Tutto</button>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4 col-12 py-2">
                    <button onClick={emptyStorage} className="btn btn-danger">Azzera Scorte</button>
                </div>
            </div>
        </div>
    );
}