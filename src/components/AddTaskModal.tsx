import { useState } from 'react';
import type { Task } from '../types/task';

type AddTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (task: Omit<Task, 'id'>) => void;
  defaultStatus: Task['status']
}

const AddTaskModal = ({isOpen, onClose, onAdd, defaultStatus}: AddTaskModalProps) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    if (title.trim() === '') return;
    onAdd({title, description, status: defaultStatus});
    setTitle('');
    setDescription('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50'>
        <div className='bg-white rounded-xl p-6 w-full max-w-md shadow-lg'>
          <h2 className='text-xl font-semibold mb-4'>Add Task</h2>
          <input
            className='w-full border p-2 rounded mb-3'
            placeholder='Title' // Thêm placeholder cho input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <textarea
            className='w-full border p-2 rounded mb-3'
            placeholder='Description'
            rows={3}
            value={description}
            onChange = {(e) => setDescription(e.target.value )}
          ></textarea>
          <div className='flex justify-end gap-2'>
            <button onClick={onClose} className='px-4 py-2 bg-gray-300 rounded'>Cancel</button>
            <button onClick={handleAdd} className='px-4 py-2 bg-blue-500 text-white rounded'>Add</button>
          </div>
        </div>
    </div>
  )
}

export default AddTaskModal