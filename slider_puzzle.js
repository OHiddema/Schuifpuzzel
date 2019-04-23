var tabel = document.getElementById("MyTable");
var a = [];

// HTML table is built up dynamically
for (i = 0; i < 4; i++) {
  myRow = tabel.appendChild(document.createElement("tr"));
  for (j = 0; j < 4; j++) {
    myRow.appendChild(document.createElement("td"));
  }
}

// Naast de cijfers in 4 bij 4 tabel in HTML worden deze waarden daarnaast ook
//in een tweedimensionaal array a bijgehouden. Dit maakt het programmeren van
// het schuiven van de vakjes eenvoudiger.

// Het array a wordt gevuld met alle cijfers op de juiste plaats.
// Het vakje rechtsonder wordt gevuld met de waarde 16.
// Visueel (in HTML) blijft dit vakje leeg.
for (i = 0; i < 4; i++) {
  rowCells = tabel.rows[i].cells; // alle cellen in rij i
  a[i] = [];
  for (j = 0; j < 4; j++) {
    a[i][j] = 4 * i + j + 1;  // vul de cellen met de waardes 1 t/m 16.

    rowCells[j].onclick = function () {
      row = this.parentNode.rowIndex;  //row number
      col = this.cellIndex;  // column number
      if (this.innerHTML > 0) { // empty cell wasn't clicked

        //schuif omlaag indien mogelijk
        swap = false; //voorkomt meer dan 1x schuiven
        if (row < 3) {
          if (a[row + 1][col] == 16) {
            newrow = row + 1;
            newcol = col;
            swap = true;
          }
        }

        //schuif omhoog indien mogelijk
        if ((row > 0) && (swap == false)) {
          if (a[row - 1][col] == 16) {
            newrow = row - 1;
            newcol = col;
            swap = true;
          }
        }

        //schuif naar rechts indien mogelijk
        if ((col < 3) && (swap == false)) {
          if (a[row][col + 1] == 16) {
            newrow = row;
            newcol = col + 1;
            swap = true;
          }
        }

        //schuif naar links indien mogelijk
        if ((col > 0) && (swap == false)) {
          if (a[row][col - 1] == 16) {
            newrow = row;
            newcol = col - 1;
            swap = true;
          }
        }

        if (swap == true) {
          // voer de verandering door in de 2D array a
          [a[row][col], a[newrow][newcol]] = [a[newrow][newcol], a[row][col]];
          // EN voer de verandering door in HTML
          tabel.rows[newrow].cells[newcol].innerHTML = this.innerHTML;
          this.innerHTML = "";
          checkInPlace(newrow, newcol);
          checkInPlace(row, col);
        }
      }
    }
  }
}

// De puzzel wordt door elkaar gehusseld door vanuit opgeloste toestand
// 100 maal twee willeukeurige cijfers in de puzzel te verwisselen.
// Alleen door dit een even aantal maal te doen, is de puzzel oplosbaar!
for (k = 0; k < 100; k++) {
  n1 = Math.floor(15 * Math.random());
  n2 = Math.floor(14 * Math.random());
  if (n2 >= n1) {
    n2 = n2 + 1;
  }
  row1 = Math.floor(n1 / 4);
  row2 = Math.floor(n2 / 4);
  col1 = n1 % 4;
  col2 = n2 % 4;
  [a[row1][col1], a[row2][col2]] = [a[row2][col2], a[row1][col1]];
}

// zet de door elkaar gehusselde puzzel op de pagina
for (i = 0; i < 4; i++) {
  rowCells = tabel.rows[i].cells; // all cells in row i
  for (j = 0; j < 4; j++) {
    if (!(a[i][j] == 16)) {
      rowCells[j].innerHTML = a[i][j]; //fill cell with number
      checkInPlace(i, j);
    }
  }
}

function checkInPlace(i, j) {
  if (a[i][j] == 4 * i + j + 1) {
    tabel.rows[i].cells[j].style.backgroundColor = "yellow";
  }
  else {
    tabel.rows[i].cells[j].style.backgroundColor = "lightblue"
  }
}