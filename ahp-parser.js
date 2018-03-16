Array.prototype.first = function () { return this[0] }

const tree = require('./example.json')
const mainAlternatives = tree.alternatives
const goal = Object.keys(tree).filter(it => it !== 'alternatives').first()

function getCriterias(tree) {
    return (typeof tree === 'undefined') ? [] : Object.keys(tree).filter(it => it !== 'matrix')
}

function getMatrix(tree) {
    return tree.matrix
}

function hasSubcriterias(tree) {
    return ! Array.isArray(tree)
}

function ask(tree, criterion) {
    if (! hasSubcriterias(tree)) {
        for (let i = 0; i < mainAlternatives.length; i++) {
            for (let j = i + 1; j < mainAlternatives.length; j++) {
                console.log('How much better is', mainAlternatives[i], 'from', mainAlternatives[j], 'based on', criterion)
            }
        }
    } else {
        const criterias = getCriterias(tree)

        for (let i = 0; i < criterias.length; i++) {
            for (let j = i + 1; j < criterias.length; j++) {
                console.log('How much better is', criterias[i], 'from', criterias[j], 'based on', criterion)
            }
        }

        for (const criterion of criterias) {
            ask(tree[criterion], criterion)
        }
    }
}

ask(tree[goal], goal)
