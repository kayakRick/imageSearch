"use strict";

const express = require('express');
const restCall = require("../util/getJSON");
const router = express.Router();
const searchLogModel = require("../model/searchLog");

router.get('/:term', function(req, res, next) {

    const mod = new searchLogModel({term: req.params.term});
    mod.save(err => console.log(err));

    const start = req.query.offset ? +req.query.offset + 1 : 1;

    const options = {
        host: "www.googleapis.com",
        port: 443,
        path: "/customsearch/v1?key=" + process.env.ENV_KEY +
        "&cx=" + process.env.ENV_SEARCH_ENGINE + "&q=" + encodeURIComponent(req.params.term) +
        "&start=" + start,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    restCall.getJSON(options, function (statusCode, result) {
        res.statusCode = statusCode;

        if(result.hasOwnProperty("error")){
            res.send(result);
            return;
        }

        const reply = [];

        for(let i = 0; i < result.items.length; i++){
            const element = result.items[i];

            if(!element.hasOwnProperty("pagemap"))
                continue;

            if(!element.pagemap.hasOwnProperty("cse_image"))
                continue;

            const replyObj = {
                url: element.pagemap.cse_image[0].src,
                snippet: element.snippet};

                if(element.pagemap.hasOwnProperty("cse_thumbnail"))
                    replyObj.thumbnail = element.pagemap.cse_thumbnail[0].src;

                replyObj.context = element.link;

            reply.push(replyObj);
        };



        res.send({result: reply});
    });

});

module.exports = router;
