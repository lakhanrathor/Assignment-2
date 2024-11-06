// Function to get matrix input from user
function getMatrixInput() {
    return [
        [parseFloat(document.getElementById("m00").value), parseFloat(document.getElementById("m01").value), parseFloat(document.getElementById("m02").value)],
        [parseFloat(document.getElementById("m10").value), parseFloat(document.getElementById("m11").value), parseFloat(document.getElementById("m12").value)],
        [parseFloat(document.getElementById("m20").value), parseFloat(document.getElementById("m21").value), parseFloat(document.getElementById("m22").value)]  // Correctly capture values from a31, a32, a33
    ];
}
