const fs = require('fs');

const writeToFile = (filename, content) => {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf-8', (err) => {
        if (err) {
            console.log(err);
        }
    })
}

function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            }).on('end', ()  => {
                resolve(body);
            })
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}
module.exports = {
    writeToFile,
    getPostData
}