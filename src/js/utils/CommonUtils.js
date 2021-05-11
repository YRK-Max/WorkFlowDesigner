export function isNeedUpdate(newVal, oldVal) {
    return newVal !== undefined && newVal !== oldVal;
}
export function findObjFromArrayByField(array, fieldName, fieldVal) {
    let targert = {};
    for (let obj of array) {
        if (obj[fieldName] == fieldVal) {
            targert = obj;
            break;
        }
    }
    return targert;
}
export function isBlank(str) {
    return str === undefined || str.length == 0;
}


