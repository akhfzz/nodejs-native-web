//belajar ttg response body dengan menggunakan json

const responseBody = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("X-PoweredBy", "NodeJS");
    const {url, method} = req;
    if(url === '/'){
        if(method === 'GET'){
            res.statusCode = 200;
            res.end(JSON.stringify({
                message: 'Ini adalah halaman dashboard'
            }));
        }else{
            res.statusCode = 400;
            res.end(
                JSON.stringify({
                    message: `Halaman dengan method ${method} tidak dapat diakses`
                }));
        }
    }else if(url === '/about'){
        if(method === 'POST'){
            let body = []
            req.on('data', (dt) => {
                body.push(dt);
            })
            req.on('end', ()=>{
                body = Buffer.concat(body).toString();
                const {name} = JSON.parse(body);
                res.statusCode = 200;
                res.end(
                    JSON.stringify({
                        message: `Halo, ${name}! ini adalah halaman about`
                    }));
            })
        }else if(method === 'GET'){
            res.statusCode = 200;
            res.end(JSON.stringify({
                message: 'ini adalah halaman about'
            }));
        }else{
            res.end(JSON.stringify({
                message: `Halaman ini tidak dapat di akses ${method} request`
            }));
        }
    }else{
        res.statusCode = 404;
        res.end(JSON.stringify({
            message: `Halaman di endpoint ${url} tidak ditemukan`
        }))
    }
}

module.exports = responseBody