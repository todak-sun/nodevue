const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'node',
    password: 'dkdlxl',
    port : 3306,
    database: 'study_node'
});

connection.connect();

connection.query('select * from products', function (error, results, fields) {
    if (error) throw error;
    console.log('The First User is : ', results[0]);
});

connection.end();