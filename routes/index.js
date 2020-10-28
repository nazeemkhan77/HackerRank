const express = require("express");
const router = express.Router();
const Redis = require("ioredis");
const redis = new Redis();
const { v4: uuidv4 } = require('uuid');

router.get('/', (req, res, next) => {
    res.status(200).send({'message': 'success'})
})

router.get('/user/:userid/sms', (req, res, next) => {
    getUser(req.param.userid, 'sms').then((value) => {
        console.log('value:' + JSON.stringify(value))
        res.status(200).send(value)
    })
})

router.get('/user/:userid/tweet', (req, res, next) => {
    getUser(req.param.userid, 'tweet').then((value) => {
        console.log('value:' + JSON.stringify(value))
        res.status(200).send(value)
    })
})

router.post('/user/:userid/sms', (req, res, next) => {
    let message_id = uuidv4();
    console.log(`user_${req.params.userid}_sms_${message_id}`)
    redis.set(`user_${req.params.userid}_sms_${message_id}`, req.body.message)
    let message = redis.get(`user_${req.params.userid}_sms_${message_id}`, (err, data) => {
        console.log(data)
    })
    
    res.status(200).send({'message': 'send sms successfully'})
})

router.post('/user/:userid/tweet', (req, res, next) => {
    let message_id = uuidv4();
    console.log(`user_${req.params.userid}_tweet_${message_id}`)
    redis.set(`user_${req.params.userid}_tweet_${message_id}`, req.body.message)
    let message = redis.get(`user_${req.params.userid}_tweet_${message_id}`, (err, data) => {
        console.log(data)
    })
    
    res.status(200).send({'message': 'tweet posted successfully'})
})

let getUser = (userid, messgetype) => {
    return new Promise((resolve, reject) => {
        const stream = redis.scanStream({match: `user_${userid}_${messgetype}_*`});
        let user_messages = {};
        stream.on("data", (resultKeys) => {
            for (let i = 0; i < resultKeys.length; i++) {
                console.log('key:' + resultKeys[i])
                redis.get(resultKeys[i])
                .then(function(value){
                    console.log(resultKeys[i] + ':' + value)
                    user_messages[resultKeys[i]] = value
                    console.log(user_messages[resultKeys[i]])
                })
            }
        })
        stream.on('error', () => {
            reject(`failed to read ${messgetype} messages!`)
        });
        stream.on('end', () => {
            resolve(user_messages)
        });
    })
}

module.exports = router;
