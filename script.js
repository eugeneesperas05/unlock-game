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
      console.log(secretToString);

      return secretToString;
    };

    // [para ma disable and input fields and Game Logic]

    const enterBtn = document.querySelector(".btn");

    let counter = 1;
    const passkey = secretfourDigitKeys();

    enterBtn.addEventListener("click", () => {
      const currentRow = document.querySelectorAll(`.key-rows .row-${counter}`);

      if (counter <= 5) {
        let arrayGuest = [];
        let newArr;
        let guest;

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
      }
    });
  };
  gamePlay();

  const replayBtn = document.querySelector(".replay-btn");

  replayBtn.addEventListener("click", () => {
    gamePlay();
    const popupResultContainer = document.querySelector(".result-container");
    const secretKeys = document.querySelector(".secret-keys");

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
