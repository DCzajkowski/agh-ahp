# Specification for AHP format file
## File & Format
The file should be named after the goal, that is being used. The file is in `.json` format.

## Convention
All user submitted fields, like the Goal, Crieria and Alternatives should start with a capital letter.
The spec forbids using reserved keywords: `matrix` and `alternatives`.

## File format
The file represents a JSON object. It contains two keys, namely: `alternatives` and a user-defined `Goal`.
The `alternatives` is always an array of given alternatives.
The Goal defines either an object or an array. If object is used, it means there are some criteria. If an array is used, it should be a comparison matrix of alternatives.

```python
{
    "alternatives": ["Alternative 1", "Alternative 2"],
    "User-defined Goal": [1, 2, 0.5, 1] # matrix comparing Alternative 1 to Alternative 2 without any citerias
}
```

### Defining criteria
Criterion can be either an object, if it contains sub-criteria, or an array, if it compares alternatives.

Example:
```python
"Goal": {
    "matrix": [], # matrix comparing "Criterion with sub-criteria" to "Criterion without sub-criteria"
    "Criterion with sub-criteria": {
        "matrix": [], # matrix comparing "Sub-criterion 1" to "Sub-criterion 2"
        "Sub-criterion 1": [], # matrix comparing alternatives based on "Sub-criterion 1"
        "Sub-criterion 2": [], # matrix comparing alternatives based on "Sub-criterion 1"
    },
    "Criterion without sub-criteria": [] # matrix comparing alternatives based on "Criterion without sub-criteria"
}
```

As noted above, comparison matricies are defined either in a key `matrix`, or as a main value of the parent-criterion.

### Comparison matrix
The comparison matrix should be 2D formatted.

Example:
```
// Given matrix
[ 1 2 3 ]
| 4 5 6 |
[ 7 8 9 ]

// Formatted matrix in JSON
[1, 2, 3, 4, 5, 6, 7, 8, 9]
```

# Implementation
Example implementation is available at http://theahp.cf.

# Questions?
Get in touch: [@CzajkowskiDarek](https://twitter.com/CzajkowskiDarek)
