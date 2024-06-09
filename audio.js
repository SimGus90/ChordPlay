// Предварительная загрузка звуков нот в массив
let audio_note = [];
for (let i = 0; i < 6; i++) {
  audio_note.push(new Audio(`audio/${i}.mp3`));
}

// Функция для проигрывания звука одной ноты
function playAudio_Note(row,col) {
  let audio = new Audio(audio_note[row].src);
  audio.currentTime = col;
  audio.play();

  setTimeout(function() {
    audio.pause();
  }, 1000);
}

// Функция для проигрывания звука нескольких нот (аккорда)
function playAudio_Chord(rows,cols) {
  for (let i = rows.length - 1; i >= 0; i--) {
    setTimeout(() => {
        playAudio_Note(rows[i], cols[i]);
    }, 10 * (i)); // Установка задержки в 10 миллисекунд для каждой итерации
  }
}

// Функция для проигрывания всех аккордов (используется в play())
async function playAudioAsync(arr_rows, arr_cols) {

    if (isPlayed)
    {
      for (let i = 0; i < cur_chords_selected.length; i++)
      {
        let button_playchord = document.getElementById('b_chord_'+i);
        button_playchord.style.backgroundColor = "#FFAA00";
        button_playchord.style.transition = "background-color 0s ease";
        setTimeout(function() {   
          button_playchord.style.transition = "background-color 0.4s ease";
          if (button_playchord.id != "b_chord_"+cur_chord_selected_id)
            button_playchord.style.backgroundColor = "#4671D5";
          else
            button_playchord.style.backgroundColor = "#6C8CD5";
        }, 200);
        playAudio_Chord(cur_chords_selected[i]["note_row"], cur_chords_selected[i]["note_col"]);
        await new Promise(resolve => timeoutId = setTimeout(resolve, 60 / cur_BPM * 1000));
  
        if (i >= cur_chords_selected.length - 1)
        {
          if (isReplayed) i = 0 - 1; // i уже увеличен
          else play(); // остановка воспроизведения 
        }
      }
    }
  }