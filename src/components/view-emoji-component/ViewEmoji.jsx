import React from "react";
import InputTextDiv from "../input-text-div/InputTextDiv";

import { EMOJI_DATA } from "../emoji-data";

import "./view-emoji.styles.css";
import EmojiListDiv from "../emoji-list-div/EmojiListDiv";

class ViewEmoji extends React.Component {
  constructor() {
    super();
    this.state = {
      inputText: "",
      viewEmojiData: [],
    };

    this.textareaRef = React.createRef();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputEmoji = this.handleInputEmoji.bind(this);
    this.handleReplaceTextWithEmoji =
      this.handleReplaceTextWithEmoji.bind(this);
  }

  handleInputChange(e) {
    // For pression space bar, clear emoji data
    if (e.nativeEvent.data === " ") {
      this.setState({ viewEmojiData: [] });
    }
    this.setState({ inputText: e.target.value }, () => {
      this.handleInputEmoji();
      // After pressing Backspace, check if last alphabet is space(' ')
      if (e.nativeEvent.inputType === "deleteContentBackward") {
        let a = this.state.inputText.split("");
        if (a[a.length - 1] === " " || a.length === 0) {
          // If word before is space of the textarea is blank Clear emoji data
          this.setState({ viewEmojiData: [] });
        }
      }
    });
  }

  handleInputEmoji() {
    const words = this.state.inputText.split(" ");
    const lastWord = words[words.length - 1];
    if (lastWord !== "") {
      let reg = new RegExp(lastWord, "gi");
      let tempArr = [];
      EMOJI_DATA.forEach((data) => {
        if (data.text.match(reg)) {
          let tempObj = { text: data.text, symbol: data.symbol };
          tempArr.push(tempObj);
        }
      });
      this.setState({ viewEmojiData: tempArr });
      this.textareaRef.current.focus();
    }
  }

  handleReplaceTextWithEmoji(emojiText, emojiSymbol) {
    let words = this.state.inputText.split(" ");
    if (words[words.length - 1] !== "") {
      let reg = new RegExp(words[words.length - 1], "gi");
      if (emojiText.match(reg)) {
        words[words.length - 1] = emojiSymbol;
        this.setState({ inputText: words.join(" ") });
        this.setState({ viewEmojiData: [] });
        this.textareaRef.current.focus();
        // console.log(this.textareaRef.selectionEnd);
      }
    }
  }

  render() {
    return (
      <div className='view-emoji-content'>
        <InputTextDiv
          ref={this.textareaRef}
          text={this.state.inputText}
          handleInputChange={this.handleInputChange}
        />
        {this.state.viewEmojiData.length > 0 ? (
          <EmojiListDiv
            handleReplaceTextWithEmoji={this.handleReplaceTextWithEmoji}
            symbolsData={this.state.viewEmojiData}
          />
        ) : null}
      </div>
    );
  }
}
export default ViewEmoji;
