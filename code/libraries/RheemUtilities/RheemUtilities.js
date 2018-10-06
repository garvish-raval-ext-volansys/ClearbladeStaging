var userTableCol = ["email", "password", "phone_number"];
var equipmentDBCollection = "equipments"
var endPoint = {
    "URI": "https://rheem.clearblade.com/",
    "timeout": 30000,
    "admin": {
        "email": "garvish.raval@rheem.com",
        "password": "garvish123"
    },
    "regUser": "api/v/1/user/reg",
    "adminAuth": "admin/auth",
    "deviceAuth" : "api/v/2/devices/{systemKey}/auth",
    "createUserRole": "admin/user/{systemKey}/roles",
    "updateUserRole": "admin/user/{systemKey}",
    "createDevice": "admin/devices/{systemKey}/{name}",
    "updateDeviceRole": "admin/devices/roles/{systemKey}/{deviceName}",
    "deleteUserRole" : "admin/user/{systemKey}/roles?role={userRole}",
    "deleteUser" : "admin/user/{systemKey}?user={user_id}"
};
function isEmptyString(obj) {
    if (obj == null || obj == undefined || typeof obj != 'string' || obj == "") {
        return true;
    } else {
        return false;
    }
}
function isEmptyArray(array) {
    if (!(array instanceof Array) || array.length == 0) {
        return true
    } else {
        return false;
    }
}
function isEmptyObject(obj) {
    if (typeof obj !== 'object') {
        return true;
    }
    for (var keys in obj) {
        return false;
    }
    return true;
}

function isValidMAC(mac) {
    if (typeof mac != "string") {
        return false;
    }
    if (mac.indexOf(':') !== -1) {
        mac = mac.replace(/:/g, "");
    }
    else {
        mac = mac.replace(/-/g, "");
    }
    if (mac.length === 12) {
        var result = [], i, len, n = 2;
        for (i = 0, len = mac.length; i < len; i += n) {
            result.push(mac.substr(i, n));
        }
        mac = result.join('-');
        var pattern = /^([0-9a-fA-F][0-9a-fA-F]:){5}([0-9a-fA-F][0-9a-fA-F])$/;
        return pattern.test(mac);
    } else {
        return false;
    }
}
function econetAddressToProduct(econetAddress) {
    var type;
    if (econetAddress >= 4160 && econetAddress <= 4223) { type = "tanklessWaterHeater"; }
    else if (econetAddress >= 4096 && econetAddress <= 4159) { type = "heatpumpWaterHeaterGen4"; }
    else if (econetAddress >= 1088 && econetAddress <= 1151) { type = "gasWaterHeater"; }
    else if (econetAddress >= 896 && econetAddress <= 959)   { type = "econetControlCenter"; }
    else if (econetAddress >= 832 && econetAddress <= 895) { type = "econetWiFiTranslator"; }
    else if (econetAddress >= 704 && econetAddress <= 767) { type = "electricWaterHeater"; }
    else if (econetAddress >= 512 && econetAddress <= 575) { type = "econetControlCenter"; }
    else if (econetAddress >= 320 && econetAddress <= 383) { type = "heatpumpWaterHeaterGen1"; }
    else if (econetAddress >= 4544 && econetAddress <= 4607) { type = "tritonWaterHeater"; }
    else if (econetAddress >= 4608 && econetAddress <= 4672) { type = "hotspringWaterHeater"; }
    return type;
}

function guidGenerator() {
    return Math.random().toString().slice(2);
}

/* function isValidPhoneNumber(phoneNo) {
    var phoneNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return phoneNum.test(phoneNo);
} */

function parseFloat(str, radix)
{
    var parts = str.split(".");
    if ( parts.length > 1 )
    {
            return parseInt(parts[0], radix) + parseInt(parts[1], radix) / Math.pow(radix, parts[1].length);
    }
    return parseInt(parts[0], radix);
}

function parseFloat(str) {
  var float = 0, sign, order, mantiss,exp,
      int = 0, multi = 1;
  if (/^0x/.exec(str)) {
    int = parseInt(str,16);
  }else{
    for (var i = str.length -1; i >=0; i -= 1) {
      if (str.charCodeAt(i)>255) {
        console.log('Wrong string parametr'); 
        return false;
      }
      int += str.charCodeAt(i) * multi;
      multi *= 256;
    }
  }
  sign = (int>>>31)?-1:1;
  exp = (int >>> 23 & 0xff) - 127;
  mantissa = ((int & 0x7fffff) + 0x800000).toString(2);
  for (i=0; i<mantissa.length; i+=1){
    float += parseInt(mantissa[i])? Math.pow(2,exp):0;
    exp--;
  }
  return float*sign;
}