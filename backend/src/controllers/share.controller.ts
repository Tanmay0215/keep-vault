import { Request, Response } from 'express';
import Share, { ShareStatus, SharePermission } from '../models/share.model';
import Note from '../models/note.model';
import User from '../models/user.model';
import { sendShareNotificationEmail, sendPermissionRequestEmail } from '../services/email.service';

// Share a note with someone (owner action)
export const shareNote = async (req: Request, res: Response) => {
    try {
        const { noteId, email, permission = 'read' } = req.body;
        const ownerId = req.body.userId;

        // Verify the note belongs to the user
        const note = await Note.findOne({ _id: noteId, user: ownerId });
        if (!note) {
            return res.status(404).json({ message: 'Note not found or you do not have permission' });
        }

        // Check if already shared
        const existingShare = await Share.findOne({ note: noteId, sharedWith: email });
        if (existingShare) {
            return res.status(400).json({ message: 'Note already shared with this email' });
        }

        // Check if user exists
        const sharedUser = await User.findOne({ email, isEmailVerified: true });

        const share = new Share({
            note: noteId,
            owner: ownerId,
            sharedWith: email,
            sharedUser: sharedUser?._id || null,
            permission,
            status: ShareStatus.APPROVED,
            isDirectShare: true
        });

        await share.save();

        // Send notification email
        try {
            await sendShareNotificationEmail(email, note.title, permission);
        } catch (emailError) {
            console.error('Failed to send notification email:', emailError);
        }

        return res.status(201).json({ 
            message: 'Note shared successfully',
            share: await share.populate(['note', 'owner'])
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error sharing note', error });
    }
};

// Request permission to access a note
export const requestPermission = async (req: Request, res: Response) => {
    try {
        const { noteId, message } = req.body;
        const requesterId = req.body.userId;

        const requester = await User.findById(requesterId);
        if (!requester) {
            return res.status(404).json({ message: 'User not found' });
        }

        const note = await Note.findById(noteId).populate('user');
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        // Check if already shared or requested
        const existingShare = await Share.findOne({ note: noteId, sharedWith: requester.email });
        if (existingShare) {
            return res.status(400).json({ message: 'Access already exists or requested' });
        }

        const share = new Share({
            note: noteId,
            owner: note.user._id,
            sharedWith: requester.email,
            sharedUser: requesterId,
            permission: SharePermission.READ,
            status: ShareStatus.PENDING,
            requestMessage: message,
            isDirectShare: false
        });

        await share.save();

        // Send request email to note owner
        try {
            await sendPermissionRequestEmail(
                (note.user as any).email,
                requester.email,
                note.title,
                message
            );
        } catch (emailError) {
            console.error('Failed to send request email:', emailError);
        }

        return res.status(201).json({ 
            message: 'Permission request sent successfully',
            share
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error requesting permission', error });
    }
};

// Get pending requests for user's notes
export const getPendingRequests = async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId;

        const requests = await Share.find({
            owner: userId,
            status: ShareStatus.PENDING
        }).populate(['note', 'sharedUser']);

        return res.status(200).json(requests);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching requests', error });
    }
};

// Approve or reject a permission request
export const handlePermissionRequest = async (req: Request, res: Response) => {
    try {
        const { shareId, action, permission } = req.body; // action: 'approve' or 'reject'
        const userId = req.body.userId;

        const share = await Share.findOne({ _id: shareId, owner: userId });
        if (!share) {
            return res.status(404).json({ message: 'Share request not found' });
        }

        if (action === 'approve') {
            share.status = ShareStatus.APPROVED;
            if (permission) share.permission = permission;
        } else {
            share.status = ShareStatus.REJECTED;
        }

        await share.save();

        return res.status(200).json({ 
            message: `Request ${action}d successfully`,
            share
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error handling request', error });
    }
};

// Get notes shared with current user
export const getSharedNotes = async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // ⛔ Prevent null access
        }

        const shares = await Share.find({
            sharedWith: user.email,
            status: ShareStatus.APPROVED
        }).populate(['note', 'owner']);

        return res.status(200).json(shares);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching shared notes', error });
    }
};


// Get shares for a specific note (owner only)
export const getNoteShares = async (req: Request, res: Response) => {
    try {
        const { noteId } = req.params;
        const userId = req.body.userId;

        // Verify ownership
        const note = await Note.findOne({ _id: noteId, user: userId });
        if (!note) {
            return res.status(404).json({ message: 'Note not found or no permission' });
        }

        const shares = await Share.find({ note: noteId }).populate('sharedUser');

        return res.status(200).json(shares);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching note shares', error });
    }
};

// Remove share access
export const removeShare = async (req: Request, res: Response) => {
    try {
        const { shareId } = req.params;
        const userId = req.body.userId;

        const share = await Share.findOne({ _id: shareId, owner: userId });
        if (!share) {
            return res.status(404).json({ message: 'Share not found or no permission' });
        }

        await Share.findByIdAndDelete(shareId);

        return res.status(200).json({ message: 'Share removed successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error removing share', error });
    }
};