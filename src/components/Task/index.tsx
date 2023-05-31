import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div<{ isDragging: boolean }>`
  border: 1px solid lightgray;
  border-radius: 12px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
  display: flex;
`;

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`;

export function Task({ task, index }: any) {
  return (
    //a draggable has to required props. first a draggableId which here is assigned to the taskId, and secondly is a index.
    //as the droppable, a draggable espects a child to be a function
    <Draggable draggableId={task.id} index={index}>
      {
        //the first argument of this function is a provided object, which works a very similar way to the droppable provided object.
        //as the second argument I have the snapshot, that is a object that contains a number of properties that you can use to style your draggablecomponent during the drag.
        (provided, snapshot) => (
          <Container
            //the provided has a property called innerRef, wich is a function used to supply the dom node of you component to react-beatifull-dnd
            ref={provided.innerRef}
            //the provided object has a prop that is called draggableProsp, theses props need to be applied to the component that we want to move around in response toa a user input.
            {...provided.draggableProps}
            //the provided object has a prop that is called dragHandleProsp, theses props need to be applied to the part of the component that we want to use to be able to control the entire component.you can use this to drag a large item by just a small part of it.to our application we want the thole task to be draggable,so we gonna apply this props to the same element.
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
          >
            {/* <Handle
              //if i pass the dragHandleProsp to a styled component, this component will be the only one that can be clicked to drag. if I pass this dragHandleProps to the same component that is dragable, the component will be able to drag anywhere I click
              {...provided.dragHandleProps}
            /> */}
            {task.content}
          </Container>
        )
      }
    </Draggable>
  );
}
