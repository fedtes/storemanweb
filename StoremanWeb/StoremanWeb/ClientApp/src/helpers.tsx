﻿
export function toDateInputValue(date: Date) {
    if (!date) return null;
    var d = new Date(date);
    var day = ("0" + d.getDate()).slice(-2);
    var month = ("0" + (d.getMonth() + 1)).slice(-2);
    return d.getFullYear() + "-" + (month) + "-" + (day);
}

export function fromDateInputValue(date: string) {
    var x = date.split("-");
    return new Date(parseInt(x[0]), parseInt(x[1])-1, parseInt(x[2]));
}

export function round2(n: any) {
    return Math.round((parseFloat(n) + Number.EPSILON) * 100) / 100;
}

export function formulaPrezzo(prezzoBase: number, ricavo: number)  {
    return round2(prezzoBase * (1 + ricavo / 100));
};


export function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}