function getEquipment(req, resp) {
  if (isEmptyString(req.userid)) {
    resp.error("Access is denied. User is unauthorized.");
  }
  else {
    getEquipmentsByID(req, function (err, equipmentData) {
      if (err) {
        resp.error(equipmentData);
      } else {
        resp.success(equipmentData);
      }
    });
  }
}
