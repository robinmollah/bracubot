const rbmq = require('amqplib/callback_api');

let connection = null;
rbmq.connect("amqp://localhost", function(err0, conn) {
    if(err0){
        console.error("Error", err0);
        throw err0;
    }
    connection = conn;
    conn.createChannel(function(err1, ch) {
        if(err1){
            console.error("Error", err1);
            throw err1;
        }
        ch.assertQueue("hello");
        ch.sendToQueue("hello", new Buffer("Hello World!"));
        console.log(" [x] Sent 'Hello World!'");
    });
});

setTimeout(function() {
    connection.close();
}, 10 * 1000);
