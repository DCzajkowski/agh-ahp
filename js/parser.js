const getline = require('readline-sync')
const { ask, askForCriterias, askForAlternatives, makeMatrix } = require('./functions')

// const goal = 'Car'
// const tree = {
//     alternatives: ['Tesla', 'Mercedes'],
//     Car: {
//         matrix: [],
//         Looks: {
//             matrix: [],
//             Color: [],
//             Wheels: []
//         },
//         Speed: [],
//         Cost: []
//     }
// }
// const alternatives = ['Tesla', 'Mercedes']

const tree = {
    alternatives: [],
}

const goal = getline.question('What is the goal? ')
const howMany = getline.question('How many criterias does it have? ')
tree[goal] = { matrix: makeMatrix(howMany), }

const alternatives = askForAlternatives(tree)
askForCriterias(tree[goal], alternatives)
ask(tree[goal], goal, alternatives)

console.log(tree)

// const mainAlternatives = tree.alternatives
// const goal = Object.keys(tree).filter(it => it !== 'alternatives')[]

// console.log(tree['Goal'].matrix)
// console.log(tree['Goal']['Criterion 1'].matrix)
// console.log(tree['Goal']['Criterion 1']['Sub-criterion 1'])
// console.log(tree['Goal']['Criterion 1']['Sub-criterion 2'])
// console.log(tree['Goal']['Criterion 1']['Sub-criterion 3'])
// console.log(tree['Goal']['Criterion 1']['Sub-criterion 4'])
// console.log(tree['Goal']['Criterion 2'].matrix)
// console.log(tree['Goal']['Criterion 2']['Sub-criterion 4'])
// console.log(tree['Goal']['Criterion 2']['Sub-criterion 5'])
// console.log(tree['Goal']['Criterion 2']['Sub-criterion 6'])
// console.log(tree['Goal']['Criterion 3'].matrix)
// console.log(tree['Goal']['Criterion 3']['Sub-criterion 7'])
// console.log(tree['Goal']['Criterion 3']['Sub-criterion 8'])
// console.log(tree['Goal']['Criterion 3']['Sub-criterion 9'])
