const fs = require('fs')
const getline = require('readline-sync')
const { ask, askForCriterias, askForAlternatives, makeMatrix } = require('./functions')

const tree = {
    alternatives: [],
}

const goal = getline.question('What is the goal? ')
const howMany = getline.question('How many criterias does it have? ')
tree[goal] = { matrix: makeMatrix(howMany), }

const alternatives = askForAlternatives(tree)

askForCriterias(tree[goal], alternatives)

ask(tree[goal], goal, alternatives)

fs.writeFileSync(`./${goal}.json`, JSON.stringify(tree))
