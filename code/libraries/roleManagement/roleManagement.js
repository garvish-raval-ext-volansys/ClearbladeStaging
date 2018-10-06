function addNewRole(req, params, callback) {
    ClearBlade.init({ request: req });
    var getDevUpdateRoleTokenCallback = function (err, tokenData) {
        var requestObject = ClearBlade.http().Request();
        var options = {
            uri: endPoint.URI + endPoint.createUserRole.replace("{systemKey}", req.systemKey),
            body: params,
            headers: {
                "Content-Type": "application/json",
                "ClearBlade-DevToken": tokenData
            },
            timeout: endPoint.timeout
        };
        requestObject.post(options, function (err, roleInfo) {
            if (err) {
                callback(err, roleInfo);
            } else {
                roleInfo = JSON.parse(roleInfo);
                roleInfo.tokenData = tokenData;
                callback(err, roleInfo);
            }

        });
    }
    getDevToken(req, getDevUpdateRoleTokenCallback);
}

function updateRole(req, deviceId, params, callback) {
    var devToken;
    var getDevUpdateRoleTokenCallback = function (err, deviceRoleData) {
        if (err) {
            callback(err, deviceRoleData);
        } else {
            deviceRoleData = JSON.parse(deviceRoleData)
            deviceRoles = deviceRoleData["roles"]
            for (var k in deviceRoles) {
                deviceColData = deviceRoles[k]
                if (deviceColData["Name"] == deviceId) {
                    roleId = deviceColData["ID"]
                    topicPermission = deviceColData["Permissions"]["Topics"]
                    ClearBlade.init({ request: req });
                    var requestObject = ClearBlade.http().Request();
                    roleParams = params
                    roleParams.id = roleId
                    for (var t in topicPermission) {
                        roleParams.changes.topics.push({ "permissions": 3, "itemInfo": { "name": topicPermission[t]["Name"] } })
                    }
                    var options = {
                        uri: endPoint.URI + endPoint.createUserRole.replace("{systemKey}", req.systemKey),
                        body: roleParams,
                        headers: {
                            "Content-Type": "application/json",
                            "ClearBlade-DevToken": devToken
                        },
                        timeout: endPoint.timeout
                    }
                    requestObject.put(options, function (err, roleInfo) {
                        if (err) {
                            callback(err, roleInfo);
                        } else {
                            callback(false, roleInfo);
                        }
                    });
                    break;
                }
            }
            callback(false, deviceRoleData);
        }
    }

    var getDevTokenCallback = function (err, tokenData) {
        if (err) {
            callback(err, tokenData);
        } else {
            devToken = tokenData
            getRoleForDevice(req, deviceId, devToken, getDevUpdateRoleTokenCallback)
        }
    }
    getDevToken(req, getDevTokenCallback)
}

//Need to change name to updateRole
function assignRoleToUser(req, params, callback) {
    ClearBlade.init({ request: req });
    var requestObject = ClearBlade.http().Request();
    var options = {
        uri: endPoint.URI + endPoint.updateUserRole.replace("{systemKey}", req.systemKey),
        body: params.userRole,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "ClearBlade-DevToken": params.devToken
        },
        timeout: endPoint.timeout
    };
    requestObject.put(options, function (err, roleData) {
        callback(err, roleData);
    });
}

function assignRoleToDevice(req, params, callback) {
    var assignRoleCallback = function (err, tokenData) {
        ClearBlade.init({ request: req });
        var requestObject = ClearBlade.http().Request();
        var options = {
            uri: endPoint.URI + endPoint.updateDeviceRole.replace("{systemKey}", req.systemKey).replace("{deviceName}", params.deviceId),
            body: params.deviceRole,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "ClearBlade-DevToken": tokenData
            },
            timeout: endPoint.timeout
        };
        requestObject.put(options, function (err, roleData) {
            callback(err, roleData);
        });
    }
    getDevToken(req, assignRoleCallback)
}

function getRoleForDevice(req, deviceId, devToken, callback) {
    ClearBlade.init({ request: req });
    var requestObject = ClearBlade.http().Request();
    var options = {
        uri: endPoint.URI + endPoint.updateDeviceRole.replace("{systemKey}", req.systemKey).replace("{deviceName}", deviceId),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "ClearBlade-DevToken": devToken
        },
        timeout: endPoint.timeout
    };
    requestObject.get(options, function (err, roleData) {
        callback(err, roleData);
    });
}

function deleteUserRole(req, params, callback) {
    ClearBlade.init({ request: req });
    var options = {};
    var requestObject = ClearBlade.http().Request();
    var accountId = params.accountId;
    if (accountId !== undefined) {
        options.uri = endPoint.URI + endPoint.deleteUserRole.
            replace("{systemKey}", req.systemKey).
            replace("{userRole}", accountId);
        options.headers = {
            "Content-Type": "application/json",
            "ClearBlade-DevToken": params.devToken
        };
        requestObject.delete(options, function (err, roleData) {
            if (err) {
                log("Error in deleting role " + JSON.stringify(roleData));
            } else {
                log("Role Deleted successfully");
            }
        });
    } else {
        log("User is not associated with account");
    }

}