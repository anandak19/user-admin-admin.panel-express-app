const http = require("http");

const handleError = (err, req, res, next) =>{
    const status = err.status || 500
    const message = err.message || http.STATUS_CODES[status] || 'Unknown error occoured'
    res.render('error', {status, message})
}

module.exports = handleError