import axios from 'react-native-axios'
// import console = require('console');
export const Proxy = 'https://86aa795e.ngrok.io'
export const ShipmentEP = '/api/Shipment'

export const EMplCode = 5000000217;
export const siteCode = "A008"
export const userCode = "000217"
export const userName = "Hồ Xuân Thịnh"
export const dlvrIndx = "A00820000000220"
export const RES_TIME_OUT = 2000;


const travelPath = (obj, path) => {
    var pointer;
    if (!path[0])
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

            //filter
            var [filterField, filterValue] = obj[key].split('=')
            pointerNewObj[key] = mapBy[filterField]
            if (filterValue) {

                if (pointerNewObj[key] !== filterValue) {
                    throw 'object not match by filter'
                }
            }
        }
    })
}


export const GetHistoryWarrantyReturn = (keymaps, params) => {
    const queryEndpoint = 'GetHistoryWarrantyReturn'
    return axios.get(`${Proxy}${ShipmentEP}/${queryEndpoint}`, { params: params }, { timeout: 200 })
        .then(res => {
            var returnData = [];
            res.data.data.map(record => {
                var newdata = {};
                try {
                    mapObjectByValues(keymaps, newdata, record)
                }
                catch (e) {
                    return
                }
                returnData.push(newdata)
            })
            return returnData
        }
        )
}


export const GetListWarrantyReturnByUser = (keymaps, params) => {
    const queryEndpoint = 'GetListWarrantyReturnByUser'
    return axios.get(`${Proxy}${ShipmentEP}/${queryEndpoint}`, { params: params }, { timeout: 200 })
        .then(res => {
            var returnData = [];
            res.data.data.map(record => {
                var newdata = {};
                try {
                    mapObjectByValues(keymaps, newdata, record)
                }
                catch (e) {
                    return
                }
                returnData.push(newdata)
            })
            return returnData
        }
        )
}


export const GetListReasonChange = (keymaps, params) => {
    const queryEndpoint = 'GetListReasonChange'
    return axios.get(`${Proxy}${ShipmentEP}/${queryEndpoint}`, {})
        .then(res => {
            var returnData = [];
            res.data.data.map(record => {
                var newdata = {};
                try {
                    mapObjectByValues(keymaps, newdata, record)
                }
                catch (e) {
                    return
                }
                returnData.push(newdata)
            })
            return returnData
        }
        )
}

export const UpdateWarrantyReturn = (params) => {
    const queryEndpoint = 'UpdateWarrantyReturn'
    console.log(params)
    return axios.post(`${Proxy}${ShipmentEP}/${queryEndpoint}`, params)
}