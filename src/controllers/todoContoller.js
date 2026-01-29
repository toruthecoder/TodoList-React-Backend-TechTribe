import Todo from '../model/todo.js'

// Get all the Todos 
export const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 })
        res.status(200).json(todos)
    } catch (error) {
        console.error(`Error in Fetching all Todos :`, error)
        res.status(500).json({ message: `Internal server error 0` })
    }
}

// Get all the todos by id
export const getTodosById = async (req, res) => {
    try {
        const todo = await Todo.findOne({
            _id: req.params.id,
            user: req.user._id,
        });
        if (!todo) return res.status(404).json({ message: `Todo Not Found` })
        res.status(200).json(todo)
    } catch (error) {
        console.error(`Error in Fetching all Todos By Id :`, error)
        res.status(500).json({ message: `Internal server error 1` })
    }
}

// Post the todo
export const createTodo = async (req, res) => {
    try {
        const { title, content } = req.body
        const newTodo = new Todo({ title, content, user: req.user._id, })
        const saveTodo = await newTodo.save()
        res.status(200).json(saveTodo)
    } catch (error) {
        console.error(`Error Creating Todos :`, error)
        res.status(500).json({ message: `Internal server error 2` })
    }
}

// Update the todo
export const UpdateTodo = async (req, res) => {
    try {
        const { title, content, completed } = req.body;
        const updateTodo = await Todo.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { title, content, completed },
            { new: true }
        );
        if (!updateTodo) return res.status(404).json({ message: `Updated Todo Not Found` })
        res.status(200).json(updateTodo)
    } catch (error) {
        console.error(`Error Updating Todos :`, error)
        res.status(500).json({ message: `Internal server error 3` })
    }
}

// delete todo
export const DeleteTodo = async (req, res) => {
    try {
        const deleteTodo = await Todo.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });
        if (!deleteTodo) return res.status(404).json({ message: `Deleted Todo Not Found` })
        res.status(200).json(`Todo Deleted Succesfully`)
    } catch (error) {
        console.error(`Error Deleting Todo :`, error)
        res.status(500).json({ message: `Internal server error 4` })
    }
}