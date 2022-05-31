var mongoose =  require('mongoose');

var dataSchema = new mongoose.Schema({
    ip: {
        type: String,
    },

    name: {
        type: String,
    },

    sensor: {
        type:String,
    },

    value: {
        type: String,
    }
},{timestamps:true})

const Data = module.exports = mongoose.model('Data', bookSchema);

// GET DATAs

module.exports.getDatas = function(callback, limit){
    Data.find(callback).limit(limit);
}

// GET DATA id
module.exports.getData = function(id, callback){
    Data.findById(id, callback);
}

// POST DATA
module.exports.addData = function(data, callback){
    Data.create(data, callback);
}