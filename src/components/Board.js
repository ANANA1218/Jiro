import React, { useState, useEffect } from 'react';
import List from './List';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { db } from '../firebase';

const Board = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('lists').orderBy('createdAt').onSnapshot(snapshot => {
      const listsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLists(listsData);
    });
    return () => unsubscribe();
  }, []);

  const onDragEnd = async result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceList = lists.find(list => list.id === source.droppableId);
    const destinationList = lists.find(list => list.id === destination.droppableId);

    if (sourceList.id === destinationList.id) {
      // Reorder within the same list
      const reorderedCards = Array.from(sourceList.cards);
      const [removed] = reorderedCards.splice(source.index, 1);
      reorderedCards.splice(destination.index, 0, removed);

      await db.collection('lists').doc(sourceList.id).update({
        cards: reorderedCards
      });
    } else {
      // Move between lists
      const sourceCards = Array.from(sourceList.cards);
      const destinationCards = Array.from(destinationList.cards);
      const [removed] = sourceCards.splice(source.index, 1);
      destinationCards.splice(destination.index, 0, removed);

      await db.collection('lists').doc(sourceList.id).update({
        cards: sourceCards
      });

      await db.collection('lists').doc(destinationList.id).update({
        cards: destinationCards
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="LIST">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              display: 'flex',
              overflowX: 'auto',
              whiteSpace: 'nowrap'
            }}
          >
            {lists.map((list, index) => (
              <List key={list.id} list={list} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
