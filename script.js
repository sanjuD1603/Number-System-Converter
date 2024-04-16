function updateLabels() {
    const selectIn = document.getElementById("selectIn");
    const inputLabel = document.querySelector("label[for='input']");
    const outputLabel = document.querySelector("label[for='output']");

    switch (selectIn.value) {
        case "d":
            inputLabel.textContent = "Decimal:";
            break;
        case "h":
            inputLabel.textContent = "Hexadecimal:";
            break;
        case "o":
            inputLabel.textContent = "Octal:";
            break;
        case "b":
            inputLabel.textContent = "Binary:";
            break;
    }

    switch (selectOut.value) {
        case "d":
            outputLabel.textContent = "Decimal:";
            break;
        case "h":
            outputLabel.textContent = "Hexadecimal:";
            break;
        case "o":
            outputLabel.textContent = "Octal:";
            break;
        case "b":
            outputLabel.textContent = "Binary:";
            break;
    }
}
function convert() {
    const selectIn = document.getElementById("selectIn");
    const selectOut = document.getElementById("selectOut");
    const input = document.getElementById("input");
    const output = document.getElementById("output");

    let inputtedVal = Number(input.value.trim());
    if (!Number.isInteger(inputtedVal)) {
        output.value = "";
        return;
    }

    let inputBase;
    let outputBase;
    switch (selectIn.value) {
        case "d":
            inputBase = 10;
            break;
        case "h":
            inputBase = 16;
            break;
        case "o":
            inputBase = 8;
            break;
        case "b":
            inputBase = 2;
            break;
    }

    switch (selectOut.value) {
        case "d":
            outputBase = 10;
            break;
        case "h":
            outputBase = 16;
            break;
        case "o":
            outputBase = 8;
            break;
        case "b":
            outputBase = 2;
            break;
    }

    let result;
    if (inputBase === 8 && outputBase === 2) {
        // convert octal to binary
        let binary = "";
        for (let i = 0; i < input.value.length; i++) {

            const octalDigit = parseInt(input.value[i], 8);
            const binaryDigit = octalDigit.toString(2).padStart(3, "0");
            binary += binaryDigit;
        }
        result = binary;
    } else {
        // convert to decimal first
        let decimal = parseInt(input.value.trim(), inputBase);
        result = decimal.toString(outputBase);
    }

    // check if input and output types are same
    if (selectIn.value === selectOut.value) {
        output.value = input.value;
        return;
    }

    // check if input and output bases are the same
    if (inputBase === outputBase) {
        output.value = result;
        return;
    }

    output.value = result.toUpperCase();;
    updateLabels(); // update the output label
}


function reset() {
    document.getElementById("input").value = "";
    document.getElementById("output").value = "";
}

document.addEventListener("DOMContentLoaded", function() {
    updateLabels();
    const selectIn = document.getElementById("selectIn");
    const selectOut = document.getElementById("selectOut");
    selectIn.addEventListener("change", updateLabels);
    selectOut.addEventListener("change", updateLabels);
    const convertBtn = document.querySelector("button[data-action='convert']");
    convertBtn.addEventListener("click", convert);
    const resetBtn = document.querySelector("button[data-action='reset']");
    resetBtn.addEventListener("click", reset);
});
