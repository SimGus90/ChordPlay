const l_chord = document.getElementById('l_chord');
// Функция для обновления названия выбранного аккорда
function render_SelectedChordName() {
  let chordText = notes_octave[chord_selected] + cur_chord_type_name;
  l_chord.textContent = chordText;
}
  
function reset_NoteAndType(i)
{
    let button_note = document.getElementById('b_'+cur_chords_selected[i]["chord_name"]);
    reset_NoteStyles();
    button_note.classList.add('button_note_checked');
    let button_chord = document.getElementById('b_'+cur_chords_selected[i]["chord_type"]);
    reset_NoteTypeStyles();
    button_chord.classList.add('button_note_type_checked');
  
    fret_cur = cur_chords_selected[i]["fret"];
    value_fret.textContent = cur_chords_selected[i]["fret"];
}

function createHiPPICanvas(width, height) {
    let ratio = window.devicePixelRatio;
    let canvas = document.createElement("canvas");

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    
    canvas.getContext("2d").scale(ratio, ratio);

    return canvas;
}

function render_Table(arr_notes_all, note_row, note_col)
{
  let canvas = createHiPPICanvas(800, 200);

  if (canvas.getContext)
  {
    let ctx = canvas.getContext('2d');

    let offset = 20;

    // Расстояние между линиями
    let line_H_height = 150 / arr_notes_all.length;
    let line_V_height = 600 / arr_notes_all[0].length;

    // Рисование фона
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.rect(20, 20, 600, 150);
    ctx.fillStyle = 'white'; 
    ctx.fill();

    // Рисование горизонтальных линий
    for (let i = 0; i <= 6; i++) {
      ctx.beginPath();
      ctx.moveTo(0 + offset, i * line_H_height + offset);
      ctx.lineTo(600 + offset, i * line_H_height + offset);
      ctx.stroke();
    }

    // Рисование вертикальных линий
    for (let i = 0; i <= arr_notes_all[0].length; i++) {
      ctx.beginPath();
      ctx.moveTo(i * line_V_height + offset, 0 + offset);
      ctx.lineTo(i * line_V_height + offset, 150 + offset);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(27.2 + offset, 0 + offset);
    ctx.lineTo(27.2 + offset, 150 + offset);
    ctx.stroke();

    ctx.font = "16px sans-serif";

    for (let i = 0; i < arr_notes_all[1].length; i++)
    {
      for (let j = 0; j < arr_notes_all.length; j++)
      {
        let cell = document.createElement('tr');
        text = arr_notes_all[j][i];
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'black'; 
        ctx.fillText(text, i * 27.25 + 25,  j * 25 + 40);

        for (let ii = 0; ii < note_row.length; ii++)
        {
          if (j == note_row[ii] && i == note_col[ii])
          {
            
            if (i == 0) // цвет нот для нулевого лада
            {
              ctx.fillStyle = 'blue';
              ctx.strokeStyle = 'orange';
            }
            else
            {
              ctx.fillStyle = 'orange';
              ctx.strokeStyle = 'blue';
            }

            ctx.beginPath();
            ctx.globalAlpha = 0.5; // Устанавливаем полупрозрачность           
            ctx.arc(i * 27.25 + 34, j * 25 + 33, 12, 0, 2 * Math.PI);
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        }
      }
    }

    for (let i = 0; i < arr_notes_all[1].length; i++)
    {
      if (i == 0 || i == 3 || i == 5 || i == 7 || i == 9 || i == 12 || i == 15 || i == 18 || i == 20)
      {
        text = i;
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'black'; 
        ctx.fillText(text, i * 27.25 + 25,   15);
      }
    }

  }

  div = document.getElementById('div_table')
  div.innerHTML = '';

  div.appendChild(canvas);
}

function render_Canvases(){
  render_Table(arr_notes_all, note_row, note_col);
  for (let i = 0; i < cur_chords_selected.length; i++)
  {
    update_Chords_Tab();
  }
}

function render_Tab(rows, cols, chordName, chordType) {
  let canvasSize = 140;
  let canvas = createHiPPICanvas(canvasSize, canvasSize);

  let offset = 20;
  
  let addCol = Math.max(...cols) - 2;
  let midCol = Math.max(...cols) - 1;

  if (canvas.getContext) {
    let ctx = canvas.getContext('2d');
    
    // Размеры квадрата
    let squareSize = 100;
    
    // Расстояние между линиями
    let line_H_height = 100 / 5;
    let line_V_height = 100 / 3;
    
    // Рисование горизонтальных линий
    for (let i = 0; i <= 5; i++) {
      ctx.beginPath();
      ctx.moveTo(0 + offset, i * line_H_height + offset);
      ctx.lineTo(100 + offset, i * line_H_height + offset);
      ctx.stroke();
    }

    // Рисование вертикальных линий
    for (let i = 0; i <= 3; i++) {
      ctx.beginPath();
      ctx.moveTo(i * line_V_height + offset, 0 + offset);
      ctx.lineTo(i * line_V_height + offset, 100 + offset);
      ctx.stroke();
    }

    circle_radius = 5;

    let chordText = chordName + chordType;
    let chordText_width = ctx.measureText(chordText).width;
    let fretText_width = ctx.measureText(midCol).width;
    ctx.font = "16px serif";
    
    //Рисование x
    for (let i = 0; i <= 5; i++) {
      if (!rows.includes(i))
      {
        
        ctx.fillText("x", 5, i * offset + offset);
      }
    }
    // Рисование нот (кругов или нулей)
    for (let i = 0; i < rows.length; i++) {
      if (cols[i] == 0)
      {
        ctx.fillText("0", 5, rows[i] * offset + offset + 5);
      }
      else
      {
        ctx.beginPath();
        ctx.arc(line_V_height * (cols[i] + 1 - addCol) - 15 + offset, (line_H_height) * rows[i] + offset, circle_radius, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
    
    ctx.fillText(midCol, canvasSize / 2 - fretText_width + 5, canvasSize);
    ctx.fillText(chordText, canvasSize / 2 - chordText_width,  15);
  }

  return canvas
}