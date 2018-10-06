/* function deleteDeviceByNameLib(req, device_name) {
    if (device_name === undefined) {
        device_name = req.params.device_name;
    }
    ClearBlade.init({ request: req });
    var respObj = {};
    var query = ClearBlade.Query();
    query.equalTo('device_name', device_name);
    var deviceCollection = ClearBlade.Collection({ collectionName: "equipment" });
    deviceCollection.remove(query, function (err, data) {
        if (err) {
            respObj.error = "Error in delete Device " + JSON.stringify(data);
        } else {
            respObj.success = data;
        }
    });
    return respObj;
} */

function deleteDeviceByIdLib(req, device_id) {
    if (device_id === undefined) {
        device_id = req.params.equipment_id;
    }
    ClearBlade.init({ request: req });
    var respObj = {};
    var query = ClearBlade.Query();
    query.equalTo('item_id', device_id);
    var deviceCollection = ClearBlade.Collection({ collectionName: "equipment" });
    deviceCollection.remove(query, function (err, data) {
        if (err) {
            respObj.error = "Error in delete Device " + JSON.stringify(data);
        } else {
            respObj.success = data;
        }
    });
    return respObj;
}

function deleteLocationLib(req, locationId) {
    if (locationId === undefined) {
        locationId = req.params.locationId;
    }
    var respObj = {};
    ClearBlade.init({ request: req });
    var devicequery = ClearBlade.Query();
    devicequery.equalTo('location_id', locationId);
    //devicequery.equalTo('user_id', req.userid);
    var deviceCollection = ClearBlade.Collection({ collectionName: "equipment" });
    deviceCollection.remove(devicequery, function (err, data) {
        if (err) {
            respObj.error = "Error in delete Device " + JSON.stringify(data);
        } else {
            respObj.success = data;
        }
    });
    var locQuery = ClearBlade.Query();
    locQuery.equalTo('item_id', locationId);
    var locationCollection = ClearBlade.Collection({ collectionName: "location" });
    locationCollection.remove(locQuery, function (err, data) {
        if (err) {
            respObj.error = "Delete Location error : " + JSON.stringify(data);
        } else {
            respObj.success = data;
        }
    });
    return respObj;
}


function deleteUserLib(req,devToken) {
    ClearBlade.init({ request: req });
    var options = {};
    var respObj = {};
    //var loginAdminData = {};
    var accountId;
    var requestObject = ClearBlade.http().Request();
    //1) Get account ID
    var user = ClearBlade.User();
    var query = ClearBlade.Query();
    query.equalTo("user_id", req.params.user_id);
    user.allUsers(query, function (err, data) {
        if (err) {
            respObj.error = JSON.stringify(data);
        } else {
            if (data.Data.length > 0) {               
                accountId = data.Data[0].account_id;
            }
        }
    });
    //Delete User Role
    if (accountId !== undefined) {
        options.uri = endPoint.URI + endPoint.deleteUserRole.
            replace("{systemKey}", req.systemKey).
            replace("{userRole}", accountId);
        log(options.uri);
        options.headers = {
            "Content-Type": "application/json",
            "ClearBlade-DevToken": devToken
        };
        requestObject.delete(options, function (err, roleData) {
            if (err) {
                log("Error in deleting role " + JSON.stringify(roleData));
            } else {
                log("Role Deleted successfully");
            }
        });
    } else {
        log("Account ID does not exists");
    }

    //Delete locations and  devices associated with user
    var locQuery = ClearBlade.Query();
    locQuery.equalTo('user_id', req.params.user_id + "");
    var locationCollection = ClearBlade.Collection({ collectionName: "location" });
    locationCollection.fetch(locQuery, function (err, locationList) {
        if (err) {
            log("Error in retriving Locations " + JSON.stringify(locationList));
        } else {
            for (var i = 0; i < locationList.DATA.length; i++) {
                var obj = deleteLocationLib(req, locationList.DATA[i].item_id);
                if (obj.error) {
                    log(obj.error)
                }else{
                    log("Location and equipment Deleted successfully");
                }
            }
        }
    });

    //Delete User
    options.uri = endPoint.URI + endPoint.deleteUser.
        replace("{systemKey}", req.systemKey).
        replace("{user_id}", req.params.user_id);
    options.headers = {
        "Content-Type": "application/json",
        "ClearBlade-DevToken": devToken
    };
    requestObject.delete(options, function (err, userData) {
        if (err) {
            respObj.error = JSON.stringify(userData);
        } else {
            respObj.success = userData;
        }
    });
    return respObj;
}



