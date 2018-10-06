function createLocation(req, resp) {
  var location = {
    city: req.params.city,
    state: req.params.state,
    name: req.params.name,
    zipcode: req.params.zipcode,
    timezonegmtoffset: req.params.timezonegmtoffset,
    user_id: req.userid,
    account_id: ''
  };  
  var getUserCallback = function (err, userData) {
    if (err) {
      resp.error(userData);
    } else {
      if (!isEmptyObject(userData) && !isEmptyString(userData.account_id)) {
        location.account_id = userData.account_id;
        addLocation(req, location, addLocationCallback);
      } else {
        resp.error("User not associated with an account");
      }
    }
  }
  var addLocationCallback = function (err, locationData) {
    if (err) {
      resp.error(locationData);
    } else {
      resp.success(locationData);
    }
  }
  getUser(req, getUserCallback);

}
