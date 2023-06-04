/**
 * In Node.js, the .on method is used to attach event handlers to EventEmitter
 * objects. An EventEmitter is a Node.js class that allows developers to create 
 * and emit custom events in their code.
 * */
const EventEmitter = require('events');

// to initailize a emiiter
class ChatEmitter extends EventEmitter {};
// any way you like
const chatEmitter = new EventEmitter();
/**
 * When an event is emitted by an EventEmitter, any event handlers attached to 
 * that event using the .on method are called. The .on method takes two 
 * Arguments: the name of the event to listen for, and a callback function to 
 * handle the event.
 */

// setting up custom events
chatEmitter.on('user-joined', (message) => {
console.log(message);
})

chatEmitter.on('user-left', (message) => {
console.log(message);
})

chatEmitter.emit('user-joined', `The user has been connected to out server`);
chatEmitter.emit('user-left', `The user has left the server`);

/**
 * In this way, we can use EventEmitter to implement custom event handling in 
 * our Node.js applications, allowing us to build complex, event-driven systems.
*/

// a bit more real-world example but won't work if you run it

/**
 * Requirement
 * Suppose you are building a web application that allows users to upload and share photos. 
 * When a user uploads a photo, you want to process the image and generate different sizes and 
 * resolutions of the image to be stored and used throughout the application.
 * To achieve this, you can use EventEmitter to trigger events when a photo is uploaded, 
 * and then use event listeners to process the image and generate different versions of the image.
*/

// this is only an example to run you gotta make chages
const imageProcessor = require('./image-processor');
const fileUploader = require('./file-uploader');

// Create an EventEmitter instance
const photoEmitter = new EventEmitter();

// Listen for the 'photoUploaded' event
photoEmitter.on('photoUploaded', (photo) => {
  // Process the image and generate different sizes
  imageProcessor.process(photo, (err, processedPhoto) => {
    if (err) {
      console.error(`Error processing photo ${photo.id}: ${err.message}`);
    } else {
      console.log(`Processed photo ${photo.id}`);
      // Store the processed images
      fileUploader.upload(processedPhoto, (err, result) => {
        if (err) {
          console.error(`Error uploading processed photo ${processedPhoto.id}: ${err.message}`);
        } else {
          console.log(`Uploaded processed photo ${processedPhoto.id}`);
        }
      });
    }
  });
});

// Listen for the 'photoDeleted' event
photoEmitter.on('photoDeleted', (photo) => {
  // Delete the processed images
  imageProcessor.deleteProcessedImages(photo.id, (err) => {
    if (err) {
      console.error(`Error deleting processed images for photo ${photo.id}: ${err.message}`);
    } else {
      console.log(`Deleted processed images for photo ${photo.id}`);
    }
  });
});

// Upload a new photo
const newPhoto = {
  id: 'abc123',
  filename: 'myphoto.jpg',
  data: Buffer.from('...'),
};
fileUploader.upload(newPhoto, (err, result) => {
  if (err) {
    console.error(`Error uploading photo ${newPhoto.id}: ${err.message}`);
  } else {
    console.log(`Uploaded photo ${newPhoto.id}`);
    // Trigger the 'photoUploaded' event
    photoEmitter.emit('photoUploaded', newPhoto);
  }
});

// Delete a photo
const photoToDelete = {
  id: 'def456',
  filename: 'oldphoto.jpg',
};
fileUploader.delete(photoToDelete, (err, result) => {
  if (err) {
    console.error(`Error deleting photo ${photoToDelete.id}: ${err.message}`);
  } else {
    console.log(`Deleted photo ${photoToDelete.id}`);
    // Trigger the 'photoDeleted' event
    photoEmitter.emit('photoDeleted', photoToDelete);
  }
});