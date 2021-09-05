/**packages */
const CryptoJS = require("crypto-js");
const config = require("config")
const jwt = require("jsonwebtoken")

/**Método de cifrado de información  */

/**Encrypt password */
/**para encriptar hay que instalar npm install crypto-js  var CryptoJS = require("crypto-js");   // Encrypt
var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();*/

exports.encryptedPassword = (password) => {
    let secretKey = config.get("secretKeys").cryptojs;
    console.log(secretKey)
    // Encrypt
    let encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();
    return encryptedPassword;

};

exports.DecryptPassword = (cryptedPassord) => {
    // Decrypt
    let secretKey = config.get("secretKeys").cryptojs;
    var bytes = CryptoJS.AES.decrypt(cryptedPassord, secretKey);
    var originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    return originalPassword;
}

exports.GenerateToken = (user) =>{
    let secretKey = config.get("secretKeys").jwt;
    console.log(user)
    let token = jwt.sign({
        // exp: Math.floor(Date.now() / 1000) + (60 * 60), // hace referencia a los segundos que estan el default
        exp: Math.floor(Date.now() / 1000) + config.get("sessionTime"), 
        data: {
            username: user.username,
            id: user._id,
            role: user.role
            
        }
      }, secretKey);
      return token;
}