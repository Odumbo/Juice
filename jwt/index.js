const jwt = require('jsonwebtoken');

const tokens = "tokentoken";

function encodeData(data){
const encoded = jwt.sign(data, tokens);
return encoded;

}

function decodeData (encodeData){
const data = jwt.verify(encodeData,tokens);
return data;
}
module.exports = {
    encodeData,
    decodeData
}