import React from 'react';

function NoteSearch({ searchKeyword, onSearch }) { // Tambahkan searchKeyword di sini
  return (
    <div className="note-search"
data-testid="note-search">
      <input
        type="text"
        value={searchKeyword}
        placeholder="Cari catatan..."
        data-testid="note-search-input"  
        onChange={(event) => onSearch(event.target.value)} 
      /> 
    </div>
  );
}

export default NoteSearch;