let userSelections = {
  cell1: null,
  cell2: null,
  cell3: null,
};

function updateSelection(cellId) {
  const selectedValue = document.getElementById(cellId).value;
  userSelections[cellId] = selectedValue;
}

function showResult() {
  const resultDiv = document.getElementById("result");
  if (userSelections.cell1 && userSelections.cell2 && userSelections.cell3) {
    resultDiv.textContent = `You selected: ${userSelections.cell1}, ${userSelections.cell2}, ${userSelections.cell3}`;
  } else {
    resultDiv.textContent = "Please make all selections before pressing Enter.";
  }
}
