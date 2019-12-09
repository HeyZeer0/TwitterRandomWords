const fs = require("fs")
const path = require("path")
const sentWords = require("../../data/sent_words.json")

const availableWords = fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'words.txt'), "utf8").split('\n')

function getRandomWord() {
    var selectedWord = availableWords[Math.floor(Math.random() * availableWords.length)]

    if(sentWords.includes(selectedWord)) return getRandomWord()

    sentWords.push(selectedWord)

    saveCurrentList()

    return selectedWord
}

function saveCurrentList() {
    fs.writeFile(path.join(__dirname, '..', '..', 'data', 'sent_words.json'), JSON.stringify(sentWords), () => {})
}

module.exports.getRandomWord = getRandomWord