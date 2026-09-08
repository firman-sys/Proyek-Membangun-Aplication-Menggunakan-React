import React from 'react';

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // TODO [Basic] kelola nilai title sebagai controlled input.
      title: '',
      // TODO [Basic] kelola nilai body sebagai controlled textarea.
      body: '',
      // State tambahan untuk handling error Advanced
      error: '',
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    // TODO [Basic] update state dengan nilai event.target.value.
    // TODO [Skilled] batasi judul maksimal 50 karakter dan tampilkan peringatan saat sisa karakter < 10.
    const limit = 50;
    const titleValue = event.target.value.slice(0, limit);
    this.setState({ title: titleValue });
  }

  onBodyChangeEventHandler(event) {
    // TODO [Basic] update state body agar textarea menjadi controlled component.
    this.setState({ body: event.target.value, error: '' });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    // TODO [Advanced] tolak submit ketika body kurang dari 10 karakter dan tampilkan pesan error.
    if (this.state.body.length < 10) {
      this.setState({ error: 'Isi catatan minimal 10 karakter!' });
      return;
    }

    // TODO [Basic] panggil props.addNote dengan data title & body dari state, lalu reset form.
    this.props.addNote(this.state);
    this.setState({ title: '', body: '', error: '' });
  }

  render() {
    // TODO [Skilled] hitung sisa karakter jika menerapkan limit 50 karakter.
    const remainingChars = 50 - this.state.title.length;

    return (
      <div className="note-input" data-testid="note-input">
        <h2>Buat catatan</h2>

        {/* // TODO [Advanced] tampilkan pesan error menggunakan elemen dengan class note-input__feedback--error. */}
        {this.state.error && (
          <p className="note-input__feedback--error">{this.state.error}</p>
        )}

        <form
          onSubmit={this.onSubmitEventHandler}
          data-testid="note-input-form"
        >
          {/* TODO [Skilled] tampilkan sisa karakter secara dinamis ketika limit judul diterapkan */}
          <p
            className="note-input__title__char-limit"
            data-testid="note-input-title-remaining"
          >
            Sisa karakter: {remainingChars}
          </p>
          <input
            className="note-input__title"
            type="text"
            placeholder="Ini adalah judul ..."
            value={this.state.title}
            onChange={this.onTitleChangeEventHandler}
            required
            data-testid="note-input-title-field"
          />
          <textarea
            className="note-input__body"
            placeholder="Tuliskan catatanmu di sini ..."
            value={this.state.body}
            onChange={this.onBodyChangeEventHandler}
            required
            data-testid="note-input-body-field"
          />
          <button type="submit" data-testid="note-input-submit-button">
            Buat
          </button>
        </form>
      </div>
    );
  }
}

export default NoteInput;