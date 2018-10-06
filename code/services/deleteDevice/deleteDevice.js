function deleteDevice(req, resp) {
    var getCollectionInfoCallback = function (err, equipmentData) {
        if (err) {
            resp.error(err);
        } else {
            
            if (equipmentData.user_id === req.userid) {
                var obj = deleteDeviceByIdLib(req);
                if (obj.error) {
                    resp.error(obj.error);
                } else {
                    resp.success(obj.success);
                }
            } else {
                resp.error("User is not authorized to perform this operation");
            }
        }
    }
    var params = {
        collectionName: "equipment",
        queryAttr: "item_id",
        queryVal: req.params.equipment_id
    }
    getCollectionInfo(req, params, getCollectionInfoCallback);
}
