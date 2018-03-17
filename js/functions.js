const getline = require('readline-sync')

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

function ask(tree, criterion, mainAlternatives) {
    if (! hasSubcriterias(tree)) {
        askMatrix(mainAlternatives, criterion, tree)
    } else {
        const criterias = getCriterias(tree)

        askMatrix(criterias, criterion, tree.matrix)

        for (const criterion of criterias) {
            ask(tree[criterion], criterion, mainAlternatives)
        }
    }
}

function makeMatrix(n) {
    const x = []

    for (let i = 0; i < Math.pow(n, 2); i++) {
        x[i] = 0
    }

    return x
}

function askForCriterias(tree, alternatives) {
    const criterion = getline.question('What is the criterion? ')

    if (! criterion) return

    const hasSubcriterias = getline.question(`Does ${criterion} have subcriterias? (Y/n) `)

    if (! hasSubcriterias || hasSubcriterias.toLowerCase() === 'y') {
        const howMany = getline.question(`How many? `)
        tree[criterion] = { matrix: makeMatrix(howMany), }
        askForCriterias(tree[criterion], alternatives)
    } else {
        tree[criterion] = makeMatrix(alternatives.length)
    }

    askForCriterias(tree, alternatives)
}

function askForAlternatives(tree) {
    while (true) {
        const alternative = getline.question('What is the alternative? ')

        if (! alternative) break

        tree.alternatives.push(alternative)
    }

    return tree.alternatives
}

module.exports = {
    getCriterias,
    hasSubcriterias,
    printMatrix,
    askMatrix,
    ask,
    askForCriterias,
    askForAlternatives,
    makeMatrix,
}
