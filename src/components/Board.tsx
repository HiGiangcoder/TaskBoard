import { useEffect, useState } from "react";
import type { Task } from "../types/task";
import { DragDropContext, type DropResult} from "@hello-pangea/dnd";
import { v4 as uuidv4 } from 'uuid';
import Column from "./Column";



const Board = () => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    });


    const columns = [
        { title: 'To Do', status: 'todo' },
        { title: 'Doing', status: 'doing' },
        { title: 'Done', status: 'done' },
    ];
    const onDragEnd = (result: DropResult) => {
        const {source, destination, draggableId} = result;
        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) return;

        setTasks((prev) =>
            prev.map((task) =>
            task.id === draggableId
                ? {...task, status: destination.droppableId as Task['status']}
                : task
            )
        )
    }



    const addTask = (newTask: Omit<Task, 'id'>) => {
        const taskWithId: Task = { ...newTask, id: uuidv4() };
        setTasks(prev => [...prev, taskWithId]);
    }

    const updateTask = (updatedTask: Task) => {
        setTasks(prev => prev.map(task => task.id === updatedTask.id ? updatedTask : task));
    }  

    const deleteTask = (taskId: string) => {
        setTasks(prev => prev.filter(task => task.id !== taskId));
    }

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

  return (
    <div>
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="min-h-screen bg-gray-100 p-6">
                <h1 className="text-3xl font-bold mb-6 text-center">Task Board</h1>
                <div className="flex justify-center mb-6">
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {columns.map((col) => (
                    <Column 
                        key={col.status} 
                        title={col.title} 
                        tasks={tasks.filter(task => task.status === col.status)} 
                        droppableId={col.status} 
                        onAddTask={addTask}
                        onUpdateTask={updateTask}
                        onDeleteTask={deleteTask}
                    />
                    ))}
                </div>
            </div>
        </DragDropContext>
    </div>
  )
}

export default Board


