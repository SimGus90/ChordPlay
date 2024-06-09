function reset_NoteStyles() {
    button_A.classList.remove('button_note_checked');
    button_Ab.classList.remove('button_note_checked');
    button_B.classList.remove('button_note_checked');
    button_C.classList.remove('button_note_checked');
    button_Cb.classList.remove('button_note_checked');
    button_D.classList.remove('button_note_checked');
    button_Db.classList.remove('button_note_checked');
    button_E.classList.remove('button_note_checked');
    button_F.classList.remove('button_note_checked');
    button_Fb.classList.remove('button_note_checked');
    button_G.classList.remove('button_note_checked');
    button_Gb.classList.remove('button_note_checked');
}
  
function reset_NoteTypeStyles() {
    button_maj.classList.remove('button_note_type_checked');
    button_min.classList.remove('button_note_type_checked');
    button_7.classList.remove('button_note_type_checked');
    button_5.classList.remove('button_note_type_checked');
    button_dim.classList.remove('button_note_type_checked');
    button_dim7.classList.remove('button_note_type_checked');
}

function set_Note(note) {
    chord_selected = notes_octave.indexOf(note);
    update_Chord();
    update_Table();
  
    update_cur_chord_params();
    update_Chords_Tab();
    update_Chords_Buttons();
  
    reset_NoteStyles();
    this.classList.add('button_note_checked');
}
  
function set_ChordType(type) {
    chord_type_selected = arr_chord_types[type];
    cur_chord_type_name = type;
    update_Chord();
    update_Table();
  
    update_cur_chord_params();
    update_Chords_Tab();
    update_Chords_Buttons();
  
    reset_NoteTypeStyles();
    this.classList.add('button_note_type_checked');
}