let isReplayed = false;
let isPlayed = false;

// Функция для повтора игры
function replay()
{
  if (isReplayed) {
    isReplayed = false;
    button_replay.classList.remove('button_note_checked');

  } else{
    isReplayed = true;
    button_replay.classList.add('button_note_checked');
  }
}

// Функция для запуска игры
function play()
{
  if (!isPlayed) {  
    button_play.textContent = "Стоп";
    button_play.style.backgroundColor = "#3CB371";
    isPlayed = true;
    playAudioAsync(cur_chords_selected);
  }
  else {
    button_play.textContent = "Играть";
    button_play.style.backgroundColor = "#4671D5";
    isPlayed = false;
    if (typeof timeoutId !== 'undefined')
      clearTimeout(timeoutId);
    for (let i = 0; i < cur_chords_selected.length; i++)
    {
      let button_playchord = document.getElementById('b_chord_'+i);
      if (button_playchord.id != "b_chord_"+cur_chord_selected_id)
          button_playchord.style.backgroundColor = "#4671D5";
        else
          button_playchord.style.backgroundColor = "#6C8CD5";
    }
  }
}