declare const _exports: {
    driver: typeof KsRest;
    config: {};
    set(payload?: any): KsWc;
    default: KsRest;
    build(opt: any): KsRest;
    get(query?: any): Promise<false | void>;
    list(query?: any): Promise<any>;
    add(payload: any): Promise<false | void>;
    insert(payload: any): Promise<any>;
    update(payload: any, id?: any, query?: any): Promise<any>;
    delete(id: any, query?: any): Promise<any>;
    select(id: any, query?: any): Promise<any>;
    query(payload: any): Promise<any>;
    request(payload: any): Promise<false | void>;
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
import KsWc = require("./src/KsWc");
import KsCs = require("./src/KsCs");
