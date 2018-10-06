function publishMesage(req, topic, jsonMsg) {
    ClearBlade.init({
        systemKey: req.systemKey,
        systemSecret: req.systemSecret,
        email: endPoint.admin.email,
        password: endPoint.admin.password,
        callback: function(err, body) {
            if(err) {
                log("initialization error " + JSON.stringify(body))
                resp.error("initialization error " + JSON.stringify(body));
            } else {
                var msg = ClearBlade.Messaging();
                msg.publish(topic, jsonMsg, 2);
            }
        }
    });
}