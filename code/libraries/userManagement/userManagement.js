function registerNewUser(req, callback) {
    ClearBlade.init({ request: req });
    var requestObject = ClearBlade.http().Request();
    var options = {
        uri: endPoint.URI + endPoint.regUser,
        body: req.params,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "ClearBlade-SystemKey": req.systemKey,
            "ClearBlade-SystemSecret": req.systemSecret,
            "ClearBlade-UserToken": req.userToken
        },
        timeout: endPoint.timeout
    };
    requestObject.post(options, function (err, data) {
        if (err) {
            callback(err, data);
        } else {
            callback(false, JSON.parse(data));
        }
    });
}

function createAccount(req, params, callback) {
    ClearBlade.init({ request: req });
    var query = ClearBlade.Query();
    query.equalTo("user_id", params.user_id);
    var user = ClearBlade.User();
    user.setUsers(query, { 'account_id': params.account_id });
    var collection = ClearBlade.Collection({ "collectionName": 'account' });
    collection.create(params, function (err, data) {
        if (err) {
            callback(err, data);
        } else {
            callback(false, params);
        }
    });
}

function getDevToken(req, callback) {
    ClearBlade.init({ request: req });
    var requestObject = ClearBlade.http().Request();
    var options = {
        uri: endPoint.URI + endPoint.adminAuth,
        body: {
            "email": endPoint.admin.email,
            "password": endPoint.admin.password
        },
        headers: {},
        timeout: endPoint.timeout
    };
    requestObject.post(options, function (err, adminData) {
        if (err) {
            callback(err, adminData);
        } else {
            var data = JSON.parse(adminData)
            callback(false, data.dev_token);
        }
    });
}

function getUser(req, callback) {
    ClearBlade.init({ request: req });
    var user = ClearBlade.User();
    user.getUser(function (err, userData) {
        callback(err, userData);
    });
}

function getAccountID(req, params, callback) {
    ClearBlade.init({ request: req });
    var user = ClearBlade.User();
    var query = ClearBlade.Query();
    query.equalTo("user_id", params.user_id);
    user.allUsers(query, function (err, data) {
        if (err) {
            callback(err, JSON.stringify(data));
        } else {
            if (data.Data && data.Data.length > 0) {
                callback(err,data.Data[0].account_id);
            }else{
                callback(true,"User ID does not exists");
            }
        }
    });

}


function deleteAccount(req, params, callback) {
    ClearBlade.init({ request: req });
    var accountCollection = ClearBlade.Collection({ "collectionName": 'account' });
    var query = ClearBlade.Query();
    query.equalTo("user_id", params.user_id);
    accountCollection.remove(query, function (err, data) {
        if (err) {
            callback(err, "Error in deleting Account " + JSON.stringify(data));
        } else {
            callback(err, "Account deleted successfully " + JSON.stringify(data));
        }
    });
}

function deleteUserByID(req, params, callback) {
    ClearBlade.init({ request: req });
    var options = {};    
    var requestObject = ClearBlade.http().Request();
    //Delete User
    options.uri = endPoint.URI + endPoint.deleteUser.
        replace("{systemKey}", req.systemKey).
        replace("{user_id}", params.user_id);
    options.headers = {
        "Content-Type": "application/json",
        "ClearBlade-DevToken": params.devToken
    };
    requestObject.delete(options, function (err, userData) {
        if (err) {
            callback(err, "Error in deleting User " + JSON.stringify(userData));
        } else {
            callback(err, userData);
        }
    });
}

function isUserExist(req, params, callback) {
    ClearBlade.init({ request: req });
    var user = ClearBlade.User();
    var query = ClearBlade.Query();
    query.equalTo("user_id", params.userId);
    user.allUsers(query, function (err, userData) {
        if (err) {
            callback(err, userData);
        } else {
            if (userData.Total > 0) {
                callback(false, true);
            } else {
                callback(true, "User ID is not valid or does not exists");
            }
        }
    });
}

function updateUserData(req, params, callback) {
    ClearBlade.init({ request: req });
    var user = ClearBlade.User();
    var query = ClearBlade.Query();
    query.equalTo("user_id", params.userId);
    user.setUsers(query, params.changes, function (err, data) {
        callback(err, data);
    });
}


