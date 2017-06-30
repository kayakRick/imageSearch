/**
 * Created by rdevansjr on 6/29/17.
 */

var mongoose = require('mongoose');
/* ********************************************
 Search Log
 ******************************************** */
var searchLogSchema = new mongoose.Schema({
    term: {type: String,  unique:false},
    when: {type: Date, default: Date.now, unique:false}
});

// Build the User model
module.exports = mongoose.model( 'searchLogModel', searchLogSchema );

