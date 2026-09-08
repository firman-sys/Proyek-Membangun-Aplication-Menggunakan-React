import React from 'react';
import { showFormattedDate } from '../utils';

// TODO [Skilled] pecah tombol aksi menjadi komponen terpisah bernama `NoteActionButton`
function NoteActionButton({ variant, onClick, label, dataTestId }) {
  const className = variant === 'delete' ? 'note-item__delete-button' : 'note-item__archive-button';
  return (
    <button className={className} type="button" onClick={onClick} data-testid={dataTestId}>
      {label}
    </button>
  );
}

function NoteItem({ note, onDelete, onArchive, searchKeyword }) {
  // Fungsi Helper Advanced untuk highlight text
  const highlightText = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() ? <mark key={i}>{part}</mark> : part
        )}
      </span>
    );
  };

  return (
    <div
      className="note-item"
      data-testid="note-item"
      data-note-id={note?.id}
    >
      <div className="note-item__content" data-testid="note-item-content">
        {/* TODO [Basic] tampilkan judul catatan menggunakan note.title */}
        {/* TODO [Advanced] sorot kata kunci pencarian dalam judul menggunakan elemen <mark>. */}
        <h3 className="note-item__title" data-testid="note-item-title">
          {highlightText(note.title, searchKeyword)}
        </h3>
        {/* TODO [Basic] gunakan util showFormattedDate untuk menampilkan tanggal dibuat. */}
        <p className="note-item__date" data-testid="note-item-date">
          {showFormattedDate(note.createdAt)}
        </p>
        {/* TODO [Basic] tampilkan isi catatan dari note.body */}
        {/* TODO [Advanced] sorot kata kunci pencarian dalam isi menggunakan elemen <mark>. */}
        <p className="note-item__body" data-testid="note-item-body">
          {highlightText(note.body, searchKeyword)}
        </p>
      </div>
      <div className="note-item__action" data-testid="note-item-action">
        {/* TODO [Skilled] & [Basic] panggil onDelete dengan id catatan melalui NoteActionButton. */}
        <NoteActionButton 
          variant="delete" 
          onClick={() => onDelete(note.id)} 
          label="Delete" 
          dataTestId="note-item-delete-button" 
        />

        {/* TODO [Advanced] implementasikan tombol arsip untuk fitur mengarsipkan catatan */}
        <NoteActionButton 
          variant="archive" 
          onClick={() => onArchive(note.id)} 
          label={note.archived ? 'Pindahkan' : 'Arsipkan'} 
          dataTestId="note-item-archive-button" 
        />
      </div>
    </div>
  );
}

export default NoteItem;