const fs = require('fs');
const { get_path_name } = require('./file');

const rs = fs.createReadStream(get_path_name('lorem.txt'), {encoding : 'utf8'});

const ws =  fs.createWriteStream(get_path_name('new_lorem.txt'));
// rs.on('data', (dataChunk) => {
//     ws.write(dataChunk);
// })

rs.pipe(ws);