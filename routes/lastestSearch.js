/**
 * Created by rdevansjr on 6/29/17.
 */
"use strict";

const express = require('express');
const router = express.Router();
const searchLogModel = require("../model/searchLog");

router.get('/', function(req, res, next) {

    searchLogModel
        .find({})
        .sort('-when')
        .exec(function (err, items) {

            if (err) console.log(err);

            const respObj = {searches: items};
            res.send(respObj);


        });
    });

module.exports = router;
