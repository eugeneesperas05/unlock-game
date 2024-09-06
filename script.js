// --unlock-game
document.addEventListener("DOMContentLoaded", () => {
  // --show instructions
  const instructionContainer = document.querySelector(".instruction-container");
  const instructionBtn = document.querySelector(".instruction-btn");
  instructionBtn.addEventListener("mouseover", () => {
    console.log("im");
    instructionContainer.style.display = "flex";
  });

  instructionBtn.addEventListener("mouseout", () => {
    console.log("im");
    instructionContainer.style.display = "none";
  });

  // let passwordKey = [];
  // let passwordKeyToString = "";
  let counter = 0;

  const gamePlay = () => {
    // [condition para sa aking max number of input = 4]
    const inputguess = document.querySelector(".input-guess");

    inputguess.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9]/g, "");

      if (this.value.length > 4) {
        this.value = this.value.slice(0, 4);
      }
    });

    const displayedKey = document.querySelector(".secret-key");
    // [code para maka generate ng 4 digits secret keys]

    const secretfourDigitKeys = () => {
      const secretKeysArray = [];
      for (let i = 0; i < 4; i++) {
        const random = Math.floor(Math.random() * 10);
        secretKeysArray.push(random);
      }
      return secretKeysArray;
    };

    // --array type for keys
    let passwordKey = secretfourDigitKeys();
    // --string type for keys
    const passwordKeyToString = passwordKey.join("");
    console.log(`here ${passwordKeyToString}`);

    counter = 0;

    console.log(passwordKey);

    const enterBtn = document.querySelector(".btn");
    // --kaya may false dito even default naman and false, sa line 93 nagdisabled AudioWorklet, kaya need ma enabled
    enterBtn.addEventListener("click", () => {
      const inputtedguessValue = inputguess.value;
      const arrayInputguess = inputguess.value.split("").map(Number);
      // console.log(arrayInputguess);

      const myImg = document.querySelector(".myImg");
      const appendContainer = document.querySelector(".append-div-container");
      const popupDisplayedKeys = document.querySelector(".popup-password");
      const symbolContainer = document.querySelector(".symbol-main-container");
      const symbol = document.querySelector(".symbol");

      if (counter < 10) {
        inputguess.value = "";
        // --validation para sa input, dapat 4 digits lang ang pwede ma enter
        if (inputtedguessValue.length < 4) {
          alert("Enter Four Digit Number");
          return;
        } else {
          // [code para sa color indicator ng input fields, green yellow or default]
          // --green if correct number and position
          // --yellow if correct number but wrong position
          // --default or gray if incorrect
          const colorIndicator = () => {
            const appendDiv = document.createElement("div");
            arrayInputguess.forEach((input, index) => {
              let span = document.createElement("span"); // Create a span para pag lagyan ng input

              if (input == passwordKey[index]) {
                span.style.backgroundColor = "#09fa1e"; // Correct number and position
              } else if (passwordKey.includes(input)) {
                span.style.backgroundColor = "#f5f247"; // Correct number, wrong position
              } else {
                span.style.backgroundColor = "gray"; // Wrong number
              }

              span.textContent = input; // Set the text of the span to the input value
              appendDiv.appendChild(span); // Append the span to the appendDiv
            });

            appendDiv.classList.add("append"); // append class dynamically added sa appenDiv
            appendContainer.appendChild(appendDiv); // yung mga guess ay nasa appendDiv tas ilalagay sa appendContainer
          };

          colorIndicator();
        }

        inputguess.value = "";

        // --comparison if correct and guess sa password
        if (passwordKeyToString == inputtedguessValue) {
          const popupContainer = document.querySelector(
            ".popup-main-container"
          );
          myImg.src = "assets/blueunlock.gif";
          displayedKey.textContent = passwordKeyToString;
          popupDisplayedKeys.textContent = passwordKeyToString;
          popupDisplayedKeys.style.color = "#55f755";
          const popupMsg = document.querySelector(".popup-message");
          popupDisplayedKeys;
          popupMsg.textContent = "Good Job! Correct Guess!";

          // -popup symbol check(✔) for 1000ms
          setTimeout(() => {
            symbol.textContent = "✔";
            symbol.style.color = "#55f755";
            symbolContainer.style.display = "flex";
          }, 800);
          enterBtn.disabled = true;
          setTimeout(() => {
            symbolContainer.style.display = "none";
            popupContainer.style.display = "flex";
          }, 1400);
        }

        if (counter == 9) {
          const popupContainer = document.querySelector(
            ".popup-main-container"
          );
          displayedKey.textContent = passwordKeyToString;
          popupDisplayedKeys.textContent = inputtedguessValue;
          popupDisplayedKeys.style.color = "#f73131";
          const popupMsg = document.querySelector(".popup-message");
          popupMsg.textContent = "Better Luck Next Time!";
          enterBtn.disabled = true;

          // -popup symbol check(✗) for 1000ms
          setTimeout(() => {
            symbol.textContent = "✗";
            symbol.style.color = "#f73131";
            symbolContainer.style.display = "flex";
          }, 800);
          enterBtn.disabled = true;
          setTimeout(() => {
            symbolContainer.style.display = "none";
            popupContainer.style.display = "flex";
          }, 1400);
        }
        console.log(`counter = ${counter}`);
        counter++;
        console.log(inputtedguessValue.length);
      }
    });
  };
  gamePlay();

  // ---code para sa play again and pag diplay ng result

  // const playAgain = () => {
  //   const playAgainBtn = document.querySelector(".play-again-btn");
  //   const popupContainer = document.querySelector(".popup-main-container");
  //   const enterBtn = document.querySelector(".btn");
  //   const appendContainer = document.querySelector(".append-div-container");
  //   const inputguess = document.querySelector(".input-guess");

  //   playAgainBtn.addEventListener("click", () => {
  //     popupContainer.style.display = "none";
  //     enterBtn.disabled = false;
  //     appendContainer.innerHTML = "";
  //     gamePlay();
  //   });
  // };
  // playAgain();
  document.querySelector(".play-again-btn").onclick = function () {
    location.reload();
  };
});
