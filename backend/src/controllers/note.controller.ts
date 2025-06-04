import { Request, Response } from 'express';
import Note from '../models/note.model';
import { INote } from '../types';

// Create a new note
export const createNote = async (req: Request, res: Response) => {
    try {
        const { title, content, userId } = req.body;
        if (!title || !content || !userId) {
            return res.status(400).json({ message: 'Title, content, and userId are required' });
        }

        const newNote: INote = new Note({
            title,
            content,
            user: userId,
        });

        await newNote.save();
        return res.status(201).json(newNote);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: 'Error creating note', error: error.message });
        } else {
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Get all notes for a user
export const getAllNotes = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const notes = await Note.find({ user: userId });
        if (!notes) {
            return res.status(404).json({ message: 'No notes found for this user' });
        }
        return res.status(200).json(notes);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: 'Error fetching notes', error: error.message });
        } else {
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Get a single note by ID
export const getNoteById = async (req: Request, res: Response) => {
    try {
        const noteId = req.params.id;
        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        // TODO: Add check to ensure the note belongs to the authenticated user
        return res.status(200).json(note);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: 'Error fetching note', error: error.message });
        } else {
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Update a note by ID
export const updateNote = async (req: Request, res: Response) => {
    try {
        const noteId = req.params.id;
        const { title, content } = req.body;

        const updatedNote = await Note.findByIdAndUpdate(
            noteId,
            { title, content, updatedAt: new Date() },
            { new: true } // Returns the updated document
        );

        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        // TODO: Add check to ensure the note belongs to the authenticated user
        return res.status(200).json(updatedNote);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: 'Error updating note', error: error.message });
        } else {
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Delete a note by ID
export const deleteNote = async (req: Request, res: Response) => {
    try {
        const noteId = req.params.id;
        const deletedNote = await Note.findByIdAndDelete(noteId);

        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        // TODO: Add check to ensure the note belongs to the authenticated user
        return res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: 'Error deleting note', error: error.message });
        } else {
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}
