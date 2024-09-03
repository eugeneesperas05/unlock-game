/* --------unlock the Lock Game---------- */
document.addEventListener("DOMContentLoaded", () => {
  const gamePlay = () => {
    // [condition para sa aking max number of input = 1]
    const inputValue = document.querySelectorAll(".digit-value");

    inputValue.forEach((input) => {
      input.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, "");

        if (this.value.length > 1) {
          this.value = this.value.slice(0, 1);
        }
      });
    });

    // [code para maka generate ng 4 digits secret keys]
    const secretKeys = document.querySelector(".secret-keys");

    const secretfourDigitKeys = () => {
      const secretKeysArray = [];
      for (let i = 0; i < 4; i++) {
        const random = Math.floor(Math.random() * 10);
        secretKeysArray.push(random);
      }
      const secretToString = secretKeysArray.map((a) => a).join("");
      // secretKeys.textContent = secretToString;
      // console.log(secretToString);

      return secretToString;
    };

    // [para ma disable and input fields and Game Logic]

    const enterBtn = document.querySelector(".btn");

    let counter = 1;
    const passkey = secretfourDigitKeys();
    console.log(`passkey: ${passkey}`);
    // ---tatanggalin ko rin itong code navigator, cheat code for debugging pa
    const cheat = document.querySelector(".cheat");
    cheat.textContent = passkey;
    // ---tatanggalin ko rin itong code navigator, cheat code for debugging pa

    enterBtn.addEventListener("click", () => {
      if (counter <= 5) {
        let arrayGuest = [];
        let newArr;

        // [logic para sa input fields]
        document
          .querySelectorAll(`.row${counter} .row-${counter}`)
          .forEach((input) => {
            arrayGuest.push(input.value);
          });

        // [para iconvert sa string and array]
        newArr = arrayGuest.map((a) => a).join("");

        if (newArr.length == 4) {
          // [disabling and enabling buttons]
          document
            .querySelectorAll(`.row${counter} .row-${counter}`)
            .forEach((input) => (input.disabled = true));
          document
            .querySelectorAll(`.row${counter + 1} .row-${counter + 1}`)
            .forEach((input) => (input.disabled = false));

          counter++;
        } else {
          alert("Enter Four Digit Guest");
        }

        const resultMsg = document.querySelector(".result-message");
        const revealPass = document.querySelector(".password-value");
        if (counter == 6) {
          const popupResultContainer =
            document.querySelector(".result-container");

          popupResultContainer.style.display = "flex";
          counter = 1;
          revealPass.textContent = "WRONG GUEST";
          resultMsg.textContent = "Better Luck Next Time!";
        }

        // --condition para if correct or wrong guest

        if (newArr == passkey) {
          const myImg = document.querySelector(".myImg");
          myImg.src = "assets/blueunlock.gif";
          const popupResultContainer =
            document.querySelector(".result-container");

          popupResultContainer.style.display = "flex";
          counter = 1;
          revealPass.textContent = passkey;
          secretKeys.textContent = passkey;
          resultMsg.textContent = "Correct Guest! Good Job!";
        }

        // [code para sa color indicator ng input fields, green yellow or default]
        // --green if correct number and position
        // --yellow if correct number but wrong position
        // --default or gray if incorrect
        const colorIndicator = () => {
          let arrayPasskeys = passkey.split("");
          console.log(arrayPasskeys);
          console.log(arrayGuest);
          if (counter <= 5) {
            document
              .querySelectorAll(`.row${counter - 1} .row-${counter - 1}`)
              .forEach((input) => {
                if (input.value == arrayPasskeys[counter - 1]) {
                  input.style.backgroundColor = "green";
                } else if (arrayPasskeys.includes(input.value)) {
                  input.style.backgroundColor = "yellow";
                } else {
                  input.style.backgroundColor = "gray";
                }
              });
          }
        };
        colorIndicator();
      }
    });
  };
  gamePlay();

  // [code para sa play again button, div will popup if correct guest or out of turn]
  const replayBtn = document.querySelector(".replay-btn");
  const allInputFields = document.querySelectorAll(`.key-rows input`);

  replayBtn.addEventListener("click", () => {
    gamePlay();
    const popupResultContainer = document.querySelector(".result-container");
    const secretKeys = document.querySelector(".secret-keys");
    allInputFields.forEach((input) => (input.style.backgroundColor = "#fff"));

    popupResultContainer.style.display = "none";
    secretKeys.textContent = "????";
    for (let i = 1; i <= 5; i++) {
      document.querySelectorAll(`.row1 .row-1`).forEach((input) => {
        input.value = "";
        input.disabled = false;
      });

      document
        .querySelectorAll(`.row${i + 1} .row-${i + 1}`)
        .forEach((input) => {
          input.value = "";
          input.disabled = true;
        });
    }
  });
});
