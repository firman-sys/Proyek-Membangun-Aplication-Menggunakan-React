import React from 'react';
import { getInitialData } from '../utils';
import NoteInput from './NoteInput';
import NotesList from './NotesList';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getInitialData(),
      searchKeyword: '',
    };

    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
  }

  onAddNoteHandler({ title, body }) {
    const newNote = {
      id: +new Date(),
      title,
      body,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    this.setState((prevState) => ({
      notes: [...prevState.notes, newNote],
    }));
  }

  onDeleteHandler(id) {
    const notes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes });
  }

  onArchiveHandler(id) {
    const notes = this.state.notes.map((note) => {
      if (note.id === id) {
        return { ...note, archived: !note.archived };
      }
      return note;
    });
    this.setState({ notes });
  }

  onSearchHandler(event) {
    this.setState({ searchKeyword: event.target.value });
  }

  render() {
    const { notes, searchKeyword } = this.state;

    // Filter berdasarkan judul sesuai keyword
    const filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    const activeNotes = filteredNotes.filter((note) => !note.archived);
    const archivedNotes = filteredNotes.filter((note) => note.archived);

    return (
      <div className="note-app" data-testid="note-app">
        <div className="note-app__header" data-testid="note-app-header">
          <h1>Notes</h1>
          {/* Bagian Pencarian sesuai struktur gambar yang kamu kirim */}
          <div className="note-search" data-testid="note-search">
            <input
              type="text"
              placeholder="Cari berdasarkan judul ..."
              data-testid="note-search-input"
              value={searchKeyword}
              onChange={this.onSearchHandler}
            />
          </div>
        </div>
        
        <div className="note-app__body" data-testid="note-app-body">
          <NoteInput addNote={this.onAddNoteHandler} />
          
                      <h2 id="active-notes-title">Catatan Aktif ({activeNotes.length})</h2>
            <NotesList
              notes={activeNotes}
              onDelete={this.onDeleteHandler}
              onArchive={this.onArchiveHandler}
              searchKeyword={searchKeyword}
              dataTestId="active-notes-list"
            />
          <section
            aria-labelledby="archived-notes-title"
            data-testid="archived-notes-section"
          >
            <h2 id="archived-notes-title">Arsip ({archivedNotes.length})</h2>
            <NotesList
              notes={archivedNotes}
              onDelete={this.onDeleteHandler}
              onArchive={this.onArchiveHandler}
              searchKeyword={searchKeyword}
              dataTestId="archived-notes-list"
            />
          </section>
        </div>
      </div>
    );
  }
}
 
export default App;