const config = require("../configs/main-config.json")

const words = require("./manager/wordsManager")
const Twit = require("twit")

var account = new Twit({
    consumer_key: config["twitter"]["consumer_key"],
    consumer_secret: config["twitter"]["consumer_secret"],
    access_token: config["twitter"]["access_token"],
    access_token_secret: config["twitter"]["access_token_secret"],
    timeout_ms: 60000,
    strictSSL: true
})

var alreadySent = false

function shouldSend() {
    var date = new Date()

    const should = date.getMinutes() == 0 || date.getMinutes() == 30
    if(!should && alreadySent) alreadySent = false

    return (should && !alreadySent)
}

function sendTweet() {
    if(!shouldSend()) return
    alreadySent = true

    var message = config["general"]["message"].replace("<word>", words.getRandomWord())
    console.log("[ > ] Trying to send " + message)

    account.post("statuses/update", {
        status: message
    }, (err, data, response) => {
        if(!err) {
            console.log(" * Tweeted Successfully")
            return
        }

        console.log(" ** Failed to Tweet!")
    })
}

console.log("[-] Tweet Random Message Bot - Successfully Initiated")
setInterval(sendTweet, config["general"]["updateDelay"])