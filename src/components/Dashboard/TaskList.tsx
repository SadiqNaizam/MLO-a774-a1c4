import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Settings, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  dueDate: string;
}

const initialTasks: Task[] = [
  {
    id: '1',
    text: 'Review and make sure nothing slips through cracks',
    completed: false,
    dueDate: '15 Sep, 2021',
  },
  {
    id: '2',
    text: 'Send meeting invites for sales upcampaign',
    completed: true,
    dueDate: '20 Sep, 2021',
  },
  {
    id: '3',
    text: 'Weekly closed sales won checking with sales team',
    completed: false,
    dueDate: '24 Sep, 2021',
  },
  {
    id: '4',
    text: 'Add notes that can be viewed from the individual view',
    completed: false,
    dueDate: '27 Sep, 2021',
  },
  {
    id: '5',
    text: 'Move stuff to another page',
    completed: true,
    dueDate: '27 Sep, 2021',
  },
];

interface TaskListProps {
  className?: string;
}

const TaskList: React.FC<TaskListProps> = ({ className }) => {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks);

  const toggleTask = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const remainingTasks = tasks.filter(task => !task.completed).length;
  const totalTasks = tasks.length;

  return (
    <Card className={cn('shadow-sm col-span-1 md:col-span-1', className)}> {/* Adjusted to span 1 col */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">My Tasks</CardTitle>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Settings className="h-4 w-4 text-muted-foreground" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-muted-foreground">
            {remainingTasks} of {totalTasks} remaining
          </p>
          <Button variant="default" size="sm" className="bg-accent hover:bg-accent/90 h-8">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
        <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id={`task-${task.id}`} 
                  checked={task.completed} 
                  onCheckedChange={() => toggleTask(task.id)}
                />
                <label 
                  htmlFor={`task-${task.id}`} 
                  className={cn('text-sm', task.completed && 'line-through text-muted-foreground')}
                >
                  {task.text}
                </label>
              </div>
              <span className={cn('text-xs', task.completed ? 'text-muted-foreground' : 'text-foreground')}>
                {task.dueDate}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskList;
