import CryptoJS from 'crypto-js'
import Logger from './Logger'
import CodePage from 'codepage'

let LOGGERNAME = 'Converter'

export const wordArrayToUint8Array = (wordArray) => {
    let len = wordArray.words.length
    let u8array = new Uint8Array(len << 2)
    let offset = 0

    for (let i = 0; i < len; i++) {
        let word = wordArray.words[i];
        u8array[offset++] = word >> 24;
        u8array[offset++] = (word >> 16) & 0xff;
        u8array[offset++] = (word >> 8) & 0xff;
        u8array[offset++] = word & 0xff;
    }
    return u8array.slice(0, wordArray.sigBytes);
}

export const uint8ArrayToWordArray = (uint8Array) => {
    return CryptoJS.lib.WordArray.create(uint8Array)
}

export const uint8ArrayToText= (encoding, uint8Array) => {
    let output  = CodePage.utils.decode(encoding, uint8Array)
    return output
}

export const uint8ArrayToHex = (uint8Array) => {
    let hexString = CryptoJS.enc.Hex.stringify(uint8ArrayToWordArray(uint8Array))
    return hexString.replace(/(.{2})/g, '$& ')
}

export const uint8ArrayToBase64 = (uint8Array) => {
    return CryptoJS.enc.Base64.stringify(uint8ArrayToWordArray(uint8Array))
}

export const uint8ArrayToByte = (uint8Array) => {
    return uint8Array.join(' ')
}

export const uint8ArrayToBinary = (uint8Array) => {
    let finalString = ''
    for (let i = 0; i < uint8Array.length; i++) {
        let j = ('00000000' + (uint8Array[i]).toString(2)).slice(-8)
        finalString += j + ' '
    }
    return finalString
}

export const textToUint8Array = (encoding, input) => {
    let arr = CodePage.utils.encode(encoding, input)
    return new Uint8Array(arr)
}

export const hexToUint8Array = (input) => {
    input = input.replace(/\r?\n|\r/g, '') // remove all new line chars
    input = input.replace(/ /g, '') // remove spaces
    console.log(input)

    //check hexstring is valid or not
    if (input.length % 2 !== 0) {
        Logger.error(LOGGERNAME, 'input hex string invalid format : ' + input)
        return []
    }

    var regexp = '[0-9A-Fa-f]{' + input.length + '}'
    var dynreg = new RegExp(regexp, 'g')
    if (!dynreg.test(input)) {
        Logger.error(LOGGERNAME, 'invalid hexstring input ' + input)
        return []
    }

    let wordArray = CryptoJS.enc.Hex.parse(input)
    return wordArrayToUint8Array(wordArray)
}

export const base64ToUint8Array = (input) => {
    input = input.replace(/\r?\n|\r/g, '') // remove all new line chars
    input = input.replace(/ /g, '') // remove spaces
    try {
        window.atob(input)
    } catch(err) {
        Logger.error(LOGGERNAME, 'invalid base64 string')
        return []
    }
    let wordArray = CryptoJS.enc.Base64.parse(input)
    return wordArrayToUint8Array(wordArray)
}

export const byteToUint8Array = (input) => {
    input = input.replace(/\r?\n|\r/g, ' ') // remove all new line chars
    let arrayFromInput = input.split(' ')
    let byteArray = []
    for (let i=0; i < arrayFromInput.length; i++) {
        if (arrayFromInput[i] !== "") {
            let intValue = Number(arrayFromInput[i])
            if (intValue >= 0 && intValue <= 255) {
                byteArray.push(intValue)
            } else {
                Logger.error("invalid input, input should be between 0 and 255 with space")
                byteArray = []
                break
            }
        }
    }
    return new Uint8Array(byteArray)
}

export const binaryToUint8Array = (input) => {
    let  byteArray = []
    input = input.replace(/\r?\n|\r/g, '') // remove all new line cconst seekValue = 8
    input = input.replace(/ /g, '') // remove spaces
    // check if it contains 0 and 1 only
    var regexp = '[0-1]{' + input.length + '}'
    var dynreg = new RegExp(regexp, 'g')
    if (!dynreg.test(input)) {
        Logger.error(LOGGERNAME, 'invalid binary input, input should contain 0 and 1 only ')
        return []
    }

    // check if total length is divisible by 8
    if (input.length % 8 !== 0) {
        Logger.error(LOGGERNAME, 'invalid input, input must be divisible by 8')
        return []
    }
    console.log('formatted input ' + input)
    const seekValue = 8
    let i = 0
    while (i < input.length) {
        let binaryString = input.slice(i, i+seekValue)
        console.log(i + ":" + binaryString)
        byteArray.push(parseInt(binaryString, 2))
        i = i + seekValue 
    }
    console.log(byteArray)
    return new Uint8Array(byteArray)
}

const Converter = {
    uint8ArrayToWordArray: uint8ArrayToWordArray,
    wordArrayToUint8Array: wordArrayToUint8Array,
    uint8ArrayToText: uint8ArrayToText,
    uint8ArrayToBase64: uint8ArrayToBase64,
    uint8ArrayToByte: uint8ArrayToByte,
    uint8ArrayToHex: uint8ArrayToHex,
    uint8ArrayToBinary: uint8ArrayToBinary,
    textToUint8Array: textToUint8Array,
    hexToUint8Array: hexToUint8Array,
    base64ToUint8Array: base64ToUint8Array,
    byteToUint8Array: byteToUint8Array,
    binaryToUint8Array: binaryToUint8Array
}

export default Converter