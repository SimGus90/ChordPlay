let cur_chords_selected = new Array();
let cur_chord_selected_id = -1;
let note_row = new Array();
let note_col = new Array();
let cur_chord_type_name = "maj"; 
let fret_cur = 1;
let cur_BPM = 120;

let notes_octave = new Array('A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#');
let arr_notes_all = new Array('E', 'B', 'G', 'D', 'A', 'E');

for (let i = 0; i < arr_notes_all.length; i++) {
  let index = notes_octave.indexOf(arr_notes_all[i]);
  let notes = new Array();
  for (let j = 0; j < 22; j++) {
    notes.push(notes_octave[(j + index) % 12]);
  }
  arr_notes_all[i] = notes;
}

const arr_chord_types = {
    maj: [4, 3],
    min: [3, 4],
    7: [4, 3, 3],
    5: [7],
    dim: [3, 3],
    dim7: [3, 3, 3],
};

let chord_selected = notes_octave.indexOf('A');
let chord_type_selected = arr_chord_types['maj'];

let chord_selected_notes = new Array();

function update_Chord() {
  chord_selected_notes = new Array();
  chord_selected_notes.push(notes_octave[(chord_selected) % 12])
  let index = 0;
  for (let i = 0; i < chord_type_selected.length; i++) {
    index += chord_type_selected[i]
    chord_selected_notes.push(notes_octave[(chord_selected + index) % 12]);
  }

  render_SelectedChordName();
}

function update_cur_chord_params() {
  if (cur_chords_selected[cur_chord_selected_id]) {
    cur_chords_selected[cur_chord_selected_id]["chord_name"] = notes_octave[chord_selected];
    cur_chords_selected[cur_chord_selected_id]["note_row"] = note_row;
    cur_chords_selected[cur_chord_selected_id]["note_col"] = note_col;
    cur_chords_selected[cur_chord_selected_id]["chord_type"] = cur_chord_type_name;
    cur_chords_selected[cur_chord_selected_id]["fret"] = fret_cur;
  }
}

// Функция для поиска нот аккорда
function searchNoteRowsCols(offset)
{
  let arr_string_clamped = new Array();
  let k = 0;
  let arr = chord_selected_notes;
  note_row = new Array();
  note_col = new Array();

  let fret_firstNote = 99;
  let kk = arr.length;
  
  note_fret0 = new Array();

  for (let i = 0; i < arr_notes_all.length; i++)
  {
  note_fret0.push("");
  for (let kk = 0; kk < arr_notes_all.length; kk++)
    {
      if (arr_notes_all[i][0] == arr[kk])
      {
        note_fret0[i] = arr_notes_all[i][0];
      }
    }
  }

  for (let i = 0; i < arr_notes_all[1].length; i++)
  {
    for (let j = arr_notes_all.length - 1; j >= 0; j--)
    {
      for (let k = 0; k < kk; k++)
      {
        if (arr_notes_all[j][i] == arr[k] && !arr_string_clamped.includes(j) && i >= fret_cur + offset) // && j < fret_firstNote)
        {
          arr = arr.filter((number) => number !== arr[k]);
          arr_string_clamped.push(j);
          kk = arr.length;

          if (fret_firstNote == 99)
          {
            fret_firstNote = j;
          }

          if (note_fret0[j] == arr_notes_all[j][i] || arr_string_clamped.includes(j))
          {
            note_fret0[j] = "";
          }
          note_row.push(j);
          note_col.push(i);
        }
      }
    }
  }

  for (let i = 0; i < note_fret0.length; i++)
  {
    if (note_fret0[i] != "")
    {
      note_row.push(i);
      note_col.push(0);
    }
  }

  let note_col_without_0 = new Array();
  for (let i = 0; i < note_col.length; i++)
  {
    if (note_col[i] != 0) note_col_without_0.push(note_col[i])
  }

  arr = chord_selected_notes;

  for (let i = 0; i < note_row.length; i++)
  {
    if (arr.includes(arr_notes_all[note_row[i]][note_col[i]]))
    {
      arr = arr.filter((number) => number !== arr_notes_all[note_row[i]][note_col[i]]);
    }
  }
  if (arr.length > 0 || (Math.max(...note_col_without_0) - Math.min(...note_col_without_0)) > 3)
  {
    searchNoteRowsCols(-1);
  }
}

// Функция для обновления таблицы
function update_Table() {
  searchNoteRowsCols(0);
  render_Table(arr_notes_all, note_row, note_col);
}

// Функция для обновления блока табулатуры
function update_Chords_Tab() {
  div = document.getElementById('div_chords_tab')
  div.innerHTML = '';

  if (cur_chords_selected.length <= 0)
  {
    b = document.getElementById('b_print');
    b.style.visibility = 'collapse';
    hr = document.getElementById('hr_print');
    hr.style.visibility = 'collapse';
  }
  else
  {
    b = document.getElementById('b_print');
    b.style.visibility = 'visible';
    hr = document.getElementById('hr_print');
    hr.style.visibility = 'visible';
  }

  for (let i = 0; i < cur_chords_selected.length; i++)
  {
    let div_tab = document.createElement('div');
    div.appendChild(div_tab);

    let canvas = render_Tab(cur_chords_selected[i]["note_row"], cur_chords_selected[i]["note_col"], cur_chords_selected[i]["chord_name"], cur_chords_selected[i]["chord_type"]);
    canvas.id = "tab_" + i;
    div_tab.appendChild(canvas);
    div_tab.style.padding = "10px";
  }  
}

function set_ChordNameAndType(i)
{
  chord_selected = notes_octave.indexOf(cur_chords_selected[i]["chord_name"]);
  chord_type_selected = arr_chord_types[cur_chords_selected[i]["chord_type"]];
  cur_chord_type_name = cur_chords_selected[i]["chord_type"];
}

function update_Chords_Buttons() {
  div = document.getElementById('div_chords_buttons')
  div.innerHTML = '';

  for (let i = 0; i < cur_chords_selected.length; i++)
  {
    let chordText = cur_chords_selected[i]["chord_name"] + cur_chords_selected[i]["chord_type"];

    let button = document.createElement('button');
    button.id = "b_chord_"+i;
    button.style.fontSize = "larger";
    button.style.width = "80px";
    button.style.height = "80px";
    button.textContent = chordText;

    if (i == cur_chord_selected_id)
    {
      button.style.backgroundColor = "#6C8CD5";
      button.style.borderInlineColor = "orange";
      button.style.borderWidth = "5px";
    }

    button.addEventListener('click', function() {
      if (i == cur_chord_selected_id) cur_chord_selected_id = -1;
      else cur_chord_selected_id = i;

      set_ChordNameAndType(i);
      reset_NoteAndType(i);

      playAudio_Chord(cur_chords_selected[i]["note_row"], cur_chords_selected[i]["note_col"]);

      update_Chord();
      update_Table();

      update_Chords_Buttons();  
    }); 
    div.appendChild(button);
  }
}