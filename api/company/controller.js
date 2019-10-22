import getPhoneNumber from './core'

/**
 *
 * @function findPhoneNumber
 * @param {*} query
 *
 * We call the getNumberPhone function to use the google API
 * Return status 
 */

async function findPhoneNumber(req, res) {
    if (!Object.keys(req.query).length) return res.status(500).json({ "phone": null, "error": "Query is not defined" })

    const result = await getPhoneNumber(req.query) // get number international

    return res.status(result.status).json({ "phone": result.phone || null, "error": result.error || null })
}


export default findPhoneNumber