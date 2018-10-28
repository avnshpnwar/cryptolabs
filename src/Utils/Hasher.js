import CryptoJS from 'crypto-js'
import Converter from './Converter'
import HashAlgo from '../Constants/HashAlgo'
import HashFormat from '../Constants/HashFormat'
import Logger from './Logger'

let LOGGERNAME = 'Hasher'
const getHashValue = (uint8Array, hashAlgo, hashFormat) => {
    let wordArray = Converter.uint8ArrayToWordArray(uint8Array)
    let hashedWordArray = ''
    let output = ''
    switch(hashAlgo) {
        case HashAlgo.MD5:
            hashedWordArray = CryptoJS.MD5(wordArray)
            break
        case HashAlgo.SHA1:
            hashedWordArray = CryptoJS.SHA1(wordArray)
            break
        case HashAlgo.SHA224:
            hashedWordArray = CryptoJS.SHA224(wordArray)
            break
        case HashAlgo.SHA256: 
            hashedWordArray = CryptoJS.SHA256(wordArray)
            break
        case HashAlgo.SHA3:
            hashedWordArray = CryptoJS.SHA3(wordArray)
            break
        case HashAlgo.SHA384:
            hashedWordArray = CryptoJS.SHA384(wordArray)
            break
        case HashAlgo.SHA512:
            hashedWordArray = CryptoJS.SHA512(wordArray)
            break
        default:
            Logger.error(LOGGERNAME, 'unsupported hashing algo ' + hashAlgo)

    }
    let hexedUint8Array = Converter.wordArrayToUint8Array(hashedWordArray)
    switch(hashFormat) {
        case HashFormat.Hex:
            output = Converter.uint8ArrayToHex(hexedUint8Array)
            break
        case HashFormat.Base64:
            output = Converter.uint8ArrayToBase64(hexedUint8Array)
            break
        case HashFormat.Byte:
            output = Converter.uint8ArrayToByte(hexedUint8Array)
            break
        default:
            Logger.errror(LOGGERNAME, 'unknwon hash format ' + hashFormat)
    }
    return output
}

const Hasher = {
    getHashValue: getHashValue
}

export default Hasher