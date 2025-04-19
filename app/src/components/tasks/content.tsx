"use client";
import { useState } from "react";
import { User, Send } from "lucide-react";

import { Input } from "@/components/ui/input";
import { useTasks, useCreateTask, useCreateTaskAssignment, useDeleteTask } from "@/hooks/react-queries/tasks";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useCsrf from "@/hooks/use-csrf";
import CreateTaskDialog from "@/components/tasks/dialogs/create-task";
import ConfirmDeleteTaskDialog from "@/components/tasks/dialogs/confirm-delete-task";

const Tasks = ({ initialTasks }: any) => {
  useCsrf();
  const { data: tasks }: any = useTasks(initialTasks);
  const createTaskAssignmentMutation = useCreateTaskAssignment();
  const useDeleteTaskMutation = useDeleteTask();
  const createTaskMutation = useCreateTask();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreateTask = () => {
    if (!newTask.title || !newTask.description) return;

    const task = {
      title: newTask.title,
      description: newTask.description,
    };
    createTaskMutation.mutate(task);
    setNewTask({
      title: "",
      description: "",
    })
    setIsCreateDialogOpen(false);
  };

  if (!tasks) {
    return <div>No Tasks!</div>;
  }

  const unAssignedTasks = tasks.filter(
    (task: any) =>
      task.assigned === false &&
      (task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sentTasks = tasks.filter(
    (task: any) =>
      task.assigned === true &&
      task.assignment?.status === "pending" &&
      (task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const approvedTasks = tasks.filter(
    (task: any) =>
      task.assigned === true &&
      task.assignment?.status === "approved" &&
      (task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  const RejectedTasks = tasks.filter(
    (task: any) =>
      task.assigned === true &&
      task.assignment?.status === "rejected" &&
      (task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const onSendTaskToEmail = (taskId: string, email: string) => {
    createTaskAssignmentMutation.mutate({
      taskId,
      assigneeEmail: email,
    });
  };

  const onDeleteTask = (taskId: string) => {
    useDeleteTaskMutation.mutate(taskId)
  };

  return (
    <>
      <div className="flex flex-col items-start justify-between mb-6 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold">Task Management Dashboard</h1>
        <div className="flex flex-row-reverse items-start mt-4 lg:flex-row sm:items-center sm:mt-0 w-[-webkit-fill-available] lg:w-auto">
          <div className="flex items-center ml-4 lg:mx-4 w-[-webkit-fill-available] lg:w-auto">
            <Input
              placeholder="Search tasks..."
              className="max-w-sm "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <CreateTaskDialog
            isCreateDialogOpen={isCreateDialogOpen}
            setIsCreateDialogOpen={setIsCreateDialogOpen}
            setNewTask={setNewTask}
            newTask={newTask}
            handleCreateTask={handleCreateTask}
          />
        </div>
      </div>
      <Tabs defaultValue="sent" className="w-full">
        <TabsList className="grid w-full h-12 grid-cols-4">
          <TabsTrigger value="unAssigned" className="cursor-pointer">
            Unassigned ({unAssignedTasks.length})
          </TabsTrigger>
          <TabsTrigger value="sent" className="cursor-pointer">
            Sent ({sentTasks.length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="cursor-pointer">
            Approved ({approvedTasks.length})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="cursor-pointer">
            Rejected ({RejectedTasks.length})
          </TabsTrigger>
        </TabsList>
        <div className="mt-4">
          <TabsContent value="unAssigned">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {unAssignedTasks.length > 0 ? (
                unAssignedTasks.map((task: any) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDeleteTask={() => onDeleteTask(task.id)}
                    onSendTaskToEmail={onSendTaskToEmail}
                  />
                ))
              ) : (
                <div className="py-10 text-center col-span-full text-muted-foreground">
                  No unassigned tasks found. Create a new task to get started.
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="sent">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sentTasks.length > 0 ? (
                sentTasks.map((task: any) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDeleteTask={() => onDeleteTask(task.id)}
                  />
                ))
              ) : (
                <div className="py-10 text-center col-span-full text-muted-foreground">
                  No sent tasks found. Create a new task to get started.
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="approved">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {approvedTasks.length > 0 ? (
                approvedTasks.map((task: any) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDeleteTask={() => onDeleteTask(task.id)}
                  />
                ))
              ) : (
                <div className="py-10 text-center col-span-full text-muted-foreground">
                  No approved tasks found.
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="rejected">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {RejectedTasks.length > 0 ? (
                RejectedTasks.map((task: any) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDeleteTask={() => onDeleteTask(task.id)}
                  />
                ))
              ) : (
                <div className="py-10 text-center col-span-full text-muted-foreground">
                  No approved tasks found.
                </div>
              )}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </>
  );
};

function TaskCard({ task, onDeleteTask, onSendTaskToEmail }: any) {
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] =
    useState(false);
  const [email, setEmail] = useState("");
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="line-clamp-2 max-w-[300px] min-h-[2.5rem] text-lg">
            {task.title}
          </CardTitle>
          <Badge
            variant={
              !task.assigned
                ? "outline"
                : task.assignment?.status === "approved"
                ? "success"
                : task.assignment?.status === "rejected"
                ? "destructive"
                : "default"
            }
          >
            {!task.assigned
              ? "unassigned"
              : task.assignment?.status
              }
          </Badge>
        </div>
        <CardDescription className="line-clamp-2 max-w-[300px] min-h-[2.5rem]">
          {task.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {task?.assignment?.id ? (
          <>
            <div className="flex items-center gap-2 mb-4">
              <User className="w-4 h-4 text-muted-foreground" />
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage
                    src={task.assignment.avatar || "/placeholder.svg"}
                    alt={task.assignment.assigneeEmail}
                  />
                  <AvatarFallback>
                    {task.assignment.assigneeEmail.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{task.assignment.assigneeEmail}</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Due: {new Date(task.assignment.expiresAt).toLocaleDateString()}
            </div>
          </>
        ) : (
          <div className="grid gap-2">
            <div>
              <label
                htmlFor="query"
                className="block font-medium text-gray-900 text-sm/6"
              >
                Assign task to email:
              </label>
              <div className="flex mt-2">
                <div className="grid grid-cols-1 -mr-px grow focus-within:relative">
                  <input
                    id="assign-task-email"
                    name="assign-task-email"
                    type="email"
                    placeholder="jariel@lbta.co"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.currentTarget.value);
                    }}
                    className="col-start-1 row-start-1 block w-full rounded-l-md bg-white py-1.5 pl-4 pr-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600  sm:text-sm/6"
                  />
                </div>
                <button
                  onClick={() => onSendTaskToEmail(task.id, email)}
                  type="button"
                  className="flex shrink-0 items-center gap-x-1.5 rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 outline-1 -outline-offset-1 outline-gray-300 hover:bg-gray-50 focus:relative focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                >
                  <Send
                    aria-hidden="true"
                    className="-ml-0.5 size-4 text-gray-400"
                  />
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        <a
          href={`/tasks/${task.id}`}
          className="inline-block mt-2 text-sm text-primary hover:underline"
        >
          View Task Details
        </a>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        {task?.assignment?.id ? (
          <ConfirmDeleteTaskDialog
            isConfirmDeleteDialogOpen={isConfirmDeleteDialogOpen}
            setIsConfirmDeleteDialogOpen={setIsConfirmDeleteDialogOpen}
            handleDeleteTask={() => {
              onDeleteTask()
              setIsConfirmDeleteDialogOpen(false)
            }}
          />
        ) : (
          <Button
            variant="destructive"
            size="sm"
            className="flex-1"
            onClick={onDeleteTask}
          >
            Delete
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default Tasks;
