import React from "react";
import "./input-text-div.styles.css";

const InputTextDiv = React.forwardRef(({ text, handleInputChange }, ref) => {
  return (
    <div className='input-text-div'>
      <textarea
        ref={ref}
        className='input-text-area'
        value={text}
        onChange={handleInputChange}
      ></textarea>
    </div>
  );
});

export default InputTextDiv;
