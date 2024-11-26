function drawSignals() {
    const bitString = document.getElementById("bits").value;
    const canvas = document.getElementById("encodingChart");
    const ctx = canvas.getContext("2d");

    // Ajustar el tamaño del canvas para que haya más espacio hacia arriba
    const canvasHeight = 700;  // Aumenta la altura del canvas
    canvas.height = canvasHeight;

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Parámetros de la gráfica
    const widthPerBit = 50;
    const height = 30;
    const spacing = 120;  // Aumentar el espaciado entre las gráficas

    // Cálculo del ancho total de la gráfica
    const totalWidth = bitString.length * widthPerBit;
    const startX = (canvas.width - totalWidth) / 2; // Centrar la gráfica horizontalmente
    const startY = 100;  // Asegura que la gráfica no esté demasiado cerca de la parte superior

    // Dibujar los bits en la parte superior
    ctx.font = "18px Arial";
    ctx.fillStyle = '#333333';
    ctx.fillText("Bits: " + bitString, startX, startY - 10);

    // Dibujar cada codificación
    drawNRZI(ctx, bitString, startX, startY + spacing * 0, widthPerBit, height);
    drawManchester(ctx, bitString, startX, startY + spacing * 1, widthPerBit, height);
    drawManchesterDifferential(ctx, bitString, startX, startY + spacing * 2, widthPerBit, height);
    drawAMI(ctx, bitString, startX, startY + spacing * 3, widthPerBit, height);
    drawPseudoternary(ctx, bitString, startX, startY + spacing * 4, widthPerBit, height);
}

function drawDottedLines(ctx, x, y, width, totalBits) {
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = '#B0B0B0'; // Color de las líneas punteadas
    for (let i = 0; i <= totalBits; i++) {
        ctx.beginPath();
        ctx.moveTo(x + i * width, y - 20);
        ctx.lineTo(x + i * width, y + 300);
        ctx.stroke();
    }
    ctx.setLineDash([]);
}

function drawNRZI(ctx, bits, x, y, width, height) {
    ctx.fillStyle = '#1E90FF';
    ctx.fillText("NRZI", x - 40, y + height / 2);
    let currentY = bits[0] === "1" ? y : y + height;
    drawDottedLines(ctx, x, y, width, bits.length);

    for (let i = 0; i < bits.length; i++) {
        ctx.beginPath();
        ctx.moveTo(x, currentY);
        ctx.lineTo(x + width, currentY);
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#1E90FF';
        ctx.stroke();

        if (bits[i] === "1") {
            currentY = currentY === y ? y + height : y;
            ctx.lineTo(x + width, currentY);
            ctx.strokeStyle = '#1E90FF';
            ctx.stroke();
        }
        x += width;
    }
}

function drawManchester(ctx, bits, x, y, width, height) {
    ctx.fillStyle = '#FF6347';
    ctx.fillText("Manchester",  x - 90, y + height / 2);
    drawDottedLines(ctx, x, y, width, bits.length);

    for (let i = 0; i < bits.length; i++) {
        ctx.beginPath();
        if (bits[i] === "1") {
            ctx.moveTo(x, y + height);
            ctx.lineTo(x, y);
            ctx.lineTo(x + width / 2, y);
            ctx.lineTo(x + width / 2, y + height);
            ctx.lineTo(x + width, y + height);
            ctx.strokeStyle = '#FF6347';
        } else {
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + height);
            ctx.lineTo(x + width / 2, y + height);
            ctx.lineTo(x + width / 2, y);
            ctx.lineTo(x + width, y);
            ctx.strokeStyle = '#FF6347';
        }
        ctx.lineWidth = 4;
        ctx.stroke();
        x += width;
    }
}

function drawManchesterDifferential(ctx, bits, x, y, width, height) {
    ctx.fillStyle = '#32CD32';
    ctx.fillText("Manchester Dif.",  x - 120, y + height / 2);
    let prevHigh = false;
    drawDottedLines(ctx, x, y, width, bits.length);

    for (let i = 0; i < bits.length; i++) {
        ctx.beginPath();
        const currentHigh = bits[i] === "1" ? !prevHigh : prevHigh;

        if (currentHigh) {
            ctx.moveTo(x, y + height);
            ctx.lineTo(x, y);
            ctx.lineTo(x + width / 2, y);
            ctx.lineTo(x + width / 2, y + height);
            ctx.lineTo(x + width, y + height);
            ctx.strokeStyle = '#32CD32';
        } else {
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + height);
            ctx.lineTo(x + width / 2, y + height);
            ctx.lineTo(x + width / 2, y);
            ctx.lineTo(x + width, y);
            ctx.strokeStyle = '#32CD32';
        }
        ctx.lineWidth = 4;
        ctx.stroke();
        prevHigh = currentHigh;
        x += width;
    }
}

function drawAMI(ctx, bits, x, y, width, height) {
    ctx.fillStyle = '#8A2BE2';
    ctx.fillText("AMI", x - 40, y + height / 2);
    let lastNonZero = y + height;
    drawDottedLines(ctx, x, y, width, bits.length);

    for (let i = 0; i < bits.length; i++) {
        ctx.beginPath();
        if (bits[i] === "1") {
            lastNonZero = lastNonZero === y ? y + height : y;
            ctx.moveTo(x, y + height / 2);
            ctx.lineTo(x, lastNonZero);
            ctx.lineTo(x + width, lastNonZero);
            ctx.lineTo(x + width, y + height / 2);
            ctx.strokeStyle = '#8A2BE2';
        } else {
            ctx.moveTo(x, y + height / 2);
            ctx.lineTo(x + width, y + height / 2);
            ctx.strokeStyle = '#8A2BE2';
        }
        ctx.lineWidth = 4;
        ctx.stroke();
        x += width;
    }
}

function drawPseudoternary(ctx, bits, x, y, width, height) {
    ctx.fillStyle = '#FF8C00';
    ctx.fillText("Pseudoternario", x - 130, y + height / 2);
    let lastNonZero = y + height;
    drawDottedLines(ctx, x, y, width, bits.length);

    for (let i = 0; i < bits.length; i++) {
        ctx.beginPath();
        if (bits[i] === "0") {
            lastNonZero = lastNonZero === y ? y + height : y;
            ctx.moveTo(x, y + height / 2);
            ctx.lineTo(x, lastNonZero);
            ctx.lineTo(x + width, lastNonZero);
            ctx.lineTo(x + width, y + height / 2);
            ctx.strokeStyle = '#FF8C00';
        } else {
            ctx.moveTo(x, y + height / 2);
            ctx.lineTo(x + width, y + height / 2);
            ctx.strokeStyle = '#FF8C00';
        }
        ctx.lineWidth = 4;
        ctx.stroke();
        x += width;
    }
}
document.getElementById("bits").addEventListener("input", function (event) {
    const input = event.target;
    const originalValue = input.value;
    const validValue = originalValue.replace(/[^01]/g, ""); // Elimina caracteres no válidos

    if (originalValue !== validValue) {
        alert("Solo se permiten los dígitos 0 y 1.");
        input.value = validValue; // Actualiza el valor del campo con solo los dígitos válidos
    }
});