react-beautiful dnd is made by 3 diferent components

the firts is the drandDropContext. its a component that we we use to wrap the part of our application that we want to have drag and drop functionality.

a droppable create a range that we can drop to and a draggable that is a component that can be dragged around and drop into droppable.

![Alt text](../../../Pictures/Screenshots/Screenshot%20from%202023-03-02%2012-07-25.png)

```javascript
//result object example
const result = {
  draggableId: "", //the id of the draggable that the user was dragging,
  type: "TYPE", // show later,
  reason: "DROP" | "CANCEL" | "NONE", // the information of drop operation,
  //where the drag stated
  source: {
    droppableId: "", //the id of the droppable that the user is dragging from,
    index: "", //the index of the item
  },

  //where the drag finished
  destination: {
    droppableId: "", // the id of the droppable that the user is dragging from,
    index: "", //the index of the item
  },
};
```

snapshot object example

```javascript
//Draggable
const draggableSnapshot = {
  isDragging: true,//set to true when the draggable is currently dragged
  draggingOver: "column-1",//will be set to the id of the droppable that the draggable is currently dragging over

  //if a draggable is being dragged and is currently not over a droppable, then the draggingOver will be set to null
};

//Droppable
const droppableSnapshot = {
    isDraggingOver: true, //this will be set to true when a draggable is dragging over the droppable.
    draffingOverWith: 'task-1' //this will be set to the id of the draggable taht is dragging over a droppable
    //dragginoverWith will be set to null if the droppable is not being drag over
```

```javascript
//onDragStart
const start = {
  draggableId: "task-1",
  type: "TYPE",
  source: {
    droppableId: "column-1",
    index: 0,
  },
};

//onDragUpdate
const update = {
  ...start,
  destination: {
    droppableId: "column-1",
    index: 1,
  },
};

//onDragEnd
const result = {
  ...update,
  reason: "DROP",
};
```
