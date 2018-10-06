function addLocation(req, params, callback) {
    ClearBlade.init({ request: req });
    var locationCollection = ClearBlade.Collection({ collectionName: "location" });
    locationCollection.create(params, function (err, locationData) {
        if (err) {
            callback(err, locationData);
        } else {
            if (locationData.length > 0) {
                callback(false, {
                    "location_id": locationData[0].item_id,
                });
            } else {
                callback(true, "Bad Request");
            }
        }
    });
}

function updateLocationByID(req, changes, callback) {
    ClearBlade.init({ request: req });
    var query = ClearBlade.Query();
    query.equalTo('item_id', req.params.locationId);
    var locationCollection = ClearBlade.Collection({ collectionName: "location" });
    locationCollection.fetch(query, function (err, data) {
        if (err) {
            callback(err, data);
        } else {
            if (data.DATA && data.DATA.length > 0) {
                locationCollection.update(query, changes, function (err, data) {
                    callback(err, data);
                });
            } else {
                callback(true, "Location with given ID does not exist");
            }
        }
    });

}


function deleteLocationByID(req, params, callback) {
    ClearBlade.init({ request: req });
    var locQuery = ClearBlade.Query();
    if (!isEmptyString(params.locationId)) {
        locQuery.equalTo('item_id', params.locationId);
        locQuery.equalTo('user_id', req.userid);
    } else if (!isEmptyString(params.user_id)) {
        locQuery.equalTo('user_id', params.user_id);
    }
    var locationCollection = ClearBlade.Collection({ collectionName: "location" });
    locationCollection.remove(locQuery, function (err, data) {
        if (err) {
            callback(err, "Error in deleting location " + JSON.stringify(data));
        } else {
            callback(err, data);
        }
    });
}

function getLocations(req, callback) {
    ClearBlade.init({ request: req });
    var locationCollection = ClearBlade.Collection({ collectionName: "location" });
    var query = ClearBlade.Query();
    query.equalTo('user_id', req.userid);
    if (req.params.locationId && req.params.locationId.length > 0) {
        query.equalTo('item_id', req.params.locationId);
    }
    locationCollection.fetch(query, function (err, locationData) {
        if (err) {
            callback(err, "fetch error : " + JSON.stringify(locationData));
        } else {
            callback(err, locationData.DATA);
        }
    });
}