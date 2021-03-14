export interface Article {
    id: number,
    historyStatus: number,
    listID: number,
    costruttore: string,
    codice: string,
    descrizione: string,
    prezzoAcquisto: number,
    scorta: number,
    ricavo: number,
    prezzoUnitario: number,
    unitaMisura: string,
    quantita: number,
    totale:number
}

export interface ArticleList {
    id: number,
    historyStatus: number,
    nome: string,
    stato: string,
    creationDate: Date
}
