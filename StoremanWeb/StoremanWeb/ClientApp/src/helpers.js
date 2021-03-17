export function toDateInputValue(date) {
    if (!date)
        return null;
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    return date.getFullYear() + "-" + (month) + "-" + (day);
}
export function fromDateInputValue(date) {
    var x = date.split("-");
    return new Date(parseInt(x[0]), parseInt(x[1]), parseInt(x[2]));
}
//# sourceMappingURL=helpers.js.map