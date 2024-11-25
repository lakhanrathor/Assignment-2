function generateMatrixInput() {
    const order = parseInt(document.getElementById("matrixOrder").value);
    const matrixInput = document.getElementById("matrixInput");
    matrixInput.innerHTML = "";

    if (order && order > 1) {
        const table = document.createElement("table");
        for (let i = 0; i < order; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < order; j++) {
                const cell = document.createElement("td");
                const input = document.createElement("input");
                input.type = "number";
                input.id = `element-${i}-${j}`;
                input.style.width = "50px";
                cell.appendChild(input);
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        matrixInput.appendChild(table);
    }
}

function performLDU() {
    const order = parseInt(document.getElementById("matrixOrder").value);
    let matrix = [];
    for (let i = 0; i < order; i++) {
        let row = [];
        for (let j = 0; j < order; j++) {
            row.push(parseFloat(document.getElementById(`element-${i}-${j}`).value));
        }
        matrix.push(row);
    }

    let L = Array.from({ length: order }, (_, i) => Array(order).fill(0));
    let U = JSON.parse(JSON.stringify(matrix));
    let D = Array.from({ length: order }, (_, i) => Array(order).fill(0));

    let eliminationSteps = [];
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    for (let i = 0; i < order; i++) {
        for (let j = i + 1; j < order; j++) {
            let factor = U[j][i] / U[i][i];
            L[j][i] = factor;

            for (let k = 0; k < order; k++) {
                U[j][k] -= factor * U[i][k];
            }

            eliminationSteps.push(createEliminationMatrix(order, j, i, factor, `E${j + 1}${i + 1}`));
        }
        D[i][i] = U[i][i];
        U[i] = U[i].map((val) => val / U[i][i]);
        displayMatrices(L, U, `Step ${i + 1}: Transformation of L and U Matrices`);
    }

    for (let i = 0; i < order; i++) {
        L[i][i] = 1;
    }

    displayEliminationSteps(eliminationSteps); // Elimination matrices displayed first
    resultsDiv.innerHTML += "<h3>Steps of LDU Factorization:</h3>"; // Steps follow
    displayMatrix(L, "Final L Matrix");
    displayMatrix(D, "Final D Matrix");
    displayMatrix(U, "Final U Matrix");

    let LDU = multiplyMatrices(multiplyMatrices(L, D), U);
    displayMatrix(LDU, "L * D * U Matrix (Should be equal to original)");
}

function createEliminationMatrix(order, row, col, factor, title) {
    let E = Array.from({ length: order }, (_, i) =>
        Array.from({ length: order }, (_, j) => (i === j ? 1 : 0))
    );
    E[row][col] = -factor;

    return { title, matrix: E };
}

function displayEliminationSteps(steps) {
    let resultsDiv = document.getElementById("results");
    let html = "<h3>Elimination Matrices (Eij):</h3>";
    steps.forEach(({ title, matrix }) => {
        html += `<h4>${title}</h4><table>`;
        for (let row of matrix) {
            html += "<tr>";
            for (let elem of row) {
                html += `<td>${elem.toFixed(2)}</td>`;
            }
            html += "</tr>";
        }
        html += "</table>";
    });
    resultsDiv.innerHTML += html;
}

function displayMatrices(L, U, title) {
    let html = `<h4>${title}</h4><div style="display: flex; gap: 20px;">`;
    html += "<div><strong>L Matrix</strong><table>";
    for (let row of L) {
        html += "<tr>";
        for (let elem of row) {
            html += `<td>${elem.toFixed(2)}</td>`;
        }
        html += "</tr>";
    }
    html += "</table></div>";
    html += "<div><strong>U Matrix</strong><table>";
    for (let row of U) {
        html += "<tr>";
        for (let elem of row) {
            html += `<td>${elem.toFixed(2)}</td>`;
        }
        html += "</tr>";
    }
    html += "</table></div>";
    html += "</div>";
    document.getElementById("results").innerHTML += html;
}

function displayMatrix(matrix, title) {
    let html = `<h4>${title}</h4><table>`;
    for (let row of matrix) {
        html += "<tr>";
        for (let elem of row) {
            html += `<td>${elem.toFixed(2)}</td>`;
        }
        html += "</tr>";
    }
    html += "</table>";
    document.getElementById("results").innerHTML += html;
}

function multiplyMatrices(A, B) {
    const rowsA = A.length, colsA = A[0].length;
    const rowsB = B.length, colsB = B[0].length;
    if (colsA !== rowsB) throw new Error("Matrix multiplication dimension mismatch");

    let result = Array.from({ length: rowsA }, () => Array(colsB).fill(0));
    for (let i = 0; i < rowsA; i++) {
        for (let j = 0; j < colsB; j++) {
            for (let k = 0; k < colsA; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    return result;
}
