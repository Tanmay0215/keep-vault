import express from 'express';
import {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote,
} from '../controllers/note.controller';
import { auth } from '../middleware/auth.middleware';

const router = express.Router();

// Create a new note
router.post('/', auth, createNote);

// Get all notes for a user
router.get('/user/:userId', auth, getAllNotes);

// Get a single note by ID
router.get('/:id', auth, getNoteById);

// Update a note by ID
router.put('/:id', auth, updateNote);

// Delete a note by ID
router.delete('/:id', auth, deleteNote);

export default router;
