function getCollectionInfo(req, params ,callback) {
    ClearBlade.init({ request: req });
    var query = ClearBlade.Query();
    query.equalTo(params.queryAttr, params.queryVal);
    var collection = ClearBlade.Collection({ collectionName: params.collectionName });
    collection.fetch(query, function (err, data) {
        if(err){
            callback(err,data);
        }else{
            if(data.DATA.length > 0){
            callback(err,data.DATA[0]);
            }else{
                callback(true, params.collectionName +":  Item does not exist");
            }
        }
    });
}