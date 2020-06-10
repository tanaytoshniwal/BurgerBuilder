export const updateObject = (oldObject, newProperties) => {
    return {
        ...oldObject,
        ...newProperties
    }
}

export const preprocessData = data => {
    let resData = []
    for (let ele in data) {
        resData.push([ele, data[ele]])
    }
    resData.sort((a, b) => {
        return a[1].position - b[1].position
    })
    let result = {}
    for (let i = 0; i < resData.length; i++) {
        result[resData[i][0]] = resData[i][1].value
    }
    return result
}