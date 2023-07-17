let res = document.getElementById("res");
let expression = "";

function clrResult() {
  expression = "";
  updateResult();
}

function delLast() {
  expression = expression.slice(0, -1);
  updateResult();
}

function apndNmbr(number) {
  expression += number;
  updateResult();
}

function apndOprtr(operator) {
  expression += operator;
  updateResult();
}

function result() {
  try {
    res.value = eval(expression);
  } catch (error) {
    res.value = "Error";
  }
}

function updateResult() {
  res.value = expression;
}
