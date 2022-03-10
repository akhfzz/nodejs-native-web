//belajar ttg method, url dan body request yg didapatkan dengan teknik stream

const requestURL = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("X-PoweredBy", "NodeJS");
    const {url, method} = req;
    if(url === '/'){
        if(method === 'GET'){
            res.statusCode = 200;
            res.end('Ini adalah homepage');
        }else{
            res.statusCode = 400;
            res.end(`Halaman dengan method ${method} tidak dapat diakses`);
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
                res.end(`Halo, ${name}! ini adalah halaman about`);
            })
        }else if(method === 'GET'){
            res.statusCode = 200;
            res.end("Ini adalah halaman about");
        }else{
            res.statusCode = 400;
            res.end(`Halaman ini tidak dapat di akses ${method} request`);
        }
    }else{
        res.statusCode = 404;
        res.end("Halaman tidak ditemukan")
    }
}

module.exports = requestURL