// Функция для копирования Canvas
function cloneCanvas(oldCanvas) {
    //create a new canvas
    var newCanvas = document.createElement('canvas');
    var context = newCanvas.getContext('2d');

    //set dimensions
    newCanvas.width = oldCanvas.width;
    newCanvas.height = oldCanvas.height;

    //apply the old canvas to the new one
    context.drawImage(oldCanvas, 0, 0);

    //return the new canvas
    return newCanvas;
}

// Функция для печати текующей последовательности аккордов в файл
function printTab() {
    const printWindow = window.open('', 'Табулатура');
    printWindow.document.write('<html><head><title>Табулатура</title>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<div><label>bpm: '+cur_BPM+'</label></div>');

    for (let i = 0; i < cur_chords_selected.length; i++)
    {
      let id = document.getElementById('tab_' + i);
      let elem = cloneCanvas(id);
      printWindow.document.body.appendChild(elem);
    }

    printWindow.print();
    printWindow.close();
}