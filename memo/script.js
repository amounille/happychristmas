function shuffleArray(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const itemListGenerator = (charList) => {
  const cards = [...charList, ...shuffleArray(charList)];
  const result = shuffleArray(cards);
  return result;
};

function generateMemoComponent() {
  const CHARS = "🎅,🎄,💝,🎁,🤍,❤️";
  const chars = CHARS.split(",").map((el) => el.toUpperCase());

  return {
    selectedChar: null,
    selectedIndex: null,
    failCount: 0,
    guessedCharList: [],
    isDisabled: false,
    charList: itemListGenerator(chars),
    isGameOver() {
      return this.guessedCharList.length === this.charList.length / 2;
    },
    getText(char, index) {
      if (
        (this.secondSelectedChar === char &&
          this.secondSelectedIndex === index) ||
        (this.selectedChar === char && this.selectedIndex === index)
      ) {
        return char;
      } else if (!this.isCharActive(char)) {
        return char;
      } else {
        return "?";
      }
    },
    isCharActive(char) {
      return !this.guessedCharList.includes(char);
    },
    resetSelection() {
      this.selectedIndex = null;
      this.selectedChar = null;
      this.secondSelectedChar = null;
      this.secondSelectedIndex = null;
    },
    resetSelectionDelayed() {
      this.isDisabled = true;
      setTimeout(() => {
        this.resetSelection();
        this.isDisabled = false;
      }, 800);
    },
    onNewGame() {
      this.resetSelection();
      this.guessedCharList = [];
      this.charList = itemListGenerator(chars);
      window.location.href = '../minigame/index.html';
    },
    isSelected(char, index) {
      return this.selectedIndex === index && this.selectedChar === char;
    },
    onClick(char, index) {
      if (this.isCharActive(char) && this.selectedIndex !== index) {
        if (this.selectedChar === char) {
          this.guessedCharList.push(char);
          this.resetSelection();
        } else {
          if (this.selectedChar !== null) {
            this.secondSelectedChar = char;
            this.secondSelectedIndex = index;
            this.resetSelectionDelayed();
          } else {
            this.selectedChar = char;
            this.selectedIndex = index;
          }
        }
      } else {
        this.resetSelectionDelayed();
      }
    }
  };
}