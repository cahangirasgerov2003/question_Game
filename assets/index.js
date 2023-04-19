let questions = [
  {
    question: "What color is the sky?",
    answer: ["Blue", "Yellow", "Green"],
    trueAnswer: "a",
  },
  {
    question: "What do you call people who are 18+ ?",
    answer: ["Baby", "Adult", "Person"],
    trueAnswer: "b",
  },
  {
    question: "What color is the tree?",
    answer: ["Red", "Brown", "Green"],
    trueAnswer: "c",
  },
  {
    question: "What do you call someone who has a wife?",
    answer: ["Wife", "Husband", "Married"],
    trueAnswer: "c",
  },
  {
    question: "Which is the most us level in English?",
    answer: ["B1", "C2", "A2"],
    trueAnswer: "b",
  },
];
let gamePage = document.querySelector("#game-page");
let valueProgressbar = 0;
let randomNumberQuestion = 0;
let position = true;
class QuestionGame {
  constructor(questions) {
    this.questions = questions;
  }
  randomQuestion() {
    let randomNumber = Math.floor(Math.random() * this.questions.length);
    randomNumberQuestion = randomNumber;
    this.renderQuestion();
  }
  renderQuestion() {
    gamePage.innerHTML = `<div class="progress mt-5">
    <div
    id="progressElement"
      class="progress-bar progress-bar-striped bg-success"
      role="progressbar"
      style="width:${valueProgressbar}%"
      aria-valuenow="${valueProgressbar}"
      aria-valuemin="0"
      aria-valuemax="100"
    ></div>
  </div>

  <div class="jumbotron jumbotron-fluid rounded-lg mt-5 bg-dark">
    <div class="container">
      <h1
        id="questionTitle"
        class="text-white text-center font-weight-bold"
      >
        Question 1
      </h1>
      <p
        id="questionDescription"
        class="lead text-white text-center font-weight-bold"
      >
        ${this.questions[randomNumberQuestion].question}
      </p>
    </div>
  </div>

  <div
    id="options"
    class="row"
    onclick="alert('Please select one of the A B C sounds from the keyboard')"
  >
    <div class="col-lg-4 col-sm-6">
      <p id="a" class="h4 text-white p-3 rounded-lg mb-0">A)</p>
      <h2
        id="questionVariant1"
        class="h4 bg-white text-dark p-3 rounded-lg"
      >
      ${this.questions[randomNumberQuestion].answer[0]}
      </h2>
    </div>

    <div class="col-lg-4 col-sm-6">
      <p id="b" class="h4 text-white p-3 rounded-lg mb-0">B)</p>
      <h2
        id="questionVariant2"
        class="h4 bg-white text-dark p-3 rounded-lg"
      >
      ${this.questions[randomNumberQuestion].answer[1]}
      </h2>
    </div>

    <div class="col-lg-4 col-sm-12">
      <p id="c" class="h4 text-white p-3 rounded-lg mb-0">C)</p>
      <h2
        id="questionVariant3"
        class="h4 bg-white text-dark p-3 rounded-lg"
      >
      ${this.questions[randomNumberQuestion].answer[2]}
      </h2>
    </div>
  </div>`;
  }
  selectNewQuestion(randomNumberQuestion) {
    if (this.questions.length === 1) {
      document.querySelector("#game-page").classList.add("d-none");
      document.querySelector("#game-over").classList.remove("d-none");
      window.removeEventListener("keydown", a);
      let indexRam = setInterval(() => {
        document.querySelector("#second").innerHTML -= 1;
      }, 1000);
      setTimeout(() => {
        document.querySelector("#game-over").classList.add("d-none");
        document.querySelector("#initial-page").classList.remove("d-none");
        clearInterval(indexRam);
        window.location.reload();
        window.addEventListener("keydown", a);
      }, 5000);
    } else {
      this.questions.splice(randomNumberQuestion, 1);
      this.randomQuestion();
    }
  }
}
let questionGame = new QuestionGame(questions);
document.querySelector(".exit-button").addEventListener("click", () => {
  window.close();
});
document.querySelector(".start-button").addEventListener("click", () => {
  questionGame.randomQuestion();
  document.querySelector("#initial-page").classList.add("d-none");
  document.querySelector("#game-page").classList.remove("d-none");
});
window.addEventListener(
  "keydown",
  (a = (e) => {
    if (position) {
      if (e.key === "a" || e.key === "b" || e.key === "c") {
        position = false;
        if (e.key === questionGame.questions[randomNumberQuestion].trueAnswer) {
          document.querySelector("#progressElement").style.width =
            valueProgressbar + 20 + "%";
          valueProgressbar += 20;
          document.querySelector("#" + e.key).style.backgroundColor = "green";
        } else {
          document.querySelector("#" + e.key).style.backgroundColor = "red";
        }
        setTimeout(() => {
          questionGame.selectNewQuestion(randomNumberQuestion);
          position = true;
        }, 1000);
      } else {
        alert("Please choose one of the letters 'A B C' from the keyboard");
      }
    }
  })
);
