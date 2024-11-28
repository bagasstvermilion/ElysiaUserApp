const form = document.getElementById("form");
const selectBtn = document.getElementById("selectBtn");
const deleteBtn = document.getElementById("deleteBtn");
const dataListBody = document.querySelector("#dataList tbody");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;

  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td class="selectColumn ${
      selectBtn.textContent === "Select" ? "hidden" : ""
    }">
      <input type="checkbox" class="selectCheckbox" ${
        selectBtn.textContent === "Deselect" ? "" : "disabled"
      }>
    </td>
    <td>${name}</td>
    <td>${age}</td>
  `;

  dataListBody.prepend(newRow);

  form.reset();
});

selectBtn.addEventListener("click", function () {
  const selectColumn = document.querySelectorAll(".selectColumn");
  const selectColumnHeader = document.getElementById("selectColumn");
  const checkboxes = document.querySelectorAll(".selectCheckbox");

  if (selectBtn.textContent === "Select") {
    selectColumn.forEach((column) => column.classList.remove("hidden"));
    selectColumnHeader.classList.remove("hidden");
    checkboxes.forEach((checkbox) => (checkbox.disabled = false));
    deleteBtn.disabled = false;
    selectBtn.textContent = "Deselect";
  } else {
    selectColumn.forEach((column) => column.classList.add("hidden"));
    selectColumnHeader.classList.add("hidden");
    checkboxes.forEach((checkbox) => (checkbox.disabled = true));
    deleteBtn.disabled = true;
    selectBtn.textContent = "Select";
  }
});

deleteBtn.addEventListener("click", function () {
  const selectedRows = document.querySelectorAll(".selectCheckbox:checked");
  selectedRows.forEach((checkbox) => {
    checkbox.closest("tr").remove();
  });

  const remainingRows = document.querySelectorAll("#dataList tbody tr");

  if (remainingRows.length === 0) {
    deleteBtn.disabled = true;
  } else {
    const anySelected =
      document.querySelectorAll(".selectCheckbox:checked").length > 0;
    deleteBtn.disabled = !anySelected;
  }

  const remainingCheckboxes = document.querySelectorAll(".selectCheckbox");
  if (
    remainingCheckboxes.length === 0 ||
    !document.querySelector(".selectCheckbox:checked")
  ) {
    const selectColumn = document.querySelectorAll(".selectColumn");
    selectColumn.forEach((column) => column.classList.add("hidden"));

    const selectColumnHeader = document.getElementById("selectColumn");
    selectColumnHeader.classList.add("hidden");

    selectBtn.textContent = "Select";
  }
});
