import React, { useState } from 'react';

const AddCardForm = ({ onAddCard }) => {
  const [text, setText] = useState('');

  const handleChange = event => {
    setText(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (text.trim()) {
      onAddCard(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '8px' }}>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Enter card title"
        style={{ marginRight: '8px' }}
      />
      <button type="submit">Add Card</button>
    </form>
  );
};

export default AddCardForm;
