function getLocation(req, resp) {
    ClearBlade.init({ request: req });
    var getCollectionInfoCallback = function (err, locationData) {
        if (err) {
            resp.error(locationData);
        } else {
            if (locationData.user_id === req.userid) {
                getLocations(req, getLocationsCallback);
            } else {
                resp.error("User is not authorized to perform this operation");
            }
        }
    }

    var getLocationsCallback = function (err, locData) {
        if (err) {
            resp.error(locData);
        } else {
            var respObj = [];
            for (var loc = 0; loc < locData.length; loc++) {
                var query = {
                    "locationId": locData[loc].item_id
                }
                getEquipmentsByDeviceInfo(req, query, function (err, equiptmentDetails) {
                    if (err) {
                        resp.error(equiptmentDetails);
                    } else {
                        respObj.push(Object.assign(locData[loc], { equiptmentDetails }));
                    }
                });
            }
            resp.success(respObj);
        }
    }


    if (req.params.locationId && req.params.locationId.length > 0) {
        var params = {
            collectionName: "location",
            queryAttr: "item_id",
            queryVal: req.params.locationId
        }
        getCollectionInfo(req, params, getCollectionInfoCallback);
    } else {
        getCollectionInfoCallback(false, { user_id: req.userid });
    }
}
