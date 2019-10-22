import map from '@google/maps'
import { key } from '../config/google.config'

const googleMapsClient = map.createClient({
    key: key,
    Promise: Promise
})

/**
 *  With the information of a company we get the place_id
 * 
 * @name getPlaceID
 * @function 
 * @param {*} query 
 * @return {string}
 * 
 */

let getPlaceID = (query) => {
    const values = Object.values(query) || []

    return new Promise((resolve, reject) => {

        googleMapsClient.findPlace({
            'input': String(values),
            'inputtype': 'textquery',
            'fields': ['place_id']
        })
        .asPromise()
        .then((response) => resolve(response.json.candidates[0].place_id))
        .catch((err) => reject(new Error(err.json.status) ))
    })
}

/**
 * With the place_id of a company we get the phone number
 * 
 * @name getPhoneNumber
 * @function 
 * @param {*} query
 * @return {object}
 *
 */

async function getPhoneNumber(query) {    
    try {
        let result = await getPlaceID(query)

        return new Promise((resolve, reject) => {

            googleMapsClient.place({
                'placeid': result,
                'fields': ['international_phone_number']
            })
            .asPromise()
            .then((response) => resolve({ 'status': 200, 'phone': response.json.result.international_phone_number }))
            .catch((err) => reject(new Error(err.json.status)))
        })
        
    } catch(err){
        return { 'status': 500, 'error': err.toString() }
    }
}

export default getPhoneNumber