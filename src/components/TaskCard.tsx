import { useState } from 'react';
import type { Task } from '../types/task';
import { FaEdit, FaTrash } from "react-icons/fa";

type TaskCardProps = {
    task: Task;
    onUpdateTask: (task: Task) => void;
    onDeleteTask: (taskId: string) => void;
};

const TaskCard = ({task, onUpdateTask, onDeleteTask}: TaskCardProps) => {
  const getColor = () => {
    switch (task.status) {
      case 'todo':
        return 'bg-gray-200';
      case 'doing':
        return 'bg-blue-200';
      case 'done':
        return 'bg-green-200';
      default:
        return 'bg-gray';
    }
  }

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description || '');
    
    const handleSave = () => {
      onUpdateTask({ ...task, title, description });
      setIsEditing(false);
    };
  
  return (
    <div className={getColor() + ' p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200'}>
        {isEditing ? (
            <div>
                <input
                    className='w-full border p-2 rounded mb-2'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className='w-full border p-2 rounded mb-2'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                />
                <button onClick={handleSave} className='px-4 py-2 bg-blue-500 text-white rounded'>Save</button>
            </div>
        ) : 
        <div>
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-800">{task.title}</h3>
                <button onClick={() => setIsEditing(true)}>
                    <FaEdit className="text-blue-500 hover:text-blue-700" />
                </button>
            </div>
            
            {task.description && (
                <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                <button onClick={() => onDeleteTask(task.id)}>
                    <FaTrash className="text-red-500 hover:text-red-700" />
                </button>
                </div>
            )}
        </div>
        }
                
    </div>
  )
}

export default TaskCard
