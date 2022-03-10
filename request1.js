//belajar menerapkan stream pada request

const requestBasic = (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.statusCode = 200;

    const {method} = req;

    if(method === 'GET'){
        res.end("<h2>Namaku faizal</h2>");
    }else if(method === 'POST'){

        let body = [];

        req.on('data', (dt) => {
            body.push(dt);
        })
        
        req.on('end', () => {
            body = Buffer.concat(body).toString();
            const {name} = JSON.parse(body);
            res.end(`Halo ${name}`);
        })
    }
}

module.exports = requestBasic