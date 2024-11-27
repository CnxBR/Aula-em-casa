// Inputs - day month year
const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");

function calculate() {
  if (!(checkDay(day) && checkMonth(month) && checkYear(year))) return;

  // Calculation
  const birthday = `${year.value}-${month.value}-${day.value}`;
  const result = calculateAge(birthday);

  document.getElementById("resultDays").innerText = result.days;
  document.getElementById("resultMonths").innerText = result.months;
  document.getElementById("resultYears").innerText = result.years;
}

function calculateAge(birthday) {
  let years = new Date().getFullYear() - new Date(birthday).getFullYear();
  let months = new Date().getMonth() - new Date(birthday).getMonth();
  let days = new Date().getDate() - Number(day.value);

  /**
   * Se caso o resultado da subtração do mês for negativa, significa que
   * o mês de aniversário do usuário ainda vai ocorrer.
   *
   * Então, se diminui um ano para ter a idade atual e soma 12 meses para
   * se ter quantos meses se passaram.
   */
  if (months < 0) {
    years--; // years -= 1;
    months += 12;
  }

  /**
   * Se o dia for maior que o atual (Ex: dia 15 e hoje é dia 13)
   * o resultado da subtração será negativo.
   *
   * Sendo então necessário somar o total de dias do mês anterior para
   * contabilizar quantos dias já se passaram.
   */
  if (days < 0) {
    days += monthTotalDays(year.value, month.value - 1);
  }

  return {
    years,
    months,
    days,
  };
}

function check(event) {
  const input = event.target;
  const date = input.id;

  const validations = {
    day: () => checkDay(input),
    month: () => checkMonth(input),
    year: () => checkYear(input),
  };

  
  if (input.value === "" || input.value === "0") {
    return error(event.target, "This field is required");
  }

  const isValid = validations[date]();

  if (!isValid) {
    if (date === "year") {
      if (day.value === "" || month.value === "")
        return error(input, "Please fill the day and month");

      return error(input, "Must be in past");
    }

    return error(input, `Must be a valid ${date}`);
  }

  /**
   * Reverte os estilos de borda e texto caso tenha ocorrido um erro
   * para que o erro não siga exibindo na página.
   */
  input.style.border = "";
  input.nextElementSibling.innerText = "";
}

function checkDay(input) {
  const day = input.value;
  const monthDays = monthTotalDays(year.value, month.value);

  if (day > monthDays || day < 1) return false;

  return true;
}

function checkMonth(input) {
  const month = input.value;

  if (month > 12 || month < 1) return false;

  return true;
}

function checkYear(input) {
  const today = new Date().setHours(0, 0, 0, 0);
  const birthday = new Date(
    `${input.value}-${month.value}-${day.value}`
  ).setHours(0, 0, 0, 0);

  if (birthday <= today) return true;

  return false;
}

function monthTotalDays(year, month) {
  return new Date(year, month, 0).getDate();
}

function error(elem, msg) {
  elem.style.border = "0.5px solid var(--Light-red)";
  elem.nextElementSibling.innerText = msg;
}

