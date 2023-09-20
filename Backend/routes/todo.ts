import express from 'express';
import { z } from 'zod';
import { authenticateJwt} from '../middleware/index';
import { Todo } from "../db/index";

const router = express.Router();

const TodoSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(500)
});

router.post('/todos', authenticateJwt, async (req, res) => {
    const validateTodo = TodoSchema.safeParse(req.body);
    if(!validateTodo.success) {
      res.status(411).json(validateTodo.error.issues[0].message);
      return;
    }
    const title = validateTodo.data.title;
    const description = validateTodo.data.description;
    try {
      const done = false;
      const userId = req.headers["userId"];
  
      const newTodo = new Todo({ title, description, done, userId });
  
      const savedTodo = await newTodo.save();
      res.status(201).json(savedTodo);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create a new todo' });
    }
});

router.get('/todos', authenticateJwt, async (req, res) => {
    try {
      const userId = req.headers["userId"];
  
      const todos = await Todo.find({ userId });
      res.json(todos);
    } catch (err) {
      res.status(500).json({ error: 'Failed to retrieve todos' });
    }
});

router.put('/todos/:id' , authenticateJwt , async (req, res) => {
    const validateTodo = TodoSchema.safeParse(req.body);
    if(!validateTodo.success) {
      res.status(411).json(validateTodo.error.issues[0].message);
      return;
    }
    const title = validateTodo.data.title;
    const description = validateTodo.data.description;
    const todoId = req.params.id;

    try {
        const updatedTodo = await Todo.findByIdAndUpdate (
            todoId ,
            { title , description},
            {new : true}
        );
        if(!updatedTodo) {
            return res.status(404).json({error : "Todo not found"});
        }
        res.json(updatedTodo);
    }
    catch(err) {
        console.error(err);
        res.status(500).json({error : 'Failed to update todo'});
    }
});

router.delete('/todos/:id' , authenticateJwt , async (req,res) => {
    const todoId = req.params.id;

    try {
        const deletedTodo = await Todo.findByIdAndDelete(todoId);
        if(!deletedTodo) {
            return res.status(404).json({error : "Todo not found"});
        }
        res.json({message:"Todo updated successfully"});
    }
    catch(err) {
        console.error(err);
        res.status(500).json({error: "Failed to delete todo"});
    }
});

router.patch('/todos/:todoId/done', authenticateJwt, async (req, res) => {
    try {
      const { todoId } = req.params;
      const userId = req.headers["userId"];
  
      const updatedTodo = await Todo.findOneAndUpdate(
        { _id: todoId, userId },
        { done: true },
        { new: true }
      );
  
      if (!updatedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
  
      res.json(updatedTodo);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update todo' });
    }
});

export default router;


  