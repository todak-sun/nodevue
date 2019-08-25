const util = require('util'),
    Promise = require('bluebird');

const Pool = require('../pool');

const sql1 = "update node_test set pwd='abc' where id='test'";
const sql2 = "update node_test set pwd='abc2' where id='test'";

const pool = new Pool();

// Promise.using(pool.connect(), conn => {
//     conn.beginTransaction(txerr => {
//         Promise.all([
//             conn.queryAsync(sql1),
//             conn.queryAsync(sql2)
//         ]).then(result => {
//             for (let i = 0; i < result.length; i++) {
//                 util.log('sql${i+1} = ', r[i].affectedRows);
//             }
//             conn.commit();
//             pool.end();
//         }).catch(err => {
//             conn.rollback();
//             pool.end();
//         });
//     });
// });

execute(conn => {
    Promise.all([
        conn.queryAsync(sql1),
        conn.queryAsync(sql2)
    ]).then(result => {
        for (let i = 0; i < result.length; i++) {
            util.log('sql${i+1} = ', r[i].affectedRows);
        }
        conn.commit();
        pool.end();
    }).catch(err => {
        conn.rollback();
        pool.end();
    });
})

function execute(fn) {
    Promise.using(pool.connect(), conn => {
        conn.beginTransaction(txerr => {
            fn(conn);
        });
    });
}

// Promise.using(pool.connect(), conn => {
//     Promise.all([
//         conn.queryAsync(sql1),
//         conn.queryAsync(sql2)
//     ]).then(result => {
//         util.log("End of Then!!!!!!!!!!!!!");
//         util.log("sql1 = ", result[0].affectedRows);
//         util.log("sql2 = ", result[1].affectedRows);
//         pool.end();
//     }).catch(err => {
//         util.log("ERROR~~~!!!!");
//         pool.end();
//     });
// });

// Promise.using(pool.connect(), conn => {
//     conn.queryAsync(sql1)
//         .then(console.log)
//         .catch(err => {
//             util.log("err >>", err);
//         });
//     pool.end();
// });


// Promise.using(pool.connect(), conn => {
//     conn.queryAsync(sql1, (error, result) => {
//         if (error) {
//             throw error;
//         }
//         util.log("sql1 = ", result.affectedRows);
//     });

//     pool.end();
// });