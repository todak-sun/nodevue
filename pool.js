const mysql = require('mysql'),
    util = require('util'),
    Promise = require('bluebird');

Promise.promisifyAll(mysql);
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);
//promisify화 하여, then이란 메소드를 활용할 수 있게 해줌.

const DB_INFO = {
    host: 'localhost',
    user: 'testuser',
    password: '0309',
    database: 'test',
    miltipleStatements: true,
    connectionLimit: 5,
    //커넥션 개수 제한.
    waitForConnections: false
    //커넥션을 기다리지 않기.
}

//커넥션을 맺을 때마다 걸리는 지연시간을
//최소화 시켜주는 singleton 기법.

module.exports = class {
    constructor(dbinfo) {
        dbinfo = dbinfo || DB_INFO;
        this.pool = mysql.createPool(dbinfo);
        //멤버변수를 따로 선언하지 않아도
        //생성자 함수 호출시 pool이 생성됨.
    }

    connect() {
        return this.pool.getConnectionAsync().disposer(conn => {
            //this.pool.getConeectiionAsync()에서 커넥션을 맺음.
            //커넥션이 종료가 되면, disposer이 실행됨.
            return conn.release();
            //재사용을 해야하니까 close하지 않고 release로 풀어줌.
        });
    }

    end() {
        this.pool.end((err) => {
            util.log(">>>>>>>>>>>>>>>>>>>>>>>>>End of Pool!!!");
            if (err) {
                util.log("ERR pool ending !!");
            }
        });
    }
};