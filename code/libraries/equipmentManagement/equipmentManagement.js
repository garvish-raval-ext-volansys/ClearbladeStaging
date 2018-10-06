function getDeviceByName(req, deviceName, callback) {
    ClearBlade.init({ request: req });
    ClearBlade.getDeviceByName(deviceName, function (err, deviceData) {
        if (err) {
            callback(err, "Unable to get device");
        } else {
            callback(false, deviceData)
        }
    });
}

function addDevice(req, params, callback) {
    ClearBlade.init({ request: req });
    ClearBlade.createDevice(params.name, params, false, function (err, deviceData) {
        if (err) {
            callback(err, "Unable to create device: " + JSON.stringify(deviceData));
        } else {
            callback(false, deviceData);
        }
    });
}

function updateDeviceDetails(req, params, callback) {
    ClearBlade.init({ request: req });
    var device = ClearBlade.Device();
    var query = ClearBlade.Query();
    query.equalTo("name", params.name);
    device.fetch(query, function (err, deviceData) {
        if (err) {
            callback(err, deviceData);
        } else {
            if (deviceData && deviceData.length > 0) {
                if (deviceData[0].user_id === req.userid) {
                    device.update(query, params.changes, function (err, data) {
                        if (err) {
                            callback(err, data);
                        } else {
                            callback(false, data);
                        }
                    });
                } else {
                    callback(true, "User is not authorized to perform this operation");
                }
            } else {
                callback(true, "Device not exists");
            }
        }
    });
}

function updateDeviceConnected(req, query, callback) {
    ClearBlade.init({ request: req });
    var device = ClearBlade.Device();
    var equipment_query = ClearBlade.Query();
    equipment_query.equalTo("name", query.name);
    var change = {
        "connected": true,
        "last_connected_date": Date.now()
    }
    device.update(equipment_query, change, function (err, data) {
        if (err) {
            callback(err, data);
        } else {
            callback(false, data);
        }
    });
}

function updateDeviceDisConnected(req, query, callback) {
    ClearBlade.init({ request: req });
    var device = ClearBlade.Device();
    var equipment_query = ClearBlade.Query();
    equipment_query.equalTo("name", query.name);
    var change = {
        "connected": false,
        "last_disconnected_date": Date.now()
    }
    device.update(equipment_query, change, function (err, data) {
        if (err) {
            callback(err, data);
        } else {
            callback(false, data);
        }
    });
}

function getEquipmentsByID(req, callback) {
    ClearBlade.init({ request: req });
    var query = ClearBlade.Query();
    query.equalTo("user_id", req.userid);
    if (!isEmptyString(req.params.equipmentId)) {
        query.equalTo("item_id", req.params.equipmentId);
    }
    var collection = ClearBlade.Collection({ collectionName: equipmentDBCollection });
    collection.fetch(query, function (err, equipmentData) {
        if (err) {
            callback(err, equipmentData);
        } else {
            if (!isEmptyString(req.params.equipmentId) && equipmentData.DATA.length > 0) {
                callback(false, equipmentData.DATA[0]);
            } else {
                callback(false, equipmentData.DATA);
            }
        }
    });
}

function getEquipmentsByDeviceInfo(req, query, callback) {
    ClearBlade.init({ request: req });
    var collection = ClearBlade.Collection({ "collectionName": equipmentDBCollection });
    var equipment_query = ClearBlade.Query();

    if (!isEmptyString(query.item_id)) {
        equipment_query.equalTo("item_id", query.item_id);
    }
    if (!isEmptyString(query.locationId)) {
        equipment_query.equalTo('location_id', query.locationId);
    }
    if (!isEmptyString(query.device_name)) {
        equipment_query.equalTo("device_name", query.device_name);
    } 
    if (!isEmptyString(query.mac_address)) {
        equipment_query.equalTo('mac_address', query.mac_address);
    } 
    if (query.device_address) {
        equipment_query.equalTo('device_address', query.device_address);
    }
    if (!isEmptyString(query.serial_number)) {
        equipment_query.equalTo("serial_number", query.serial_number);
    } 
    if (!isEmptyString(query.sw_version)) {
        equipment_query.equalTo("sw_version", query.sw_version);
    } 
    if (!isEmptyString(query.device_type)) {
        equipment_query.equalTo("device_type", query.device_type);
    }
    collection.fetch(equipment_query, function (err, data) {
        if (err) {
            callback(err, data)
        } else {
            var data_return = {
                "TOTAL": data["TOTAL"],
                "DATA": []
            }
            for (var k in data["DATA"]) {
                data_return["DATA"][k] = data["DATA"][k]._document;
            }
            callback(false, data_return);
        }
    });
}

function createEquipment(req, equipmentData, callback) {
    ClearBlade.init({ request: req });
    var collection = ClearBlade.Collection({ "collectionName": equipmentDBCollection });
    collection.create(equipmentData, function (err, data) {
        if (err) {
            callback(err, data)
        } else {
            callback(false, data);
        }
    });
}

function updateEquipmentsByDeviceInfo(req, updateData, query, callback) {
    ClearBlade.init({ request: req });
    var collection = ClearBlade.Collection({ "collectionName": equipmentDBCollection });
    var equipment_query = ClearBlade.Query();

    if (!isEmptyString(query.device_name)) {
        equipment_query.equalTo("device_name", query.device_name);
    } 
    if (!isEmptyString(query.mac_address)) {
        equipment_query.equalTo('mac_address', query.mac_address);
    } 
    if (query.device_address) {
        equipment_query.equalTo('device_address', query.device_address);
    }
    if (!isEmptyString(query.serial_number)) {
        equipment_query.equalTo("serial_number", query.serial_number);
    } 
    if (!isEmptyString(query.sw_version)) {
        equipment_query.equalTo("sw_version", query.sw_version);
    } 
    if (!isEmptyString(query.device_type)) {
        equipment_query.equalTo("device_type", query.device_type);
    }
    collection.update(equipment_query, updateData, function (err, data) {
        if (err) {
            callback(err, data)
        } else {
            callback(false, data);
        }
    });
}

function deleteEquipmentByID(req, params, callback) {
    ClearBlade.init({ request: req });
    var devicequery = ClearBlade.Query();

    if (!isEmptyString(req.params.item_id)) {
        devicequery.equalTo("item_id", req.params.item_id);
        devicequery.equalTo("user_id", req.userid);
    } else if (!isEmptyString(params.locationId)) {
        devicequery.equalTo('location_id', params.locationId);
        devicequery.equalTo("user_id", req.userid);
    } else if (!isEmptyString(params.user_id)) {
        devicequery.equalTo('user_id', params.user_id);
    }
    var deviceCollection = ClearBlade.Collection({ collectionName: equipmentDBCollection });
    deviceCollection.remove(devicequery, function (err, data) {
        if (err) {
            callback(err, "Error in delete Equipment " + JSON.stringify(data));
        } else {
            callback(err, "Successfully deleted Equipment " + JSON.stringify(data));
        }
    });
}
