function checkJsonKey(json, key) {
    for (var i = 0; i < Object.keys(json).length; i++) {
        if (Object.keys(json)[i] == key) {
            return true;
        }
    }

    return false;
}

function createToken(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function delInjection(string) {
    if (string === null) {
      return 'null';
    }

    if (string[string.length-1] == '"' || string[string.length-1] == "'" || string[string.length-1] == '`') {
        string = string.substring(0, string.length - 1) 
    }

    if (string[string.length-string.length+1] == '"' || string[string.length-string.length+1] == "'" || string[string.length-string.length+1] == '`') {
        string = string.substring(1) 
    }
    return string;
}

function generateCode() {
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
}

function removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }

export default {checkJsonKey, createToken, delInjection, removeItemAll, generateCode};