const express = require('express');
const app = express();
const PORT = process.env.port || 5050;

const db = require('./db.js');

const bodyParser = require('body-parser');

app.use(bodyParser.json()); //bodyparser 사용 설정

const async = require('async')
const request = require('request');
const { resolve } = require('url');
var cd_array = [];


app.get('/app',(req, res, next) => {
    const query = "SELECT estcd FROM estcd"

    db.query(query, (error, res) => {
        if(error) {
            console.log(error);
        } else {
            // test
            // console.log(res.rows[0].estcd);
            // cd_array.push(res.rows[0].estcd);
            for (let row of res.rows) {
                console.log(row.estcd);
                cd_array.push(row.estcd);
            }
           
        }
        console.log(cd_array);
        console.log(cd_array.length)
    }); 
    

});
var result = []; 
app.get('/test', (req,res) => {
    
    if(cd_array.length > 0){    
        loop();     
        console.log(result.length)
        if(result.length == cd_array.length){
            res.send(result)
        }
    } 
    else
    {
        console.log(cd_array.length + "데이터없음");
    }
});
async function loop() {
    console.log("loop")
    for (var i in cd_array) {
        await requestTest(i);
    }
}

function requestTest(data) {
    return new Promise((resolve) => {
        var api_url = 'http://www.wamis.go.kr:8080/wamis/openapi/wkf/wkf_sestsiq_lst';
        var options = {
            uri : api_url,
            qs : {
                code : cd_array[data]
            },
            json : true
        }
        console.log(options);
        request.post(options, function (error, res, body) {
            if (!error && res.statusCode == 200) {
                /*
                console.log(body.list[0]);
                result.push(body.list[0]);
                console.log(result.length)
                resolve(result);
                */
                var estcd = body.list[0].estcd;
                var estnm = body.list[0].estnm;
                var rivnm = body.list[0].rivnm;
                var addr = body.list[0].addr;
                var rivdv = body.list[0].rivdv;
                var estlr = body.list[0].estlr;
                var estdv = body.list[0].estdv;
                var strtp = body.list[0].strtp;
                var lon = body.list[0].lon;
                var lat = body.list[0].lat;
                var tmx = body.list[0].tmx;
                var tmy = body.list[0].tmy;
                var eststs = body.list[0].eststs;
                var etcitm = body.list[0].etcitm;
                var bsncd = body.list[0].bsncd;
                
                const insert = 'INSERT INTO openapi(estcd,estnm,rivnm,addr,rivdv,estlr,estdv,strtp,lon,lat,tmx,tmy,eststs,etcitm,bsncd) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)'
                const param = [estcd,estnm,rivnm,addr,rivdv,estlr,estdv,strtp,lon,lat,tmx,tmy,eststs,etcitm,bsncd];

                db.query(insert, param, (error, res) => {
                    if(error) {
                        console.log(error)
                    } else {
                        resolve(res)
                    }
                }); 
            } else {
                console.log(false)
            }
        })      
    });
}

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
});

// var estcd =null;
            // var estnm=null;
            // var rivnm=null;
            // var addr=null;
            // var rivdv=null;
            // var estlr=null;
            // var estdv=null;
            // var strtp=null;
            // var lon=null;
            // var lat=null;
            // var tmx=null;
            // var tmy=null;
            // var eststs=null;
            // var etcitm=null;
            // var bsncd=null;
            
            // estcd = body.list[0].estcd;
            // estnm = body.list[0].estnm;
            // rivnm = body.list[0].rivnm;
            // addr = body.list[0].addr;
            // rivdv = body.list[0].rivdv;
            // estlr = body.list[0].estlr;
            // estdv = body.list[0].estdv;
            // strtp = body.list[0].strtp;
            // lon = body.list[0].lon;
            // lat = body.list[0].lat;
            // tmx = body.list[0].tmx;
            // tmy = body.list[0].tmy;
            // eststs = body.list[0].eststs;
            // etcitm = body.list[0].etcitm;
            // bsncd = body.list[0].bsncd;
            // const insert = 'INSERT INTO openapi(estcd,estnm,rivnm,addr,rivdv,estlr,estdv,strtp,lon,lat,tmx,tmy,eststs,etcitm,bsncd) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)'
            // const param = [estcd,estnm,rivnm,addr,rivdv,estlr,estdv,strtp,lon,lat,tmx,tmy,eststs,etcitm,bsncd];

            // db.query(insert, param, (error, res) => {
            //     if(error) {
            //     console.log(error)
            //     } else {
                    
            //     }
            // }); 