import {join, dirname} from 'node:path';
import { fileURLToPath } from 'node:url';

import { parse } from 'node:url';

import { routes } from './routes/heroRoute.js';
import { DEFAULT_HEADER } from '../src/util/util.js';

import { generateInstance } from './factories/heroFactory.js';

// in ecma you don't have __dirname, __filename

const currentDir = dirname(
    fileURLToPath(import.meta.url)
) 

const filePath = join(currentDir, './database', 'data.json');
console.log('-----------');
console.log(filePath);
const heroService = generateInstance({
    filePath
})
const heroRoutes = routes({
    heroService
})


const allRoutes = {
    ...heroRoutes,
    // for default roure
    default : (req, res) => {
        res.writeHead(404,DEFAULT_HEADER);
        res.write('Default Hello 404 end');
        res.end();
    }
}

const handler = (req, res) => {
    const {url, method, headers} = req;
    console.log({url, method, headers});

    const { pathname } = parse(url, true);
    console.log(pathname);

    const key = `${pathname} : ${method.toLowerCase()}`;
    console.log(key);

    const chosen = allRoutes[key] || allRoutes.default

    return Promise.resolve(chosen(req, res)).catch(handlerError(res));
}

// creating global error handler

const handlerError = (res) => {
    return error => {
        console.log(`Something Went Wrong`, error.stack);
        res.writeHead(500, DEFAULT_HEADER)
        res.write(JSON.stringify({
            error : 'Server Error'
        }));
        res.end();
    }
}
export default handler