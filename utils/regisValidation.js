export const cekValidasi = (item, min, max, regex, msg, msg2, cek) => {
    if(item === '' || typeof item === 'undefined')
        return `${msg} Cannot Be Empty`;
    else if(item.length < min)
        return msg + ' Must Be At Least ' + min + ' Characters';
    else if(item.length > max)
        return `${msg} Must Be Less Than ${max} Characters`;
    else if (cek == 1){
        if(!(regex.test(item)) && item.length > 0)
            return `${msg} Input Must be Valid ${msg2}`;
    }
    return false;
}

export const forAlert = (aType) => {
    if(aType === 1)
        return "Data Has Been Successfully Updated";
    else if(aType === 2)
        return "Data Has Been Successfully Deleted";
    else
        return "";
}

