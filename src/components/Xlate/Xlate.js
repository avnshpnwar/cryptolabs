import React, { Component } from 'react'
import XlateUtil from '../../Utils/XlateUtil'
import XlateArea from '../Xlate/XlateArea'
import XlateTextArea from '../Xlate/XlateTextArea'
import XlateHashArea from '../Xlate/XlateHashArea'
import Logger from '../../Utils/Logger'
import CodePageConstant from '../../Constants/CodePageConstant'
import HashAlgo from '../../Constants/HashAlgo'
import HashFormat from '../../Constants/HashFormat'
import InputType from '../../Constants/InputTypeConstant'

let LOGGERNAME = 'Xlate'

class Xlate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textValue: '',
            binaryValue: '',
            hexValue: '',
            base64Value: '',
            byteValue: '',
            hashValue: '',
            encodingValue: CodePageConstant.Utf8.value,
            hashAlgo: HashAlgo.SHA256,
            hashFormat: HashFormat.Base64,
        }

        // binding the event handler to this instance of app
        this.onTextAreaButtonClick = this.onTextAreaButtonClick.bind(this)
        this.onTextAreaTextChange = this.onTextAreaTextChange.bind(this)
        this.onEncodingChange = this.onEncodingChange.bind(this)
        this.onHashAlgoChange = this.onHashAlgoChange.bind(this)
        this.onHashFormatChange = this.onHashFormatChange.bind(this)
    }


    onTextAreaButtonClick = (event) => {
        let inputType = event.target.id
        let inputString = XlateUtil.getInputString(inputType, this.state)
        let stateCopy = this.state
        Logger.debug(LOGGERNAME, "input type : " + inputType)
        Logger.debug(LOGGERNAME, "input      : " + inputString)
        Logger.debug(LOGGERNAME, "encoding   : " + this.state.encodingValue)

        // here we can deal in two ways, either make this method async use await or
        // use promise then function, 
        //const resultState = await XlateUtil.updateOutputState(inputType, inputString, this.state)
        //this.setState(resultState)
        //this.setState(XlateUtil.updateOutputState(inputType, inputString, this.state))
        let promise = XlateUtil.updateOutputState(inputType, inputString, stateCopy)
        stateCopy.loading = true
        this.setState(stateCopy)
        promise.then(
            result => {
                this.setState(result)
            }
        )
    }

    onTextAreaTextChange = (event) => {
        let tempState = this.state
        switch (event.target.id) {
            case 'text-area':
                tempState.textValue = event.target.value
                break
            case 'binary-area':
                tempState.binaryValue = event.target.value
                break
            case 'hex-area':
                tempState.hexValue = event.target.value
                break
            case 'base64-area':
                tempState.base64Value = event.target.value
                break
            case 'byte-area':
                tempState.byteValue = event.target.value
                break
            default:
                break;
        }
        this.setState(tempState)
    }

    onEncodingChange = (encoding) => {
        let tempState = this.state
        tempState.encodingValue = encoding
        this.setState(tempState)
    }

    onHashAlgoChange = (algo) => {
        let tempState = this.state
        tempState.hashAlgo = algo
        this.setState(tempState)
    }

    onHashFormatChange = (format) => {
        let tempState = this.state
        tempState.hashFormat = format
        this.setState(tempState)
    }

    render = () => {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <XlateTextArea
                            onChange={this.onTextAreaTextChange}
                            onClick={this.onTextAreaButtonClick}
                            onEncodingChange={this.onEncodingChange}
                            optionList={XlateUtil.getPageEncodingList()}
                            props={{ name: 'Text', textAreaId: 'text-area', buttonId: InputType.Text, textAreaValue: this.state.textValue }}
                        />

                        <XlateArea
                            onChange={this.onTextAreaTextChange}
                            onClick={this.onTextAreaButtonClick}
                            props={{ name: 'Binary', textAreaId: 'binary-area', buttonId: InputType.Binary, textAreaValue: this.state.binaryValue }}
                        />

                        <XlateArea
                            onChange={this.onTextAreaTextChange}
                            onClick={this.onTextAreaButtonClick}
                            props={{ name: 'Hex', textAreaId: 'hex-area', buttonId: InputType.Hex, textAreaValue: this.state.hexValue }}
                        />
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <XlateArea
                            onChange={this.onTextAreaTextChange}
                            onClick={this.onTextAreaButtonClick}
                            props={{ name: 'Base64', textAreaId: 'base64-area', buttonId: InputType.Base64, textAreaValue: this.state.base64Value }}
                        />

                        <XlateArea
                            onChange={this.onTextAreaTextChange}
                            onClick={this.onTextAreaButtonClick}
                            props={{ name: 'Byte', textAreaId: 'byte-area', buttonId: InputType.Byte, textAreaValue: this.state.byteValue }}
                        />

                        <XlateHashArea
                            onHashChange={this.onHashAlgoChange}
                            onFormatChange={this.onHashFormatChange}
                            hashAlgoList={XlateUtil.getHashAlgoList()}
                            outputFormatList={XlateUtil.getHashOutputFormatList()}
                            props={{ name: 'Hash', textAreaId: 'hash-area', textAreaValue: this.state.hashValue }}
                        />

                    </div>
                </div>
            </div>
        );


    }
}

export default Xlate;