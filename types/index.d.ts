declare const _exports: {
    driver: typeof KsRest;
    config: {};
    set(payload?: {
        driver?: typeof KsCs;
        end?: string;
        endpoint?: string;
    }): KsWc;
    default: any;
    "__#1@#cloneObj"(obj: any): any;
    build(opt?: any): any;
    get(query?: any): Promise<any>;
    list(query?: any): Promise<any>;
    add(payload: any): Promise<any>;
    insert(payload: any): Promise<any>;
    update(payload: any, id?: string | number, query?: any): Promise<any>;
    delete(id: string | number, query?: any): Promise<any>;
    select(id: string | number, query?: any): Promise<any>;
    query(payload: any): Promise<any>;
    request(payload: any): Promise<any>;
    connect(opt: any): Promise<any>;
    API: typeof API;
};
export = _exports;
export namespace API {
    namespace type {
        export { KsRest };
        export { KsCs };
    }
}
export { KsWc as API };
import KsRest = require("./src/KsRest");
import KsCs = require("./src/KsCs");
import KsWc = require("./src/KsWc");
