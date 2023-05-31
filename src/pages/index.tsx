import { Column } from "@/components/Column";
import { initialData } from "@/initial-data";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

export default function Home() {
  const [data, setData] = useState<any>();

  useEffect(() => setData(initialData), []);

  const onDragStart = () => {
    document.body.style.color = "orange";
    document.body.style.transition = "background-color 0.2s ease";
  };

  const onDragUpdate = (update: any) => {
    document.body.style.color = "orange";

    const { destination, source, draggableId } = update;

    const opacity = destination
      ? destination.index / Object.keys(data.tasks).length
      : 0;

    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  };

  //its responsability of onDragEnd function to synchronously update the your state to reflect the drag and drop result
  const onDragEnd = (result: any) => {
    document.body.style.color = "black";
    document.body.style.backgroundColor = "inherit";

    //result object example on notations

    const { destination, source, draggableId } = result;

    //if there's no destination, then there's nothing that we need to do as a result of this drag.
    if (!destination) {
      return;
    }

    //if this condition is true, this means that the user drop the item in the same position, and we dont need to do anything
    if (
      destination.dropableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //reorder the tasks ids array for the column

    //looking for the column id inside my data based on source.droplabeId
    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    //here means that the column where the user is dropping the item is the same of origin
    if (start === finish) {
      //avoiding change my original state by creating a new array with the taskids
      const newTaskIds = Array.from(start.taskIds);

      //move the task id from its old index to its new index in the array
      //remove a taskid starting form souce.index and removing one item
      newTaskIds.splice(source.index, 1);

      //stating from destination.index, removing nothing and inserting dragabeId
      newTaskIds.splice(destination.index, 0, draggableId);

      //create a new Column, which has the same properties of the old column and put the newTasksId into it
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data["columns"],
          [newColumn.id]: newColumn,
        },
      };
      setData(newState);
      return;
    }

    //moving from one list to  another
    const startTaskIds = Array.from(start.taskIds);

    //move the task id from its old index to its new index in the array
    //remove a taskid starting form souce.index and removing one item
    startTaskIds.splice(source.index, 1);

    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newState);

    //OBS: how you persist this change to your data store will depends your management solutino and server architecture.
    //a simples strategy for persisting changes would be to call a endpoint after performing this optimistic update to let your server now that a reorder has ocurred.
  };

  return (
    //the context have 3 callbacks
    <DragDropContext
      //its call when the drag starts
      onDragStart={onDragStart}
      //its call when something changes during a drag
      onDragUpdate={onDragUpdate}
      //call in the end of the drag
      //the only required callback is ondragend
      onDragEnd={onDragEnd}
    >
      <Container>
        {data?.columnOrder.map((columnId: any) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId: any) => data.tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </Container>
    </DragDropContext>
  );
}
