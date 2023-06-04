// creating a logger

const { format } = require('date-fns');
const { v4 : uuid} = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd \tHH:mm:ss')}`;
    const uniqId = `${uuid()}`;
    
    const logMessage = `${dateTime} \t ${uniqId} \t ${message}`;
    console.log(__dirname);
    console.log(__filename);
    console.log(path.dirname(__filename)); // gets path of directory this file is located in
    console.log(logMessage,fs.existsSync('./logs') );

    try {
        if (!fs.existsSync('./logs')) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, 'logs', logName), logMessage);
        console.log('Logged to File');
    } catch (error) {
        console.log(error);
    }
}

module.exports ={
    logEvents
}