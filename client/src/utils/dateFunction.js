const monthByName = [{'01':'January'}, {'02':'February'}, {'03':'March'}, {'04':'April'}, {'05':'May'}, {'06':'June'}, {'07':'July'}, {'08':'August'}, {'09':'September'}, {'10':'October'}, {'11':'November'}, {'12':'December'}]

function numberToStringDate(date){
    let result = ''
    let year = date?.split('-')[0]
    let month = date?.split('-')[1]
    let day = date?.split('-')[2]
    monthByName.map((item)=>{
        if(item[month]) result+= item[month]
    })
    result += ` ${day}, ${year}`
    return result
}

module.exports = numberToStringDate