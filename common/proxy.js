const http = require('http')

const Duplex = require('stream').Duplex;

const duplex = new Duplex();

module.exports = function (pipe, host, port, path, method, headers) {


    const options = {
        hostname: host,
        port: port,
        path: path,
        method: method,
        headers: headers
    }

    const req = http.request(options, (res) => {
        res.setEncoding('utf8')

        res.on('data', (chunk) => {
            duplex.write(chunk)
            duplex.pipe(pipe)
        })

        res.on('end', () => {
            console.log('No more data in response.')
        })
    })

    req.on('error', (e) => {
         console.log(`problem with request: ${e.message}`)
    })

    req.end()
}