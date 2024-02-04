//get buttons
const btnsContainer = document.getElementById("btnsContainer");

// get screens
const problemDisplay = document.getElementById("problemDisplay");
const resultDisplay = document.getElementById("resultDisplay");

// convert nodelist to array
const btns = Array.from(btnsContainer.querySelectorAll("button"));

// initialize state variables
const calcBtnsId = [
  ".",
  "/",
  "*",
  "-",
  "+",
  "(",
  ")",
  "plusMinus",
];
const numberBtnsId = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0"
]
let problem = "";
let evalutedResult = "";
let result = "";

// handle problem update
function handleProblemUpdate(e) {
  if(problem.length < 26) {
    problem += e.target.innerText;
    problemDisplay.innerText = problem;
  }
}

// create event listeners
for (const btn of btns) {
  btn.addEventListener("click", (e) => {
    let id = e.target.id;

    switch (true) {
      // handle calculator buttons click
      case calcBtnsId.includes(id):
        handleProblemUpdate(e);
        if (result){
          result =""
        }
        break;

      // handle number buttons click
      case numberBtnsId.includes(id):
        if (result.length > 0) {
          problem = "";
          result = "";
          handleProblemUpdate(e);
        }else{
          handleProblemUpdate(e);
        }
        break;

      // handle percent button click
      case id == "%":
        if (problem) {
          if (problem >= 0) {
            result = Number(problem) / 100;
            handleProblemUpdate(e);
            resultDisplay.innerText = result;
          } else {
            result = "-ve percentile";
            resultDisplay.innerText = result;
          }
        }
        break;

      // handle square button click
      case id == "square":
        if (isNaN(Number(problem)) === false) {
          evalutedResult = Number(problem) ** 2;
          result = evalutedResult.toFixed(2);
          handleProblemUpdate(e);
          resultDisplay.innerText = result;
        }
        break;

      // handle square root button click
      case id == "squareRoot":
        if (isNaN(Number(problem)) === false) {
          evalutedResult = Math.sqrt(Number(problem));
          result = evalutedResult.toFixed(2);
          problem = `sqrt(${problem})`;
          problemDisplay.innerText = problem;
          resultDisplay.innerText = result;
        }
        break;

      // handle equals button click
      case id == "=":
        evalutedResult = math.evaluate(problem);
        result = evalutedResult.toFixed(2);
        resultDisplay.innerText = result;
        if (isNaN(Number(evalutedResult))) {
          problem = "";
        } else {
          problem = result;
        }
        console.log(problem)
        break;

      // handle delete button click
      case id == "del":
        problem = problem.slice(0, -1);
        problemDisplay.innerText = problem;
        break;

      // handle clear button click
      case id == "clear":
        problem = "";
        result = "";
        problemDisplay.innerText = problem;
        resultDisplay.innerText = result;
        break;

      default:
        console.log("no matching ids found");
        break;
    }
  });
}
