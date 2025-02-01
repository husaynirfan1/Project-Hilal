const selections = {
  cell1: ["Option A", "Option B", "Option C"],
  cell2: ["Option X", "Option Y", "Option Z"],
  cell3: ["Option 1", "Option 2", "Option 3"],
};

let userSelections = {
  cell1: null,
  cell2: null,
  cell3: null,
};

function showSelections(cellId) {
  const selectionList = document.getElementById("selection-list");
  selectionList.innerHTML = ""; // Clear previous selections

  selections[cellId].forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => selectOption(cellId, option);
    selectionList.appendChild(button);
  });

  document.getElementById("selections").style.display = "block";
}

function selectOption(cellId, option) {
  userSelections[cellId] = option;
  document.getElementById(cellId).textContent = option;
  document.getElementById("selections").style.display = "none";
}

function showResult() {
  const resultDiv = document.getElementById("result");
  if (userSelections.cell1 && userSelections.cell2 && userSelections.cell3) {
    resultDiv.textContent = `You selected: ${userSelections.cell1}, ${userSelections.cell2}, ${userSelections.cell3}`;
  } else {
    resultDiv.textContent = "Please make all selections before pressing Enter.";
  }
}
