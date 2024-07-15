import React, { useState, useEffect } from 'react';
import Card from './Card';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { db } from '../firebase';
import AddCardForm from './components/AddCardForm';

const List = ({ list, index }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('lists').doc(list.id).collection('cards').orderBy('createdAt').onSnapshot(snapshot => {
      const cardsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCards(cardsData);
    });
    return () => unsubscribe();
  }, [list.id]);

  const handleDeleteList = async () => {
    try {
      await db.collection('lists').doc(list.id).delete();
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };

  const handleAddCard = async text => {
    try {
      await db.collection('lists').doc(list.id).collection('cards').add({
        text,
        createdAt: new Date()
      });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            background: snapshot.isDragging ? '#f2f2f2' : '#ffffff',
            margin: '8px',
            padding: '8px',
            width: '250px',
            minHeight: '100px',
            border: '1px solid lightgrey',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>{list.title}</h3>
            <button onClick={handleDeleteList}>Delete List</button>
          </div>
          <Droppable droppableId={list.id} type="CARD">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  flexGrow: 1,
                  minHeight: '100px'
                }}
              >
                {cards.map((card, index) => (
                  <Card key={card.id} card={card} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <AddCardForm onAddCard={handleAddCard} />
        </div>
      )}
    </Draggable>
  );
};

export default List;
