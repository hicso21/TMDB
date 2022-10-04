function noMoreThan14 (name){
    let result
    if(name.length>14){
        result = name.substring(0,14) + '...'
    }else{
        result = name
    }
    return result
}

module.exports = noMoreThan14