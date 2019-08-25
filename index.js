const express = require('express'),
    app = express(),
    util = require('util');

const Pool = require('./pool'),
    Mydb = require('./mydb');

const testJson = require('./test/test.json');

const pool = new Pool();

app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/test/:email', (req, res) => {
    testJson.email = req.params.email;
    testJson.aa = req.query.aa;
    res.json(testJson);
});

app.get('/dbtest/:name', (req, res) => {
    let name = req.params.name;
    let mydb = new Mydb(pool);
    mydb.execute(conn => {
        conn.query("select * from node_test where name=?", [name], (err, result) => {
            res.json(result);
        });
    });
});

const server = app.listen(3000, function () {
    console.log("Express's started on port 3000");
});

const io = require('socket.io').listen(server, {
    log: false,
    origins: '*:*',
    pingInterval: 3000,
    pingTimeout: 5000
});

io.sockets.on('connection', (socket, option) => {
    socket.emit('message', {
        msg: "Welcome " + socket.id
    });

    util.log("connection>>", socket.id, socket.handshake.query);

    socket.on('join', (roomId, fn) => {
        socket.join(roomId, () => {
            util.log("Join", roomId, Object.keys(socket.rooms));
        });
        if (fn) {
            fn();
        }
    });

    socket.on('leave', (roomId, fn) => {
        socket.leave(roomId, () => {
            if (fn) {
                fn();
            }
        });
    });

    socket.on('rooms', (fn) => {
        if (fn) {
            fn(Object.keys(socket.rooms));
        }
    });

    socket.on('message', (data, fn) => {
        util.log("message >> ", data.msg, Object.keys(socket.rooms));
        if (fn) {
            fn(data.msg);
        }
        socket.broadcast.to(data.room).emit('message', {
            room: data.room,
            msg: data.msg
        });
    });

    socket.on('disconnecting', (data) => {
        util.log("disconnecting>>", socket.id);
    });

    socket.on('disconnect', (data) => {
        util.log('disconnect>>>', socket.id, Object.keys(socket.rooms));
    })
});