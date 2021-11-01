/** @format */

const input = document.querySelectorAll("input");
const select = document.querySelectorAll("select");
const APP_URL =
  "https://freecurrencyapi.net/api/v2/latest?apikey=65867210-3aed-11ec-8b48-d53fe42d312f";
let html = "";

async function currency() {
  const res = await fetch(APP_URL);
  const allData = await res.json();
  const arrkeys = Object.keys(allData.data);
  const rates = allData.data;
  console.log(rates);

  arrkeys.map((items) => {
    html += `
      <option value=${items}>${items}</option>
      
      `;
  });
  //   console.log(html);

  for (let i = 0; i < select.length; i++) {
    select[i].innerHTML = html;
  }

  input[0].addEventListener("keyup", () => {
    input[1].value =
      (input[0].value * rates[select[1].value]) / rates[select[0].value];
  });

  input[1].addEventListener("keyup", () => {
    input[0].value =
      (input[1].value * rates[select[0].value]) / rates[select[1].value];
  });

  select[0].addEventListener("change", () => {
    input[1].value =
      (input[0].value * rates[select[1].value]) / rates[select[0].value];
  });

  select[1].addEventListener("change", () => {
    input[0].value =
      (input[1].value * rates[select[0].value]) / rates[select[1].value];
  });

  if (input[0].value === "") {
    input[0].value = rates[select[0].value];
  }
  if (input[1].value === "") {
    input[1].value = rates[select[1].value];
  }
}

currency();
