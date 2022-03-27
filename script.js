function validate(width) {
  const label = document.getElementsByClassName("width-error-message")[0];

  // clean up error message
  label.textContent = "";

  return new Promise((resolve) => {
    if (!width || width < 1) {
      // set error message
      label.textContent = "Diamond Width not valid";
      resolve(false);
    } else if (width % 2 == 0) {
      // set error message
      label.textContent = "Diamond Width must be odd";
      resolve(false);
    } else {
      resolve(true);
    }
  });
}

async function printDiamond(event) {
  // prevent form submission
  event.preventDefault();

  // get elements and input value
  const input = document.getElementById("width");
  const canvas = document.getElementById("canvas");
  const width = input.value;

  // clean up canvas
  canvas.innerHTML = "";

  // to validate Diamond Width
  // Diamond Width must be odd
  const isValid = await validate(width);
  if (!isValid) {
    return;
  }

  const totalRow = width;
  const totalStar = width;

  for (let row = 0; row < totalRow; row++) {
    const lines = [];
    const center = parseInt(totalRow / 2);
    const start = row <= center ? center - row : center - (totalRow - row) + 1;
    const end = row <= center ? center + row : center + (totalRow - row) - 1;

    // append the "*" between the start and the end
    for (let star = 0; star < totalStar; star++) {
      if (star >= start && star <= end) {
        lines.push("*");
      } else {
        lines.push(" ");
      }
    }

    // create a block element to print every lines
    const divLine = document.createElement("div");
    divLine.className = `row-${row}`;
    divLine.innerHTML = lines.join("");

    // append every lines to the canvas
    canvas.appendChild(divLine);

    // focus to the input
    input.focus();
  }
}
