const checkboxes = document.getElementsByName("check");
const custom = document.querySelector(".custom");
const numberOfPeople = document.querySelector(".number-of-people");
const bill = document.querySelector(".bill-input");
const error = document.querySelector(".error");
const amount = document.querySelector(".tip__amount");
const total = document.querySelector(".tip__total");
const submit = document.querySelector(".submit");

function onlyOne(checkbox, event) {
  if (event) {
    if (event.code !== "Enter") {
      return;
    } else {
      selectTip(checkbox, true);
    }
  } else {
    selectTip(checkbox);
  }
}

function selectTip(checkbox, event) {
  checkboxes.forEach((tip) => {
    if (checkbox.type === "number") {
      tip.checked = false;
    } else if (checkbox.type === "checkbox") {
      if (event && tip === checkbox) {
        if (tip.checked === true) {
          checkbox.checked = false;
        } else {
          checkbox.checked = true;
        }
      }
      if (tip !== checkbox) {
        tip.checked = false;
        custom.value = "";
      }
    }
  });
  calculateTip();
}

function notZero() {
  if (numberOfPeople.value < 1) {
    error.style.display = "inline-block";
    numberOfPeople.style.border = "2px solid #ed4337";
    numberOfPeople.style.padding = "13px 16px";
    numberOfPeople.style.backgroundPosition = "left 16px top 13px";
  } else {
    error.style.display = "none";
    numberOfPeople.style.border = "";
    numberOfPeople.style.padding = "";
    numberOfPeople.style.backgroundPosition = "";
  }
}

function calculateTip() {
  let tipAmount = 0;
  let tipTotal = 0;
  if ((numberOfPeople.value > 0) & (bill.value > 0)) {
    if (custom.value < 1) {
      checkboxes.forEach((tip) => {
        if (tip.checked) {
          tipTotal =
            (parseFloat(bill.value) +
              (parseFloat(bill.value) *
                parseInt(tip.nextElementSibling.innerText)) /
                100) /
            parseInt(numberOfPeople.value);
          tipAmount =
            (parseFloat(bill.value) *
              parseInt(tip.nextElementSibling.innerText)) /
            100 /
            parseInt(numberOfPeople.value);

          amount.innerText = `$${tipAmount.toFixed(2)}`;
          total.innerText = `$${tipTotal.toFixed(2)}`;
          submit.disabled = false;
        }
      });
    } else {
      tipTotal =
        (parseFloat(bill.value) +
          (parseFloat(bill.value) * parseInt(custom.value)) / 100) /
        parseInt(numberOfPeople.value);
      tipAmount =
        (parseFloat(bill.value) * parseInt(custom.value)) /
        100 /
        parseInt(numberOfPeople.value);

      amount.innerText = `$${tipAmount.toFixed(2)}`;
      total.innerText = `$${tipTotal.toFixed(2)}`;
      submit.disabled = false;
    }
  }
}

function reset() {
  bill.value = "";
  numberOfPeople.value = "";
  checkboxes.forEach((tip) => {
    tip.checked = false;
  });
  custom.value = "";
  amount.innerText = "$0.00";
  total.innerText = "$0.00";
  submit.disabled = true;
}
