export interface ITodo {
  id: string
  title: string
  completed: boolean
  createdAt: string
}

export type CreateTodoInput = Pick<ITodo, 'title'>
export type UpdateTodoInput = Partial<Pick<ITodo, 'title' | 'completed'>>
