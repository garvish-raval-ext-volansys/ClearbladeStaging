function deleteLocation(req, resp) {
    var getCollectionInfoCallback = function (err, locationData) {
        if (err) {
            resp.error(err);
        } else {
            if (locationData.user_id === req.userid) {
                var params = {
                    "locationId": req.params.locationId
                }
                deleteEquipmentByID(req, params, deleteEquipmentByIDCallback);
                deleteLocationByID(req, params, deleteLocationByIDCallback);

            } else {
                resp.error("User is not authorized to perform this operation");
            }
        }
    }

    var deleteLocationByIDCallback = function (err, data) {
        if (err) {
            resp.error(data);
        } else {
            resp.success(data);
        }
    }

    var deleteEquipmentByIDCallback = function (err, data) {
        if (err) {
            log(data);
        } else {
            log(data);
        }
    }

    var params = {
        collectionName: "location",
        queryAttr: "item_id",
        queryVal: req.params.locationId
    }
    getCollectionInfo(req, params, getCollectionInfoCallback);
}
