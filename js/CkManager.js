var OBJECT_TO_STRING = Object.prototype.toString,
  BOOLEAN_CLASS = "[object Boolean]",
  NUMBER_CLASS = "[object Number]",
  STRING_CLASS = "[object String]";

function isString(objectToEval) {
  return OBJECT_TO_STRING.call(objectToEval) === STRING_CLASS;
}

function isNumber(objectToEval) {
  return OBJECT_TO_STRING.call(objectToEval) === NUMBER_CLASS;
}

function isBoolean(objectToEval) {
  return OBJECT_TO_STRING.call(objectToEval) === BOOLEAN_CLASS;
}
function setCkManager(CkName, CkValue, expMinutes, CkPath) {
  var d = new Date();
  d.setTime(d.getTime() + expMinutes * 60 * 1000);
  var expires = "expires=" + d.toGMTString();
  document.cookie = CkName + "=" + CkValue + ";" + expires + ";path=" + CkPath +";domain="+window.location.host;
}

function getCk(CkName) {
  var name = CkName + "=";
  var decodedCk = decodeURIComponent(document.cookie);
  var ca = decodedCk.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}
function getConfigs(ck) {
  return ck.CkAuthenticate === window.AUTHENTICATED_USER && ck.CkActive;
}
function validateCkConfig(ckConfigs) {
  var ckConfigsChecked = [];
  for (var CkConfig of ckConfigs) {
    try {
      if (
        isString(CkConfig.CkName) &&
        CkConfig.CkName.length > 0 &&
        isNumber(CkConfig.CkExpirationTimeMinutes) &&
        CkConfig.CkExpirationTimeMinutes > 0 &&
        isString(CkConfig.CkPath) &&
        CkConfig.CkPath.length > 0 &&
        isString(CkConfig.CkClass) &&
        CkConfig.CkClass.length > 0 &&
        isBoolean(CkConfig.CkAuthenticate) &&
        isBoolean(CkConfig.CkEqualPath) &&
        isBoolean(CkConfig.CkActive)
      ) {
        ckConfigsChecked.push(CkConfig);
      }
    } catch (e) {
      console.log("CKConfig type or value error");
    }
  }
  return ckConfigsChecked;
}
function checkCurrentPath() {
  const currentPath = window.location.pathname;
  const validCkConfigs = validateCkConfig(window.CK_SETTER_CONFIG);
  const ckConfigs = validCkConfigs.filter(getConfigs);
  for (var CkConfigChecked of ckConfigs) {
    if (CkConfigChecked.CkEqualPath && currentPath === CkConfigChecked.CkPath) {
      return CkConfigChecked;
    } else if (
      !CkConfigChecked.CkEqualPath &&
      currentPath.includes(CkConfigChecked.CkPath)
    ) {
      return CkConfigChecked;
    }
  }
}
if (window.CK_SETTER_CONFIG) {
  var CkConfig = checkCurrentPath();
  if (CkConfig) {
    if (getCk(CkConfig.CkName)) {
      if(document.querySelector("body").classList &&
      document.querySelector("body").classList.length > 0)
        document.querySelector("body").classList.remove(CkConfig.CkClass);
    } else {
      document.querySelector("body").classList.add(CkConfig.CkClass);
      setCkManager(
        CkConfig.CkName,
        CkConfig.CkAuthenticate,
        CkConfig.CkExpirationTimeMinutes,
        CkConfig.CkPath
      );
    }
  }
}
