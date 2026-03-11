import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    
    const newTask: Task = {
      id: crypto.randomUUID(),
      text: newTaskText.trim(),
      completed: false,
    };
    
    setTasks([newTask, ...tasks]);
    setNewTaskText('');
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4 font-sans text-zinc-900">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl font-semibold mb-6 text-zinc-800">To-Do List</h1>
          
          <form onSubmit={addTask} className="flex gap-2 mb-6">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2 bg-zinc-100 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!newTaskText.trim()}
              className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
            >
              <Plus size={24} />
            </button>
          </form>

          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {tasks.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-zinc-500 py-6"
                >
                  No tasks yet. Add one above!
                </motion.p>
              ) : (
                tasks.map(task => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    key={task.id}
                    className={`group flex items-center justify-between p-3 rounded-xl border transition-colors ${
                      task.completed ? 'bg-zinc-50 border-zinc-200' : 'bg-white border-zinc-200 hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`flex-shrink-0 transition-colors ${
                          task.completed ? 'text-emerald-500' : 'text-zinc-400 hover:text-indigo-500'
                        }`}
                      >
                        {task.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                      </button>
                      <span
                        className={`truncate transition-all ${
                          task.completed ? 'text-zinc-400 line-through' : 'text-zinc-700'
                        }`}
                      >
                        {task.text}
                      </span>
                    </div>
                    <button
                      onClick={() => removeTask(task.id)}
                      className="text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all p-1 rounded-md hover:bg-red-50"
                      aria-label="Delete task"
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
