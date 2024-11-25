
        // Function to generate input fields for the matrix based on the specified order
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

        // Function to perform LDU factorization
        function performLDU() {
            const order = parseInt(document.getElementById("matrixOrder").value);
            let matrix = [];

            // Get the matrix values from the inputs
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

            let resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = "<h3>Steps of LDU Factorization:</h3>";

            // Step-by-step elimination process
            for (let i = 0; i < order; i++) {
                // Elimination for each row below the main diagonal
                for (let j = i + 1; j < order; j++) {
                    let factor = U[j][i] / U[i][i];
                    L[j][i] = factor; // Store in L matrix

                    for (let k = 0; k < order; k++) {
                        U[j][k] -= factor * U[i][k];
                    }

                    // Display the Eij (Elimination matrix) process
                    displayEliminationMatrix(j, i, factor, `E${j + 1}${i + 1} Process`);
                }
                D[i][i] = U[i][i]; // Store the diagonal element in D matrix
                U[i] = U[i].map((val) => val / U[i][i]); // Normalize U's row for D matrix

                // Display L and U matrices together at each step
                displayMatrices(L, U, `Step ${i + 1}: Transformation of L and U Matrices`);
            }

            // Fill in the L diagonal with 1's for a standard L matrix
            for (let i = 0; i < order; i++) {
                L[i][i] = 1;
            }

            // Final matrices
            displayMatrix(L, "Final L Matrix");
            displayMatrix(D, "Final D Matrix");
            displayMatrix(U, "Final U Matrix");

            // Verify that L * D * U = original matrix
            let LDU = multiplyMatrices(multiplyMatrices(L, D), U);
            displayMatrix(LDU, "L * D * U Matrix (Should be equal to original)");

            // Function to display the elimination process (Eij matrix)
            function displayEliminationMatrix(row, col, factor, title) {
                let E = Array.from({ length: order }, (_, i) =>
                    Array.from({ length: order }, (_, j) => (i === j ? 1 : 0))
                );
                E[row][col] = -factor;

                let html = `<h4>${title}</h4><table>`;
                for (let r of E) {
                    html += "<tr>";
                    for (let elem of r) {
                        html += `<td>${elem.toFixed(2)}</td>`;
                    }
                    html += "</tr>";
                }
                html += "</table>";

                resultsDiv.innerHTML += html;
            }

            // Function to display L and U matrices together
            function displayMatrices(L, U, title) {
                let html = `<h4>${title}</h4><div style="display: flex; gap: 20px;">`;

                // Display L matrix
                html += "<div><strong>L Matrix</strong><table>";
                for (let row of L) {
                    html += "<tr>";
                    for (let elem of row) {
                        html += `<td>${elem.toFixed(2)}</td>`;
                    }
                    html += "</tr>";
                }
                html += "</table></div>";

                // Display U matrix
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
                resultsDiv.innerHTML += html;
            }

            // Function to display a single matrix on the webpage
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
                resultsDiv.innerHTML += html;
            }
        }

        // Helper function to multiply two matrices
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
