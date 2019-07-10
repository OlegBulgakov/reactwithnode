import React from 'react';
import "./Checkbox.css";

const Checkbox = (props) => {
  return (
      <div className="round">
        <input type="checkbox" id={props.itemKey}
                  checked={props.isChecked}
                  onChange={() => props.toggleChange(props.itemKey)}
        />
        <label htmlFor={props.itemKey}/>
      </div>
  )
};

export default Checkbox