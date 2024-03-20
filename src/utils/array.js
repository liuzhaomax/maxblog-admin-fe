export const remove = (array, target) => {
    let indexToRemove
    for (let i = 0; i < array.length; i++) {
        if (array[i] === target) {
            indexToRemove = i
            break
        }
    }
    if (indexToRemove !== undefined) {
        array.splice(indexToRemove, 1)
    }
    return array
}

export const flatten = arr => {
    return arr.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
    }, [])
}
