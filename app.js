const boxes = document.querySelectorAll(".box");
const newGame = document.getElementById("newGame");
const reset = document.getElementById("reset");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector(".msg");

let turno = true;
let count = 0;

let winnerList = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const resetGame = () => {
  turno = true;
  count = 0;
  enableBox();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  // console.log(box);
  box.addEventListener("click", (e) => {
    // console.log(box);
    if (turno) {
      e.target.innerHTML = "O";
      turno = false;
    } else {
      e.target.innerHTML = "X";
      turno = true;
    }
    e.target.disabled = true;
    count++;
    const winner = winnerCheck();
    if (count == 9 && !winner) {
      gamedraw();
    }
  });
});

const gamedraw = () => {
  msg.innerHTML = `Game was a Draw`;
  msgContainer.classList.remove("hide");
  disabledBox();
};

const disabledBox = () => {
  boxes.forEach((box) => {
    box.disabled = true;
    box.innerHTML = "";
  });
};
const enableBox = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerHTML = "";
  });
};

const showWinner = (winner) => {
  msg.innerHTML = `Congratulations ! Winner Player is ${winner}`;
  msgContainer.classList.remove("hide");
//   hideGame.classList.add("hide");
    
  disabledBox();
};

const winnerCheck = () => {
  for (let pattern of winnerList) {
    // console.log(pattern[0]);
    let pat0Val = boxes[pattern[0]].innerHTML;
    let pat1Val = boxes[pattern[1]].innerHTML;
    let pat2Val = boxes[pattern[2]].innerHTML;
    // console.log(pat0Val,pat2Val,pat2Val);
    if (pat0Val != "" && pat1Val != "" && pat2Val != "") {
      if (pat0Val === pat1Val && pat1Val === pat2Val) {
        showWinner(pat0Val);
      }
    }
  }
};
newGame.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
