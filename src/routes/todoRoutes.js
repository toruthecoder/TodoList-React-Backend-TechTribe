import express from 'express'
import { userVerification } from "../middleware/authMiddleware.js";

import { getAllTodos, getTodosById, createTodo, UpdateTodo, DeleteTodo } from '../controllers/todoContoller.js'

const router = express.Router()

router.get('/', userVerification, getAllTodos)
router.get('/:id', userVerification, getTodosById)
router.post('/', userVerification, createTodo)
router.put('/:id', userVerification, UpdateTodo)
router.delete('/:id', userVerification, DeleteTodo)

export default router