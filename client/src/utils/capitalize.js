function capitalize(word){
    let result = ''
    result+= word[0]?.toUpperCase()
    result+= word?.substring(1)
    return result
}

module.exports = capitalize