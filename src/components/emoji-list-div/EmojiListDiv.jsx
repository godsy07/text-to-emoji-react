import React from "react";
import "./emoji-list-div.styles.css";

const EmojiListDiv = ({ symbolsData, handleReplaceTextWithEmoji }) => {
  return (
    <div className='emoji-list-div'>
      {symbolsData.map((el, index) => {
        return (
          <div
            className='emoji-list'
            key={index}
            title={el.text.split(" | ")[0]}
            // title={el.text}
            onClick={() => handleReplaceTextWithEmoji(el.text, el.symbol)}
          >
            {el.symbol}
          </div>
        );
      })}
    </div>
  );
};

export default EmojiListDiv;
