var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as $ from 'jquery';
export class APIProvider {
    constructor() {
        this.login_page_url = "/login";
        /* ---------------- API ------------------ */
        this.api_path = "/api/v1";
        this.login_url = "/user/login";
        this.ping_url = "/user/ping";
        this.refresh_url = "/user/refreshtoken";
        this.article_url = "/article";
        this.article_list_url = "/articlelist";
        /* ------------------ LOGIN MANAGEMENT --------------- */
        this.claim = {
            loggeduser: "",
            token: "",
            username: "",
            isLogged: false
        };
        this.origin = window.location.origin;
        this.app_name = "storeman";
    }
    /* --------------------------------------- DATA ---------------------------------------------- */
    /* --------------------------------------- Article ---------------------------------------------- */
    getArticles(page, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get(this.url(this.article_url), {
                page: page,
                costruttore: filter.costruttore ? "%" + filter.costruttore + "%" : null,
                descrizione: filter.descrizione ? "%" + filter.descrizione + "%" : null,
                codice: filter.codice ? "%" + filter.codice + "%" : null
            });
        });
    }
    getArticle(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get(this.url(this.article_url) + "/" + id);
        });
    }
    updateArticle(article) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.put(this.url(this.article_url), article);
        });
    }
    deleteArticle(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.delete(this.url(this.article_url) + "/" + id, {});
        });
    }
    createArticle(article) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.post(this.url(this.article_url), article);
        });
    }
    /* --------------------------------------- ArticleList ---------------------------------------------- */
    getArticleLists(page, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get(this.url(this.article_list_url), {
                page: page,
                nome: filter.nome ? "%" + filter.nome + "%" : null,
                stato: filter.stato ? "%" + filter.stato + "%" : null,
                dateFrom: filter.dateFrom ? filter.dateFrom.toJSON() : null,
                dateTo: filter.dateTo ? filter.dateTo.toJSON() : null,
            });
        });
    }
    getArticleList(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get(this.url(this.article_list_url) + "/" + id);
        });
    }
    addArticle(id, listId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.post(this.url(this.article_list_url) + "/" + listId + "/item/" + id, {});
        });
    }
    removeArticle(id, listId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.delete(this.url(this.article_list_url) + "/" + listId + "/item/" + id, {});
        });
    }
    ping() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get(this.url(this.ping_url), {});
        });
    }
    hasLoggedUser() {
        return this.claim.isLogged;
    }
    login(username, password) {
        const action = new Promise((res, rej) => {
            $.ajax({
                type: "POST",
                url: this.url(this.login_url),
                dataType: "json",
                contentType: "application/json; charset=UTF-8",
                data: JSON.stringify({ username: username, password: password }),
                success: function (data) {
                    res(data);
                },
                error: function (xhr) {
                    rej(xhr);
                }
            });
        });
        return action.then(claim => {
            this.setClaim(Object.assign({}, claim, { isLogged: true }));
            return "";
        }).catch(x => {
            switch (x.status) {
                case 401:
                    return "Unauthorize";
                default:
                    return "Error";
            }
        });
    }
    ;
    setClaim(claim) {
        this.claim = Object.assign({}, claim);
    }
    ;
    /* ---------------------- MISC --------------------- */
    url(url) { return this.origin + (this.app_name ? "/" + this.app_name : "") + this.api_path + url; }
    get(url, queryString) {
        const action = () => {
            return new Promise((res, rej) => {
                $.ajax({
                    type: "GET",
                    url: url,
                    dataType: "json",
                    contentType: "application/json; charset=UTF-8",
                    data: queryString ? queryString : {},
                    headers: {
                        Authorization: "bearer " + this.claim.token
                    },
                    success: function (data) {
                        res(data);
                    },
                    error: function (xhr) {
                        rej(xhr);
                    }
                });
            });
        };
        return this.call(action);
    }
    ;
    post(url, params) {
        const action = () => {
            return new Promise((res, rej) => {
                $.ajax({
                    type: "POST",
                    url: url,
                    dataType: "json",
                    contentType: "application/json; charset=UTF-8",
                    data: JSON.stringify(params),
                    headers: {
                        Authorization: "bearer " + this.claim.token
                    },
                    success: function (data) {
                        res(data);
                    },
                    error: function (xhr) {
                        rej(xhr);
                    }
                });
            });
        };
        return this.call(action);
    }
    ;
    put(url, params) {
        const action = () => {
            return new Promise((res, rej) => {
                $.ajax({
                    type: "PUT",
                    url: url,
                    dataType: "json",
                    contentType: "application/json; charset=UTF-8",
                    data: JSON.stringify(params),
                    headers: {
                        Authorization: "bearer " + this.claim.token
                    },
                    success: function (data) {
                        res(data);
                    },
                    error: function (xhr) {
                        rej(xhr);
                    }
                });
            });
        };
        return this.call(action);
    }
    ;
    delete(url, params) {
        const action = () => {
            return new Promise((res, rej) => {
                $.ajax({
                    type: "DELETE",
                    url: url,
                    dataType: "json",
                    contentType: "application/json; charset=UTF-8",
                    data: JSON.stringify(params),
                    headers: {
                        Authorization: "bearer " + this.claim.token
                    },
                    success: function (data) {
                        res(data);
                    },
                    error: function (xhr) {
                        rej(xhr);
                    }
                });
            });
        };
        return this.call(action);
    }
    ;
    refresh_token() {
        const action = new Promise((res, rej) => {
            $.ajax({
                type: "POST",
                url: this.url(this.refresh_url),
                dataType: "json",
                contentType: "application/json; charset=UTF-8",
                success: function (data) {
                    res(data);
                },
                error: function (xhr) {
                    rej(xhr);
                }
            });
        });
        return action.then(t => {
            this.setClaim(Object.assign({}, t, { isLogged: true }));
            return "OK";
        }).catch(() => {
            console.error("LOGOUT!!");
            this.setClaim(null);
            window.location.replace((this.app_name ? "/" + this.app_name : "") + this.login_page_url);
            return "KO";
        });
    }
    ;
    call(action) {
        const onSuccess = (data) => data;
        const onFailure = (x) => __awaiter(this, void 0, void 0, function* () {
            switch (x.status) {
                case 401:
                    if ("OK" === (yield this.refresh_token())) {
                        return this.call(action);
                    }
                    break;
                default:
                    throw Error("[" + x.status + "] - " + x.responseText);
            }
        });
        return action().then(onSuccess, onFailure);
    }
    ;
}
//# sourceMappingURL=APIProvider.js.map