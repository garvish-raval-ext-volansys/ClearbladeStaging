function getUserInfo(req, resp) {
  getUser(req,function (err, userData) {
    if (err) {
      resp.error(userData);
    } else {
      userData.temperatureDisplayUnit = 'Fahrenheit';
      resp.success(userData);
    }
  })
}