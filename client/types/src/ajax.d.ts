export default class Ajax {
    static request(method: any, endPoint: any, accept: any, body: any, timeout: any, ontimeout: any, callback: any): any;
    static xdomainRequest(req: any, method: any, endPoint: any, body: any, timeout: any, ontimeout: any, callback: any): any;
    static xhrRequest(req: any, method: any, endPoint: any, accept: any, body: any, timeout: any, ontimeout: any, callback: any): any;
    static parseJSON(resp: any): any;
    static serialize(obj?: any, parentKey?: any): string;
    static appendParams(url: any, params: any): any;
}
