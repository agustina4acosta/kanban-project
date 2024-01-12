import { PlusIcon } from "../icons/PlusIcon"
import { useMemo, useState } from "react";
import { Column, Id } from "../types";
import { ColumnContainer } from "./ColumnContainer";
import { DndContext, DragStartEvent } from "@dnd-kit/core";
import { SortableContext} from "@dnd-kit/sortable";

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]> ([])
  const columnsId = useMemo(()=> columns.map(col => col.id),[columns]);
  
  return (
    <div className="
    m-auto
    flex
    min-h-screen
    w-full
    items-center
    overflow-x-auto
    overflow-y-hidden
    px-[40px]
    ">
      <DndContext onDragStart={onDragStart}>
      <div className="m-auto flex gap-2">
        <div className="flex gap-4">
          <SortableContext items={columnsId}>
          {columns.map(column => 
         <ColumnContainer
         key={column.id}
          column={column} 
          deleteColumn={deleteColumn}/>
          )}
          </SortableContext>
           </div>
      <button
      onClick={()=>{
        createNewColumn();
      }}
      className="
      

      h-[60px]
      w-[350px]
      min-w-[350px]
      cursor-pointer
      rounded-lg
      bg-mainBackgroudColor
      border-2
      border-columnBackgroundColor
      p-4
      ring-rose-500
      hover:ring-2
      flex
      gap-2
      "><PlusIcon/>
        Add Column
      </button>
      </div>
      </DndContext>
    </div>
  );

   
  function createNewColumn(){
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,

    };
    setColumns([...columns,columnToAdd])
  }
  function deleteColumn(id:Id){
    const filteredColumns = columns.filter((col)=> col.id !== id)
    setColumns(filteredColumns)
  }
  function onDragStart(event: DragStartEvent){
    console.log('DRAG START',event)
  }
}
function generateId(){
  /* Generate a random number between 0 and a 1000*/
  return Math.floor(Math.random() * 10001)
}


export default KanbanBoard
/** minuto 24:46 de tutorial */