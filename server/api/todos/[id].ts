export default defineEventHandler(async (event) => {
    const method = event.node.req.method
    const id = getRouterParam(event, 'id')

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid ID'
        })
    }

    // PUT /api/todos/:id
    if (method === 'PUT') {
        const body = await readBody(event)
        const updated = await db.updateTodo(id, body)
        if (!updated) {
            throw createError({ statusCode: 404, statusMessage: 'Todo not found' })
        }
        return updated
    }

    // DELETE /api/todos/:id
    if (method === 'DELETE') {
        const success = await db.deleteTodo(id)
        return { success }
    }
})
