function deleteEquipment(req, resp) {
    var getCollectionInfoCallback = function (err, equipmentData) {
        if (err) {
            resp.error(err);
        } else {           
            if (equipmentData.user_id === req.userid) {
                deleteEquipmentByID(req,{},deleteEquipmentByIDCallback);               
            } else {
                resp.error("User is not authorized to perform this operation");
            }
        }
    }

    var deleteEquipmentByIDCallback = function(err,data){
        if(err){
            resp.error(data);
        }else{
            resp.success(data);
        }
    }

    var params = {
        collectionName: "equipment",
        queryAttr: "item_id",
        queryVal: req.params.equipment_id
    }
    getCollectionInfo(req, params, getCollectionInfoCallback);
}

