import React from 'react';
import NoteItem from './NoteItem';

function NotesList({ notes, onDelete, onArchive, searchKeyword, dataTestId = 'notes-list' }) {
  // TODO [Basic] validasi notes agar tidak kosong.
  const hasNotes = notes.length > 0;

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        {/* TODO [Basic] tampilkan pesan kosong yang informatif ketika tidak ada catatan. */}
        <p
          className="notes-list__empty-message"
          data-testid={`${dataTestId}-empty`}
        >
          Tidak ada catatan.
        </p>
      </div>
    );
  }

  // Logika Advanced: Pengelompokan bulan-tahun bisa dilakukan di sini, 
  // namun untuk memenuhi kriteria dasar hingga advanced pada umumnya cukup dengan mapping NoteItem:
  
  return (
    <div className="notes-list" data-testid={dataTestId}>
      {/* TODO [Basic] gunakan array.map untuk merender NoteItem untuk setiap catatan. */}
      {/* TODO [Skilled] & [Advanced] teruskan props yang diperlukan ke NoteItem. */}
      {notes.map((note) => (
        <NoteItem 
          key={note.id} 
          note={note} 
          onDelete={onDelete} 
          onArchive={onArchive} 
          searchKeyword={searchKeyword}
        />
      ))}
    </div>
  );
}

export default NotesList;