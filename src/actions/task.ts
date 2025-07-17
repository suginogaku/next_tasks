'use server'

import { Task, TaskModel } from "@/models/task";
import { connectToDatabase } from "@/utils/database";
import { redirect } from "next/navigation";

export interface formState {
  error: string;
}

export const createTask = async (state: formState, formData: FormData) => {
  const newTask: Task = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    dueDate: formData.get('dueDate') as string,
    isCompleted: false
  }

  // DBとの接続設定確立してないからエラーになるよ
  try {
    await connectToDatabase()
    await TaskModel.create(newTask)
  } catch (error) {
    state.error = "タスクの作成に失敗しました"
    return state;
  }

  redirect("/")
}

export const updateTask = async (id: string, state: formState, formData: FormData) => {
  const updateTask: Task = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    dueDate: formData.get('dueDate') as string,
    isCompleted: Boolean(formData.get('isCompleted'))
  }

  // DBとの接続設定確立してないからエラーになるよ
  try {
    await connectToDatabase()
    await TaskModel.updateOne({_id: id}, updateTask)
  } catch (error) {
    state.error = "タスクの更新に失敗しました"
    return state;
  }

  redirect("/")
}

export const deleteTask = async (id: string, state: formState) => {
  try {
    await connectToDatabase()
    await TaskModel.deleteOne({_id: id})
  } catch (error) {
    state.error = "タスクの削除に失敗しました"
    return state;
  }

  redirect("/")
}