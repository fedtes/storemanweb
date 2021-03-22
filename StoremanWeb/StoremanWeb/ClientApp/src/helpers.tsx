﻿export function toDateInputValue(date: Date) {
    if (!date) return null;
    var d = new Date(date);
    var day = ("0" + d.getDate()).slice(-2);
    var month = ("0" + (d.getMonth() + 1)).slice(-2);
    return d.getFullYear() + "-" + (month) + "-" + (day);
}

export function fromDateInputValue(date: string) {
    var x = date.split("-");
    return new Date(parseInt(x[0]), parseInt(x[1]), parseInt(x[2]));
}