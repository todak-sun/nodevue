const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'testuser',
    password: '0309',
    port: 3306,
    database: 'test'
});

connection.connect();

connection.query('select pwd from node_test where id=?', 'tjsdydwn', function (error, results, fields) {
    if (error) throw error;
    console.log('The First User is : ', results[0]);
});

connection.end();