/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  CalendarIcon, 

  Clock, 
  Edit, 
  MoreHorizontal, 
  Plus, 
  Trash2, 
  User 
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// Task type definition
interface Task {
  id: string;
  title: string;
  description: string;
  status: 'backlog' | 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee?: {
    name: string;
    avatar: string;
  };
  dueDate?: string;
  tags: string[];
  createdAt: string;
}

// Column type definition
interface Column {
  id: 'backlog' | 'todo' | 'in-progress' | 'review' | 'done';
  title: string;
  taskIds: string[];
}

// DnD item types
const ItemTypes = {
  TASK: 'task',
};

// Initial data
const initialTasks: Record<string, Task> = {
  'task-1': {
    id: 'task-1',
    title: 'Create user authentication flow',
    description: 'Implement login, registration, and password reset functionality',
    status: 'backlog',
    priority: 'high',
    assignee: {
      name: 'Alex Johnson',
      avatar: 'https://github.com/shadcn.png',
    },
    dueDate: '2023-07-15',
    tags: ['frontend', 'auth'],
    createdAt: '2023-06-28',
  },
  'task-2': {
    id: 'task-2',
    title: 'Design dashboard layout',
    description: 'Create wireframes and mockups for the main dashboard',
    status: 'todo',
    priority: 'medium',
    assignee: {
      name: 'Sarah Miller',
      avatar: 'https://github.com/shadcn.png',
    },
    dueDate: '2023-07-10',
    tags: ['design', 'ui'],
    createdAt: '2023-06-29',
  },
  'task-3': {
    id: 'task-3',
    title: 'Implement API endpoints',
    description: 'Create RESTful API endpoints for user data',
    status: 'in-progress',
    priority: 'high',
    assignee: {
      name: 'Mike Chen',
      avatar: 'https://github.com/shadcn.png',
    },
    dueDate: '2023-07-08',
    tags: ['backend', 'api'],
    createdAt: '2023-06-30',
  },
  'task-4': {
    id: 'task-4',
    title: 'Write unit tests',
    description: 'Create comprehensive test suite for authentication module',
    status: 'review',
    priority: 'medium',
    assignee: {
      name: 'Lisa Wong',
      avatar: 'https://github.com/shadcn.png',
    },
    dueDate: '2023-07-05',
    tags: ['testing', 'qa'],
    createdAt: '2023-07-01',
  },
  'task-5': {
    id: 'task-5',
    title: 'Fix responsive layout issues',
    description: 'Address UI bugs on mobile devices',
    status: 'done',
    priority: 'low',
    assignee: {
      name: 'David Park',
      avatar: 'https://github.com/shadcn.png',
    },
    dueDate: '2023-07-03',
    tags: ['bugfix', 'ui'],
    createdAt: '2023-07-02',
  },
};

const initialColumns: Record<string, Column> = {
  'backlog': {
    id: 'backlog',
    title: 'Backlog',
    taskIds: ['task-1'],
  },
  'todo': {
    id: 'todo',
    title: 'To Do',
    taskIds: ['task-2'],
  },
  'in-progress': {
    id: 'in-progress',
    title: 'In Progress',
    taskIds: ['task-3'],
  },
  'review': {
    id: 'review',
    title: 'Review',
    taskIds: ['task-4'],
  },
  'done': {
    id: 'done',
    title: 'Done',
    taskIds: ['task-5'],
  },
};

const columnOrder = ['backlog', 'todo', 'in-progress', 'review', 'done'];

// Task Card Component with Drag functionality
const TaskCard = ({ 
  task, 
  index, 
  onEdit, 
  onDelete, 
  getPriorityColor 
}: { 
  task: Task; 
  index: number; 
  onEdit: (id: string) => void; 
  onDelete: (id: string) => void; 
  getPriorityColor: (priority: string) => string; 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: { id: task.id, index, sourceColumnId: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
  drag(ref);
  
  return (
    <Card
      ref={ref}
      className={`mb-3 shadow-sm ${
        isDragging 
          ? 'opacity-50 shadow-md bg-white dark:bg-gray-700' 
          : 'bg-white dark:bg-gray-800'
      }`}
    >
      <CardHeader className="p-3 pb-0">
        <div className="flex justify-between items-start">
          <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(task.id)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-red-600 dark:text-red-400"
                onClick={() => onDelete(task.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="text-xs mt-1 line-clamp-2">
          {task.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3 pt-2">
        <div className="flex flex-wrap gap-1 mb-2">
          {task.tags.map((tag, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center mt-2">
          <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </Badge>
          {task.dueDate && (
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <CalendarIcon className="h-3 w-3 mr-1" />
              {task.dueDate}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex justify-between items-center">
        {task.assignee ? (
          <div className="flex items-center">
            <Avatar className="h-6 w-6 mr-1">
              <AvatarImage src={task.assignee.avatar} />
              <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {task.assignee.name.split(' ')[0]}
            </span>
          </div>
        ) : (
          <div className="text-xs text-gray-400 flex items-center">
            <User className="h-3 w-3 mr-1" />
            Unassigned
          </div>
        )}
        <div className="text-xs text-gray-400 flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {new Date(task.createdAt).toLocaleDateString()}
        </div>
      </CardFooter>
    </Card>
  );
};

// Column Component with Drop functionality
const TaskColumn = ({ 
  column, 
  tasks, 
  onAddTask, 
  onEditTask, 
  onDeleteTask, 
  onDropTask, 
  getPriorityColor 
}: { 
  column: Column; 
  tasks: Task[]; 
  onAddTask: (status: any) => void; 
  onEditTask: (id: string) => void; 
  onDeleteTask: (id: string) => void; 
  onDropTask: (taskId: string, sourceColumnId: string, targetColumnId: string) => void;
  getPriorityColor: (priority: string) => string; 
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item: { id: string; sourceColumnId: string }) => {
      onDropTask(item.id, item.sourceColumnId, column.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div key={column.id} className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-2 px-2">
        <h3 className="font-medium text-gray-700 dark:text-gray-300 flex items-center">
          {column.title}
          <Badge variant="outline" className="ml-2 bg-gray-100 dark:bg-gray-800">
            {column.taskIds.length}
          </Badge>
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={() => onAddTask(column.id)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div
        ref={drop}
        className={`flex-1 p-2 rounded-lg overflow-y-auto ${
          isOver 
            ? 'bg-gray-100 dark:bg-gray-800/50' 
            : 'bg-gray-50 dark:bg-gray-800/20'
        }`}
      >
        {tasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={task}
            index={index}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            getPriorityColor={getPriorityColor}
          />
        ))}
        {tasks.length === 0 && (
          <div className="text-center py-4 text-sm text-gray-400 dark:text-gray-500">
            No tasks yet
          </div>
        )}
      </div>
    </div>
  );
};

const Tasks = () => {
  const [tasks, setTasks] = useState<Record<string, Task>>(initialTasks);
  const [columns, setColumns] = useState<Record<string, Column>>(initialColumns);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [isNewTask, setIsNewTask] = useState(true);

  // Handle task drop
  const handleDropTask = (taskId: string, sourceColumnId: string, targetColumnId: string) => {
    // If dropped in the same column, do nothing
    if (sourceColumnId === targetColumnId) return;

    // Remove from source column
    const sourceColumn = columns[sourceColumnId];
    const sourceTaskIds = Array.from(sourceColumn.taskIds);
    const taskIndex = sourceTaskIds.indexOf(taskId);
    sourceTaskIds.splice(taskIndex, 1);

    // Add to target column
    const targetColumn = columns[targetColumnId];
    const targetTaskIds = Array.from(targetColumn.taskIds);
    targetTaskIds.push(taskId);

    // Update columns
    setColumns({
      ...columns,
      [sourceColumnId]: {
        ...sourceColumn,
        taskIds: sourceTaskIds,
      },
      [targetColumnId]: {
        ...targetColumn,
        taskIds: targetTaskIds,
      },
    });

    // Update task status
    setTasks({
      ...tasks,
      [taskId]: {
        ...tasks[taskId],
        status: targetColumnId as 'backlog' | 'todo' | 'in-progress' | 'review' | 'done',
      },
    });
  };

  // Open dialog to create a new task
  const handleAddTask = (status: 'backlog' | 'todo' | 'in-progress' | 'review' | 'done') => {
    setIsNewTask(true);
    setCurrentTask({
      id: `task-${Date.now()}`,
      title: '',
      description: '',
      status,
      priority: 'medium',
      tags: [],
      createdAt: new Date().toISOString().split('T')[0],
    });
    setIsTaskDialogOpen(true);
  };

  // Open dialog to edit an existing task
  const handleEditTask = (taskId: string) => {
    setIsNewTask(false);
    setCurrentTask(tasks[taskId]);
    setIsTaskDialogOpen(true);
  };

  // Save task (create or update)
  const handleSaveTask = () => {
    if (!currentTask) return;

    const updatedTasks = { ...tasks };
    updatedTasks[currentTask.id] = currentTask;
    setTasks(updatedTasks);

    if (isNewTask) {
      // Add task ID to the appropriate column
      const updatedColumns = { ...columns };
      updatedColumns[currentTask.status].taskIds.push(currentTask.id);
      setColumns(updatedColumns);
    }

    setIsTaskDialogOpen(false);
  };

  // Delete a task
  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = { ...tasks };
    delete updatedTasks[taskId];
    setTasks(updatedTasks);

    // Remove task ID from its column
    const updatedColumns = { ...columns };
    for (const columnId of Object.keys(updatedColumns)) {
      updatedColumns[columnId].taskIds = updatedColumns[columnId].taskIds.filter(
        id => id !== taskId
      );
    }
    setColumns(updatedColumns);
  };

  // Update current task field
  const updateTaskField = (field: keyof Task, value: any) => {
    if (!currentTask) return;
    setCurrentTask({
      ...currentTask,
      [field]: value,
    });
  };

  // Get priority badge color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sprint Board</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your team's tasks and track progress</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="current">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Sprint" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Sprint</SelectItem>
              <SelectItem value="next">Next Sprint</SelectItem>
              <SelectItem value="backlog">Backlog</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Sprint
          </Button>
        </div>
      </div>

      <DndProvider backend={HTML5Backend}>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 h-[calc(100vh-200px)]">
          {columnOrder.map((columnId) => {
            const column = columns[columnId];
            const columnTasks = column.taskIds.map(taskId => tasks[taskId]);

            return (
              <TaskColumn
                key={column.id}
                column={column}
                tasks={columnTasks}
                onAddTask={handleAddTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                onDropTask={handleDropTask}
                getPriorityColor={getPriorityColor}
              />
            );
          })}
        </div>
      </DndProvider>

      {/* Task Dialog */}
      <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isNewTask ? 'Create New Task' : 'Edit Task'}</DialogTitle>
            <DialogDescription>
              {isNewTask 
                ? 'Add a new task to your board' 
                : 'Update the details of your task'}
            </DialogDescription>
          </DialogHeader>
          
          {currentTask && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <Input
                  id="title"
                  value={currentTask.title}
                  onChange={(e) => updateTaskField('title', e.target.value)}
                  placeholder="Task title"
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="description"
                  value={currentTask.description}
                  onChange={(e) => updateTaskField('description', e.target.value)}
                  placeholder="Task description"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="status" className="text-sm font-medium">
                    Status
                  </label>
                  <Select
                    value={currentTask.status}
                    onValueChange={(value) => 
                      updateTaskField('status', value as 'backlog' | 'todo' | 'in-progress' | 'review' | 'done')
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="backlog">Backlog</SelectItem>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="priority" className="text-sm font-medium">
                    Priority
                  </label>
                  <Select
                    value={currentTask.priority}
                    onValueChange={(value) => 
                      updateTaskField('priority', value as 'low' | 'medium' | 'high')
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="dueDate" className="text-sm font-medium">
                  Due Date
                </label>
                <Input
                  id="dueDate"
                  type="date"
                  value={currentTask.dueDate || ''}
                  onChange={(e) => updateTaskField('dueDate', e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="tags" className="text-sm font-medium">
                  Tags (comma separated)
                </label>
                <Input
                  id="tags"
                  value={currentTask.tags.join(', ')}
                  onChange={(e) => 
                    updateTaskField(
                      'tags', 
                      e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                    )
                  }
                  placeholder="frontend, api, bugfix"
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTaskDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTask}>
              {isNewTask ? 'Create Task' : 'Update Task'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tasks;