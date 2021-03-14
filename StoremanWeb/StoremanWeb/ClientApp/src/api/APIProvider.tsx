import * as $ from 'jquery';
import { Article, ArticleList } from './models/index';


interface IClaim {
    token: string
    loggeduser: string,
    username: string,
    isLogged: boolean
}


export class APIProvider {

    private origin: string;
    private app_name: string;

    private login_page_url: string = "/login";
    
    /* ---------------- API ------------------ */
    private api_path: string = "/api/v1";
    private login_url: string = "/user/login";
    private ping_url: string = "/user/ping";
    private refresh_url: string = "/user/refreshtoken";

    private article_url: string = "/article"
    private article_list_url: string = "/articlelist"
    
    public constructor() {
        this.origin = window.location.origin;
        this.app_name = "storeman";
    }

    /* ----------------- DATA ---------------------------- */

    public async getArticles(page: number, filter: any) {
        return await this.get<Article[]>(this.url(this.article_url), {
            page: page,
            costruttore: filter.costruttore? "%" + filter.costruttore + "%" : null,
            descrizione: filter.descrizione ? "%" + filter.descrizione + "%" : null,
            codice: filter.codice ? "%" + filter.codice + "%" : null
        });
    }


    public async getArticle(id: number) {
        return await this.get<Article>(this.url(this.article_url) + "/" + id);
    }

    public async updateArticle(article: Article) {
        return await this.put(this.url(this.article_url), article);
    }

    public async deleteArticle(id: number) {
        return await this.delete(this.url(this.article_url) + "/" + id, {});
    }

    public async createArticle(article: Article) {
        return await this.post<Article>(this.url(this.article_url), article);
    }


    public async getArticleLists(page: number, filter: any, ) {
        return await this.get<ArticleList[]>(this.url(this.article_list_url), {
            page: page,
            nome: filter.nome ? "%" + filter.nome + "%" : null,
            stato: filter.stato ? "%" + filter.stato + "%" : null,
            dateFrom: filter.dateFrom ? filter.dateFrom.toJSON() : null,
            dateTo: filter.dateTo ? filter.dateTo.toJSON() : null,
        });
    }


    /* ------------------ LOGIN MANAGEMENT --------------- */

    private claim: IClaim = {
        loggeduser: "",
        token: "",
        username: "",
        isLogged: false
    };

    public async ping() {
        return this.get<boolean>(this.url(this.ping_url), {});
    }

    public hasLoggedUser() {
        return this.claim.isLogged;
    }

    public login(username, password) {
        const action = new Promise<any>((res, rej) => {
            $.ajax({
                type: "POST",
                url: this.url(this.login_url),
                dataType: "json",
                contentType: "application/json; charset=UTF-8",
                data: JSON.stringify({ username: username, password: password }),
                success: function (data: any) {
                    res(data);
                },
                error: function (xhr: any) {
                    rej(xhr);
                }
            });
        });

        return action.then(claim => {
            this.setClaim({ ...claim, isLogged: true });
            return "";
        }).catch(x => {
            switch (x.status) {
                case 401:
                    return "Unauthorize";
                default:
                    return "Error";
            }
        });
    };

    private setClaim(claim: IClaim) {
        this.claim = { ...claim };
    };

    /* ---------------------- MISC --------------------- */

    private url(url: string): string { return this.origin + (this.app_name ? "/" + this.app_name : "") + this.api_path + url; }

    private get<TResult>(url: string, queryString?: any): Promise<TResult> {

        const action = () => {
            return new Promise<TResult>((res, rej) => {
                $.ajax({
                    type: "GET",
                    url: url,
                    dataType: "json",
                    contentType: "application/json; charset=UTF-8",
                    data: queryString ? queryString : {},
                    headers: {
                        Authorization: "bearer " + this.claim.token
                    },
                    success: function (data: any) {
                        res(data);
                    },
                    error: function (xhr: any) {
                        rej(xhr);
                    }
                });
            });
        };

        return this.call<TResult>(action);
    };

    private post<TResult>(url: string, params: any): Promise<TResult> {

        const action = () => {
            return new Promise<TResult>((res, rej) => {
                $.ajax({
                    type: "POST",
                    url: url,
                    dataType: "json",
                    contentType: "application/json; charset=UTF-8",
                    data: JSON.stringify(params),
                    headers: {
                        Authorization: "bearer " + this.claim.token
                    },
                    success: function (data: any) {
                        res(data);
                    },
                    error: function (xhr: any) {
                        rej(xhr);
                    }
                });
            });
        };

        return this.call<TResult>(action);
    };

    private put<TResult>(url: string, params: any): Promise<TResult> {

        const action = () => {
            return new Promise<TResult>((res, rej) => {
                $.ajax({
                    type: "PUT",
                    url: url,
                    dataType: "json",
                    contentType: "application/json; charset=UTF-8",
                    data: JSON.stringify(params),
                    headers: {
                        Authorization: "bearer " + this.claim.token
                    },
                    success: function (data: any) {
                        res(data);
                    },
                    error: function (xhr: any) {
                        rej(xhr);
                    }
                });
            });
        };

        return this.call<TResult>(action);
    };

    private delete<TResult>(url: string, params: any): Promise<TResult> {

        const action = () => {
            return new Promise<TResult>((res, rej) => {
                $.ajax({
                    type: "DELETE",
                    url: url,
                    dataType: "json",
                    contentType: "application/json; charset=UTF-8",
                    data: JSON.stringify(params),
                    headers: {
                        Authorization: "bearer " + this.claim.token
                    },
                    success: function (data: any) {
                        res(data);
                    },
                    error: function (xhr: any) {
                        rej(xhr);
                    }
                });
            });
        };

        return this.call<TResult>(action);
    };

    private refresh_token() {
        const action = new Promise<any>((res, rej) => {
            $.ajax({
                type: "POST",
                url: this.url(this.refresh_url),
                dataType: "json",
                contentType: "application/json; charset=UTF-8",
                success: function (data: any) {
                    res(data);
                },
                error: function (xhr: any) {
                    rej(xhr);
                }
            });
        });

        return action.then(t => {
            this.setClaim({ ...t, isLogged: true });
            return "OK";
        }).catch(() => {
            console.error("LOGOUT!!");
            this.setClaim(null);
            window.location.replace((this.app_name ? "/" + this.app_name : "") + this.login_page_url);
            return "KO";
        });
    };

    private call<TResult>(action: () => Promise<TResult>): Promise<TResult> {
        const onSuccess = (data: TResult) => data;

        const onFailure = async (x: any) => {
            switch (x.status) {
                case 401:

                    if ("OK" === await this.refresh_token()) {
                        return this.call(action);
                    }

                    break;

                default:
                    throw Error("[" + x.status + "] - " + x.responseText);
            }
        };

        return action().then(onSuccess, onFailure);
    };
}