/**Naming standard for models*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ids are automatically added here as object id refer to docs
const employeeSchema = new Schema ({
    firstname : {
        type:  String,
        required : true
    },
    lastname : {
        type:  String,
        required : true
    }
})

// mogoose automatically lowers the model name and finds plurarl one
module.exports = mongoose.model('Emplopyee', employeeSchema);