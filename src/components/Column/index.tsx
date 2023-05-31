import styled from "styled-components";
import { Task } from "../Task";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
  width: 220px;

  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div<{ isDraggingOver: boolean }>`
  padding: 8px;
  background-color: ${(props) => (props.isDraggingOver ? "skyblue" : "white")};
  transition: background-color 0.2s ease;
  flex-grow: 1;
  min-height: 100px;
`;

export function Column({ column, tasks }: any) {
  return (
    <Container>
      <Title>{column.title}</Title>
      {/* droppaple has one require prop, a dropapleId . to be a unique id whitin the dragdropcontext.*/}
      <Droppable droppableId={column.id}>
        {/* a droppable utilizes the render props pattern and expects its child to be a function that returns a react component.
        one reason the render props pattern is used is so that react-beautiful-=dnd does not need to create any dom nodes for you */}
        {
          //provided is a object that serves a few important purposes.
          // provided has a property called droppapleProps. these are props that need to be applied to the component that you want to designate as your droppable. this props are explicitly call out what all of theses props are in the documentation. https://github.com/atlassian/react-beautiful-dnd/blob/HEAD/docs/api/droppable.md
          //   we can apply one of theses individually or we can just aspread them directly into the component.
          //as the second argument I have the snapshot, that is a object that contains a number of properties that you can use to style your draggablecomponent during the drag.
          (provided, snapshot) => (
            <TaskList
              {...provided.droppableProps}
              //the provided has a property called innerRef, wich is a function used to supply the dom node of you component to react-beatifull-dnd
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {tasks.map((task: any, index: number) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {/* placeholder is a react element that is used to increased the available space in a droppable during a drag when it's needed. the place holder needs to be added as a child of the component that u designed as the droppable.  */}
              {provided.placeholder}
            </TaskList>
          )
        }
      </Droppable>
    </Container>
  );
}
