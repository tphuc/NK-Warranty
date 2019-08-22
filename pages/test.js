

const travelPath = (obj, path) => {
    var pointer;
    if(!path[0])
        return obj
    path.map(k => {
        if (!obj[k]) obj[k] = {};
        pointer = obj[k]
    })
    return pointer
}

const mapObjectByValues = (obj, storeArr, mapBy, parent = '') => {
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object') {
            let prefix = parent ? parent + '.' + key : key
            mapObjectByValues(obj[key], storeArr, mapBy, prefix)
        }
        else {
            var pathSplited = parent.split('.')
            var pointerNewObj = travelPath(storeArr, pathSplited)
            var pointerObjToMap = travelPath(obj, pathSplited)
            pointerNewObj[key] = 1
        }
    })
}



data = []
template1 = {
    voucherInfo: {
        voucherID: 'mainCode',
        buyDate: 'mainDate',
    },
    productInfo: {
        name: 'art_Name',
        seriNumber: 'art_Code',
        modelNumber: 'artModel',
    },
    warrantyInfo: {
        testInfo: 'caseExln',
        warrantyType: 'rsltType',
        handling: 'rsltName'
    }
}
template2 = {
    voucherID: 'mainCode',
    name: 'custName',
    phone: 'custTelp',
    location: 'custAddr',
    product: 'art_Name',
    departure: 'dlvrDate',
    warehouse: 'wrhsName',
    notes: 'exlnNote',
    price: 'sum_HVAT'
}
