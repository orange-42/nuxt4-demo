export default defineEventHandler(async (event) => {
    const method = event.node.req.method

    // GET /api/todos
    if (method === 'GET') {
        const todos = await db.getTodos()
        // Sort by createdAt desc
        return todos.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    // POST /api/todos
    if (method === 'POST') {
        const body = await readBody(event)
        if (!body?.title) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Title is required'
            })
        }
        return await db.addTodo(body.title)
    }
})
