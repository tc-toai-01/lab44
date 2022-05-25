var mongoose =  require('mongoose');

var dataSchema = mongoose.Schema({
    temperature: {
        type: Number,
    },

    humidity: {
        type: Number,
    },

    lux: {
        type: Number,
    },

    date: {
        type: Date,
        default: Date.now,
        required: true,
    }
});

var Data = module.exports = mongoose.model('Data', dataSchema);

// GET DATAs

module.exports.getDatas = function(callback, limit){
    Data.find(callback).limit(limit);
}

// GET DATA id
module.exports.getData = function(id, callback){
    Data.findById(id, callback);
}

// POST DATA
module.exports.addData = function(book, callback){
    Data.create(book, callback);
}