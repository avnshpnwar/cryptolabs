
import React from 'react'
import Converter from '../Utils/Converter'
import Hasher from '../Utils/Hasher'
import CodePageConstant from '../Constants/CodePageConstant'
import HashAlgo from '../Constants/HashAlgo'
import InputType from '../Constants/InputTypeConstant'
import HashFormat from '../Constants/HashFormat'
import Logger from '../Utils/Logger'

let LOGGERNAME = 'XlateUtil'
const getPageEncodingList = () => {
    let optionList = []
    for (let key in CodePageConstant) {
        optionList.push(<option key={key} value={CodePageConstant[key].value}>{CodePageConstant[key].name}</option>)
    }
    return optionList
}

const getHashAlgoList = () => {
    let hashAlgoList = []
    for (let key in HashAlgo) {
        hashAlgoList.push(<option key={key} value={HashAlgo[key]}>{key}</option>)
    }
    return hashAlgoList
}

const getHashOutputFormatList = () => {
    let hashOutputFormatList = []
    for (let key in HashFormat) {
        hashOutputFormatList.push(<option key={key} value={HashFormat[key]}>{key}</option>)
    }
    return hashOutputFormatList
}

const getInputString = (inputType, stateCopy) => {
    let inputString = ''

    switch (inputType) {
        case InputType.Text:
            inputString = stateCopy.textValue
            break
        case InputType.Binary:
            inputString = stateCopy.binaryValue
            break
        case InputType.Hex:
            inputString = stateCopy.hexValue
            break
        case InputType.Base64:
            inputString = stateCopy.base64Value
            break
        case InputType.Byte:
            inputString = stateCopy.byteValue
            break
        default:
            Logger.error(LOGGERNAME, 'unknown input type' + inputType)
            break;
    }
    return inputString
}

const updateOutputState = async (inputType, inputString, stateCopy) => {
    //await Helper.sleep(5000)
    let outputStringText = ''
    let outputStringBinary = ''
    let outputStringHex = ''
    let outputStringBase64 = ''
    let outputStringByte = ''
    let outputStringHash = ''
    let uint8Array = []

    switch (inputType) {
        case InputType.Text:
            uint8Array = Converter.textToUint8Array(stateCopy.encodingValue, inputString)
            break
        case InputType.Binary:
            uint8Array = Converter.binaryToUint8Array(inputString)
            break
        case InputType.Hex:
            uint8Array = Converter.hexToUint8Array(inputString)
            break
        case InputType.Base64:
            uint8Array = Converter.base64ToUint8Array(inputString)
            break
        case InputType.Byte:
            uint8Array = Converter.byteToUint8Array(inputString)
            break
        default:
            Logger.error("unknown input type : " + inputType)
    }

    if (uint8Array.length === 0) {
        outputStringText = (inputType === InputType.Text) ? inputString : 'Unable to Parse'
        outputStringBinary = (inputType === InputType.Binary) ? inputString : 'Unable to Parse'
        outputStringHex = (inputType === InputType.Hex) ? inputString : 'Unable to Parse'
        outputStringBase64 = (inputType === InputType.Base64) ? inputString : 'Unable to Parse'
        outputStringByte = (inputType === InputType.Byte) ? inputString : 'Unable to Parse'
        outputStringHash = 'Unable to Parse'
    } else {
        // run various conversion in async mode
        let textPromise = new Promise((resolve, reject) => {
            let result = ""
            try {
                result = Converter.uint8ArrayToText(stateCopy.encodingValue, uint8Array)
            } catch (err) {
                result = 'Unable to Parse'
                Logger.error(LOGGERNAME, 'unable to convert uint8Array to text ' + err)
            }
            resolve(result)
        })

        let binaryPromise = new Promise((resolve, reject) => {
            let result = ""
            try {
                result = Converter.uint8ArrayToBinary(uint8Array)
            } catch (err) {
                result = 'Unable to Parse'
                Logger.error(LOGGERNAME, 'unable to convert uint8Array to binary ' + err)
            }
            resolve(result)
        })

        let hexPromise = new Promise((resolve, reject) => {
            let result = ""
            try {
                result = Converter.uint8ArrayToHex(uint8Array)
            } catch (err) {
                result = 'Unable to Parse'
                Logger.error(LOGGERNAME, 'unable to convert uint8Array to hex ' + err)
            }
            resolve(result)
        })

        let base64Promise = new Promise((resolve, reject) => {
            let result = ""
            try {
                result = Converter.uint8ArrayToBase64(uint8Array)
            } catch (err) {
                result = 'Unable to Parse'
                Logger.error(LOGGERNAME, 'unable to convert uint8Array to base64 ' + err)
            }
            resolve(result)
        })
       
        let bytePromise = new Promise((resolve, reject) => {
            let result = ""
            try {
                result = Converter.uint8ArrayToByte(uint8Array)
            } catch (err) {
                result = 'Unable to Parse'
                Logger.error(LOGGERNAME, 'unable to convert uint8Array to dec ' + err)
            }
            resolve(result)
        })

        let hashPromise = new Promise((resolve, reject) => {
            let result = ""
            try {
                result = Hasher.getHashValue(uint8Array, stateCopy.hashAlgo, stateCopy.hashFormat)
            } catch (err) {
                result = 'Unable to Parse'
                Logger.error(LOGGERNAME, 'unable to calculate hash ' + err)
            }
            resolve(result)
        })

        outputStringText = await textPromise
        outputStringBinary = await binaryPromise
        outputStringHex = await hexPromise
        outputStringBase64 = await base64Promise
        outputStringByte = await bytePromise
        outputStringHash = await hashPromise
    }


    stateCopy.textValue = outputStringText
    stateCopy.binaryValue = outputStringBinary
    stateCopy.hexValue = outputStringHex
    stateCopy.base64Value = outputStringBase64
    stateCopy.byteValue = outputStringByte
    stateCopy.hashValue = outputStringHash

    return stateCopy
}

const XlateUtil = {
    getPageEncodingList: getPageEncodingList,
    getInputString: getInputString,
    updateOutputState: updateOutputState,
    getHashAlgoList: getHashAlgoList,
    getHashOutputFormatList: getHashOutputFormatList
}



export default XlateUtil