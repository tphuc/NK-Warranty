import axios from 'react-native-axios'
// import console = require('console');
export const Proxy = 'http://localhost:10000'
export const ShipmentEP = '/api/Shipment'
export const EMplCode = 5000000217;


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
            mapObjectByValues(obj[key],storeArr, mapBy, prefix)
        }
        else {
            var pathSplited = parent.split('.')
            var pointerNewObj = travelPath(storeArr, pathSplited)

            var pointerObjToMap = travelPath(obj, pathSplited)

            //filter
            
            pointerNewObj[key] = mapBy[pointerObjToMap[key]]
            // if(filterArgs.length > 1){
               
            //     if(mapBy[filterArgs[0]] !== filterArgs[1] ) {
            //         console.log('!=')
            //         throw 'object not match by filter'
            //     }
            // }
        }
    })
}





export const GetListWarrantyReturnByUser = (keymaps, params = { EMplCode: EMplCode }) => {

    const queryEndpoint = 'GetListWarrantyReturnByUser'
    return axios.get(`${Proxy}${ShipmentEP}/${queryEndpoint}`, { params: params })
        .then(res => {
            var returnData = [];
            res.data.data.map(record => {
                var newdata = {};
                try{
                    mapObjectByValues(keymaps, newdata, record)
                    console.log(newdata)
                } 
                catch(e){
                    console.log(e)
                    console.log('exception')
                    return
                }
                returnData.push(newdata)
            })
            return returnData
        }
    )
    .catch(res => { console.log(res); return false })
}
