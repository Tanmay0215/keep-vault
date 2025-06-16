import express from 'express';
import {
    shareNote,
    requestPermission,
    getPendingRequests,
    handlePermissionRequest,
    getSharedNotes,
    getNoteShares,
    removeShare
} from '../controllers/share.controller';


import { auth } from '../middlewares/auth.middleware';

const router = express.Router();

// Share a note with someone
router.post('/share', auth, shareNote);

// Request permission to access a note
router.post('/request', auth, requestPermission);

// Get pending requests for user's notes
router.get('/requests', auth, getPendingRequests);

// Approve/reject a permission request
router.put('/requests/:shareId', auth, handlePermissionRequest);

// Get notes shared with current user
router.get('/shared-with-me', auth, getSharedNotes);

// Get shares for a specific note
router.get('/note/:noteId', auth, getNoteShares);

// Remove share access
router.delete('/:shareId', auth, removeShare);

export default router;