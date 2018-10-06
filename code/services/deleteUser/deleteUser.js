function deleteUser(req, resp) {
    var deleteLocationByIDCallback = function (err, data) {
        log(data);
    };

    var deleteEquiptmentIDCallback = function (err, data) {
        log(data);
    };

    var deleteRoleCallback = function (err, data) {
        log(data);
    };

    var deleteAccountCallback = function (err, data) {
        log(data);
    };

    var deleteUserRoleCallback = function (err, data) {
        log(data);
    };

    var deleteUserByIDCallback = function (err, data) {
        if (err) {
            resp.error(data);
        } else {
            resp.success(data);
        }
    };

    getDevToken(req, function (err, devToken) {
        if (err) {
            resp.error("Error im retrieving Dev Token ");
        } else {
            var params = {
                devToken: devToken,
                user_id: req.params.user_id
            };
            //Delete locations and  devices associated with user
            deleteLocationByID(req, params, deleteLocationByIDCallback);
            deleteEquipmentByID(req, params, deleteEquiptmentIDCallback);

            //Delete Role ,account, and user
            deleteAccount(req, params, deleteAccountCallback);
            getAccountID(req, params, function (err, accountId) {
                if (err) {
                    log(err);
                } else {
                    params.accountId = accountId;
                    deleteUserRole(req, params, deleteUserRoleCallback);
                }
            })
            deleteUserByID(req, params, deleteUserByIDCallback);
        }
    });
}
