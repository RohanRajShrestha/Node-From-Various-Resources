const fsPromises = require('fs').promises;
const path = require('path');
/**
 * utf 8 is to decode the files content
*/

const get_path_name = (file_name) => path.join(__dirname, 'files', file_name);


const fileOps = async() => {
    try {
        const data = await fsPromises.readFile(get_path_name('starter.txt'), 'utf8');
        console.log(data);
        
        await fsPromises.unlink(get_path_name('starter.txt')); // deletes a file

        await fsPromises.writeFile(get_path_name('newfile.txt'), data);
        await fsPromises.appendFile(get_path_name('newfile.txt'), '\n new data');
        await fsPromises.rename(get_path_name('newfile.txt'), get_path_name('newrenamedfile.txt'));

        const newData = await fsPromises.readFile(get_path_name('newrenamedfile.txt'), 'utf8');
        console.log(newData);
    } catch (error) {
        console.log(error);
    }
}

// fileOps();
/**
 * Going into call back hell to overcome we use promises
*/
// fs.writeFile(get_path_name('reply.txt'), 'Nice To Meet You',(err) =>{
//     if (err) throw err;
//     console.log('Completed');

//     fs.appendFile(get_path_name('reply.txt'), 'Hey I was appendent',(err) =>{
//         if (err) throw err;
//         console.log('Append Completed');
//         fs.rename(get_path_name('reply.txt'), get_path_name('renamed.txt'),(err) =>{
//             if (err) throw err;
//             console.log('Rename Completed');
//         })
//     })
// });



// console.log(get_path_name('starter.txt'));
// fs.readFile(get_path_name('starter.txt'), 'utf8',(err, data) =>{
//     if (err) throw err;
//     console.log(data);
// });

// console.log('check if it asynchronous');



// exit on uncarught error
process.on('uncaughtException', err => {
    console.log(`There was an uncaught error : ${err}`);
    process.exit(1);
})

module.exports = {
    get_path_name
}