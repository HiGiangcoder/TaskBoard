import { useState } from 'react';
import type { Task } from '../types/task';
import TaskCard from './TaskCard';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import AddTaskModal from './AddTaskModal';

type ColumnProps = {
    title: string;
    tasks: Task[]; // Sửa lại để nhận Task[]
    droppableId: string; // Thêm nếu cần dùng trong DragDropContext
    onAddTask: (task: Omit<Task, 'id'>) => void; // Thêm hàm để thêm task mới
    onUpdateTask: (task: Task) => void; // Thêm hàm để cập nhật task
    onDeleteTask: (taskId: string) => void; // Thêm hàm để xóa task
};

const Column = ({title, tasks, droppableId, onAddTask, onUpdateTask, onDeleteTask}: ColumnProps) => {
  const [isModelOpen, setIsModelOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <button 
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setIsModelOpen(true)}
      >
        Add Tasks
      </button>

      <Droppable droppableId={droppableId}>
        {(provided) => (
            <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2 min-h-[100px]"
          >
            {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <TaskCard 
                              task={task} 
                              onUpdateTask={onUpdateTask}
                              onDeleteTask={onDeleteTask}
                            />
                        </div>                    
                    )}
                </Draggable>
            ))}
          </div>
        )}
      </Droppable>

      <AddTaskModal
        isOpen={isModelOpen}
        onClose={() => setIsModelOpen(false)}
        onAdd={onAddTask}
        defaultStatus={droppableId as Task['status']}
      />



    </div>
  )
}

export default Column
