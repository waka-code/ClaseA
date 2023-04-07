import React, { useState } from "react";
import { Event, EventKeyDown, taskHandler } from "../components/Types";

function useApp() {
  const [input, setInput] = useState<string>("");
  const [tasks, setTasks] = useState<taskHandler[]>([]);
  const [selectedTask, setSelectedTask] = useState<taskHandler | null>(null);

  //CONTROLADOR DE LOS CAMBIOS EN EL INPUT
  const changes = (e: Event) => {
    setInput(e.target.value);
  };

  //AGREGAR TAREA
  const addTask = () => {
    if (!input) return;

    const newTask: taskHandler = {
      id: new Date().getTime(),
      task: input,
    };

    setTasks([...tasks, newTask]);
    setInput("");
  };

  //AGREGAR CON EL KEY ENTER
  const handleKeyDown = (e: EventKeyDown) => {
    if (e.key === "Enter") {
      addTask();
      saveTask();
    }
  };

  //EDITAR TAREA
  const editTask = (id: number) => {
    const editToTask = tasks.find((task) => task.id === id);
    if (editToTask) {
      setSelectedTask(editToTask);
      setInput(editToTask.task);
    }
  };
  //GUARDAR TAREA EDITADA
  const saveTask = () => {
    if (!input) return;
    if (selectedTask) {
      const updateTask = tasks.map((task) => {
        if (task.id === selectedTask.id) return { ...task, task: input };
        else return task;
      });
      setTasks(updateTask);
      setSelectedTask(null);
      setInput("");
    }
  };
  //ELIMINAR TAREA
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((items) => items.id !== id));
  };
  return {
    changes,
    input,
    addTask,
    tasks,
    saveTask,
    editTask,
    selectedTask,
    setSelectedTask,
    deleteTask,
    handleKeyDown,
  };
}

export default useApp;
