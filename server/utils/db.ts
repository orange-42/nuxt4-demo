import { TodoModel } from '../models/todo'

export const db = {
    getTodos: async () => {
        const res = await TodoModel.find()
        console.log(res, 'res=ress1')
        return res
    },
    
    addTodo: async (title: string) => {
        const newTodo = await TodoModel.create({
            title,
            completed: false
        })
        return newTodo
    },

    updateTodo: async (id: string, updates: any) => {
        return await TodoModel.findByIdAndUpdate(id, updates, { new: true })
    },

    deleteTodo: async (id: string) => {
        const result = await TodoModel.findByIdAndDelete(id)
        return !!result
    }
}