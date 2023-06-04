import { resolve } from "path";

const DEFAULT_HEADER = {'content-type' : 'application/json'};

const getPostData = (req) => {
    return new Promise((resolve, reject)  => {
        let body = '';
        try {
            req.on('data', (chunk) => {
                body += chunk.toString();
            }).on('end', () => {
                resolve(JSON.parse(body));
            })
        } catch (error) {
            reject(error)
        }
    })
}
export {
    DEFAULT_HEADER,
    getPostData
}