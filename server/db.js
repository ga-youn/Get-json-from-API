var { Client } = require('pg');

//postSql db 접속
const db = new Client({
    user: "postgres",
    host: "localhost",
    database: "test",
    password: "1234",
    port: "5432"
});

db.connect(err => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('success!')
    }
});


module.exports = db;