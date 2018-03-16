const getline = require('readline-sync')

Array.prototype.first = function () { return this[0] }

const tree = require('../example.json')
const mainAlternatives = tree.alternatives
const goal = Object.keys(tree).filter(it => it !== 'alternatives').first()

function getCriterias(tree) {
    return (typeof tree === 'undefined') ? [] : Object.keys(tree).filter(it => it !== 'matrix')
}

function hasSubcriterias(tree) {
    return ! Array.isArray(tree)
}

function printMatrix(matrix) {
    const n = Math.sqrt(matrix.length)
    let result = ''

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            result += matrix[i * n + j] + '\t'
        }
        result += '\n'
    }

    return result
}

function askMatrix(alternatives, criterion, matrix) {
    const n = Math.sqrt(matrix.length)
    const indicesOfUpperTriangle = []

    // Fill matrix with 1 at a diagonal and 0 everywhere else
    // Collect indices of the upper triangle (indices of places above diagonal)
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            matrix[i * n + j] = (i === j) ? 1 : 0;

            if (j > i) {
                indicesOfUpperTriangle.push(i * n + j)
            }
        }
    }

    // Ask for input and fill appropriate indices
    let k = 0
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            matrix[indicesOfUpperTriangle[k++]] = parseFloat(parseFloat(getline.question(`How much better is ${alternatives[i]} from ${alternatives[j]} based on ${criterion} `)).toFixed(4))
        }
    }

    // Fill lower triangle
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (j < i) {
                matrix[i * n + j] = parseFloat((1 / matrix[j * n + i]).toFixed(4))
            }
        }
    }
}

function ask(tree, criterion) {
    if (! hasSubcriterias(tree)) {
        askMatrix(mainAlternatives, criterion, tree)
    } else {
        const criterias = getCriterias(tree)

        askMatrix(criterias, criterion, tree.matrix)

        for (const criterion of criterias) {
            ask(tree[criterion], criterion)
        }
    }
}

ask(tree[goal], goal)

console.log(tree['Goal'].matrix)
console.log(tree['Goal']['Criterion 1'].matrix)
console.log(tree['Goal']['Criterion 1']['Sub-criterion 1'])
console.log(tree['Goal']['Criterion 1']['Sub-criterion 2'])
console.log(tree['Goal']['Criterion 1']['Sub-criterion 3'])
console.log(tree['Goal']['Criterion 1']['Sub-criterion 4'])
console.log(tree['Goal']['Criterion 2'].matrix)
console.log(tree['Goal']['Criterion 2']['Sub-criterion 4'])
console.log(tree['Goal']['Criterion 2']['Sub-criterion 5'])
console.log(tree['Goal']['Criterion 2']['Sub-criterion 6'])
console.log(tree['Goal']['Criterion 3'].matrix)
console.log(tree['Goal']['Criterion 3']['Sub-criterion 7'])
console.log(tree['Goal']['Criterion 3']['Sub-criterion 8'])
console.log(tree['Goal']['Criterion 3']['Sub-criterion 9'])
