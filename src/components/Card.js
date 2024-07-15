import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { db } from '../firebase';

const Card = ({ card, index }) => {
  const handleDeleteCard = async () => {
    try {
      await db.collection('lists').doc(card.listId).collection('cards').doc(card.id).delete();
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            userSelect: 'none',
            padding: '8px',
            margin: '0 0 8px 0',
            minHeight: '50px',
            backgroundColor: snapshot.isDragging ? '#f5f5f5' : '#ffffff',
            border: '1px solid lightgrey',
            borderRadius: '4px'
          }}
        >
          <p>{card.text}</p>
          <button onClick={handleDeleteCard}>Delete</button>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
