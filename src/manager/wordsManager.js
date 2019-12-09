const fs = require("fs")
const path = require("path")
const sentWords = require("../../data/sent_words.json")

const availableWords = fs.readFileSync(path.resolve('../../data/words.txt'), "utf8").split('\n')

function getRandomWord() {
    var selectedWord = availableWords[Math.floor(Math.random() * availableWords.length)]

    if(sentWords.includes(selectedWord)) return getRandomWord()

    sentWords.push(selectedWord)

    saveCurrentList()

    return selectedWord
}

function saveCurrentList() {
    fs.writeFile(path.resolve('../../data/sent_words.json'), JSON.stringify(sentWords), () => {})
}

module.exports.getRandomWord = getRandomWord