import React from 'react'

const XlateHashArea = ({ props, onHashChange, onFormatChange, hashAlgoList, outputFormatList }) => {
    return (
        <div className="form-group row col-sm">
            <label htmlFor="hashing-algo" className="col-sm-2 col-form-label">{props.name}</label>
            <div className="col-sm-5">
                <select onChange = {event => onHashChange(event.target.value)}id="hashing-algo" className="form-control form-control-sm">
                    {hashAlgoList}
                </select>
            </div>
            <div className="col-sm-5">
                <select onChange = {event => onFormatChange(event.target.value)} id="hashing-output-format" className="form-control form-control-sm">
                    {outputFormatList}
                </select>
            </div>
            <div className="col-sm-12">
                <textarea value={props.textAreaValue} className="form-control" id={props.textAreaId} rows="9" readOnly></textarea>
            </div>
            <div className="col-sm-12 text-center mt-1">
                <button type="submit" className="btn btn-primary btn-sm" style={{ visibility: 'hidden' }}>Go</button>
            </div>
        </div>
    );
}

export default XlateHashArea;