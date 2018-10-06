function createNewDevice(req, resp) {
	var newDevice, accountId, deviceId, activeKey, deviceType, devToken;
	var getUserCallback = function (err, userData) {
		if (err) {
			resp.error(userData);
		} else {
			if (!isEmptyObject(userData) && !isEmptyString(userData.account_id)) {
				if (!isEmptyString(req.params.locationId)) {
					getLocations(req, function (err, data) {
						if (err) {
							resp.error(data);
						} else {
							if (data.length > 0) {
								//2) Add new device and set account id
								accountId = userData.account_id;
								deviceId = guidGenerator();
								activeKey = guidGenerator();
								deviceType = "econetWiFiTranslator";
								newDevice = {
									"name": deviceId,
									"location_id": req.params.locationId,
									"type": deviceType,
									"allow_key_auth": true,
									"active_key": activeKey,
									"enabled": true,
									"allow_certificate_auth": false,
									"user_id": req.userid,
									"account_id": accountId,
									"state": "",
									"description": req.params.displayName
								};
								addDevice(req, newDevice, addDeviceCallback);
							} else {
								resp.error("Location ID does not exists or not associated to user");
							}
						}
					});
				} else {
					resp.error("Please Provide Location ID");
				}
			} else {
				resp.error("User not associated with an account");
			}
		}
	}
	var addDeviceCallback = function (err, deviceData) {
		if (err) {
			resp.error("Unable to create device: " + JSON.stringify(deviceData))
		} else {
			newDevice = Object.assign(deviceData, newDevice);
			var newRole = {
				"name": deviceId,
				"description": "Device Role for - " + deviceId,
				"collections": [],
				"topics": [],
				"services": []
			};
			/*3) Create new role using device id*/
			addNewRole(req, newRole, addNewRoleCallback)
		}
	}

	var addNewRoleCallback = function (err, roleInfo) {
		if (err) {
			resp.error(err);
		} else {
			devToken = roleInfo.tokenData;
			var deviceRole = {
				"add": [deviceId],
				"delete": []
			};
			/* 4) Set device role*/
			assignRoleToDevice(req, {
				deviceId: deviceId,
				deviceRole: deviceRole,
				devToken: devToken
			}, assignRoleToDeviceCallback);
		}
	}
	var assignRoleToDeviceCallback = function (err, updatedInfo) {
		if (err) {
			resp.error(err);
		} else {
			resp.success({
				"name": newDevice.name,
				"location_id": newDevice.location_id,
				"type": newDevice.type,
				"active_key": newDevice.active_key,
				"enabled": newDevice.enabled,
				"user_id": newDevice.user_id,
				"account_id": newDevice.account_id,
				"description": newDevice.description
			});
		}
	}
	//1) Get account id of user
	getUser(req, getUserCallback);
}