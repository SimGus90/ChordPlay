const more = document.getElementById('m_help');
const m_levels = document.getElementById('m_levels');
const modal = document.getElementById('modal');
const close_modal= document.getElementById('close_modal');
const modal_header_h2 = document.getElementById('modal_header_h2');
const modal_body = document.getElementById('modal_body');

// Модальное окно Помощь
more.addEventListener('click', function() {
  modal.style.display = 'block';
  modal.classList.add('modal-animation');

  modal_header_h2.textContent = "Инструкция для пользователя";
  modal_body.innerHTML='';

  modal_body.insertAdjacentHTML('beforeend', '<p>1 - В разделе Тоника выбирается опорная нота аккорда</p>');
  modal_body.insertAdjacentHTML('beforeend', '<p>2 - В разделе Свойство выбирается модификация аккорда</p>');
  modal_body.insertAdjacentHTML('beforeend', '<p>3 - Таблица показывает расположение нот на гитаре, а также ноты выбранного аккорда</p>');
  modal_body.insertAdjacentHTML('beforeend', '<p>4 - Выбранный аккорд можно добавить, убрать и изменить его расположение на грифе гитары (лад)</p>');
  modal_body.insertAdjacentHTML('beforeend', '<p>5 - Созданная последовательность аккордов может быть воспроизведена кнопкой "Играть",  зациклена кнопкой "Повтор". Также можно менять bpm</p>');
  modal_body.insertAdjacentHTML('beforeend', '<p>6 - В разделе Уровни можно выбрать подходящую по сложности последовательность аккордов</p>');
});
close_modal.addEventListener('click', function() {
  modal.style.display = 'none';
  modal.classList.remove('modal-animation');
});

// Модальное окно Уровни
m_levels.addEventListener('click', function() {
  modal.style.display = 'block';
  modal.classList.add('modal-animation');

  modal_header_h2.textContent = "Последовательности аккордов";
  modal_body.innerHTML='';

  for (let i = 0; i < mydata.length; i++)
  {
    str = mydata[i][0]["name"] + ": ";
    for (let j = 2; j < mydata[i].length; j++) // 2: после name и bpm
    {
      str = str + mydata[i][j]["chord_name"] + mydata[i][j]["chord_type"] + " ";
    }
    
    modal_body.insertAdjacentHTML('beforeend', `<button id="b_level_${i}" style="width: 100%; text-align: left;">${str}</button>`);
    let b = document.getElementById(`b_level_${i}`);
    b.addEventListener('click', function() {
      selectLevel(i);
    });
  }
});
close_modal.addEventListener('click', function() {
  modal.style.display = 'none';
  modal.classList.remove('modal-animation');
});

// Функция для выбора уровня в модальном окне Уровни
function selectLevel(id) {
    mydata = JSON.parse(data);
    cur_chords_selected = new Array();

    for (let i = 2; i < mydata[id].length; i++) // 2: после name и bpm
    {
        chord_selected = notes_octave.indexOf(mydata[id][i]["chord_name"]);
        chord_type_selected = arr_chord_types[mydata[id][i]["chord_type"]];
        cur_chord_type_name = mydata[id][i]["chord_type"];
        fret_cur = mydata[id][i]["fret"];

        update_Chord();
        
        searchNoteRowsCols(0);
        
        cur_chords_selected.push({chord_name: mydata[id][i]["chord_name"], chord_type: mydata[id][i]["chord_type"], note_row: note_row, note_col: note_col, fret: mydata[id][i]["fret"]});
    }

    cur_BPM = mydata[id][1]["bpm"];
    value_BPM.textContent = cur_BPM;

    cur_chord_selected_id = 0;
    reset_NoteAndType(cur_chord_selected_id);
    set_ChordNameAndType(cur_chord_selected_id);
    update_Chord();
    update_Chords_Tab();
    cur_chord_selected_id = -1;
    update_Chords_Buttons();
    update_Table();
}