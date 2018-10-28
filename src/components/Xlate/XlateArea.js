import React from 'react'

const XlateArea = ({ props, onClick, onChange }) => {
    return (
        <div className="form-group row col-sm">
            <label htmlFor="text-input" className='col-sm-2 col-form-label'>{props.name}</label>
            <div className='col-sm-12'>
                <textarea value={props.textAreaValue} onChange={(event) => onChange(event)} className="form-control" id={props.textAreaId} rows="9"></textarea>
            </div>
            <div className="col-sm-12 text-center mt-1">
                <button type="submit" onClick={(event) => onClick(event)}className="btn btn-primary btn-sm" id={props.buttonId}>Go</button>
            </div>
        </div >
    );
}

export default XlateArea;