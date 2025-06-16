import mongoose from "mongoose";

export enum ShareStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected'
}

export enum SharePermission {
    READ = 'read',
    WRITE = 'write'
}

const shareSchema = new mongoose.Schema({
    //links jo share huyi file hai 
    note: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note",
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    sharedWith: {
        type: String, // email address
        required: true,
        trim: true,
        lowercase: true,
    },
    sharedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null, // Will be set when user with this email registers
    },
    permission: {
        type: String,
        enum: Object.values(SharePermission),
        default: SharePermission.READ,
    },
    status: {
        type: String,
        enum: Object.values(ShareStatus),
        default: ShareStatus.APPROVED, // Auto-approved when owner shares directly
    },
    requestMessage: {
        type: String,
        default: null, // Message when someone requests access
    },
    isDirectShare: {
        type: Boolean,
        default: true, // true when owner shares, false when someone requests
    }
}, {
    timestamps: true
});

// Compound index to prevent duplicate shares
shareSchema.index({ note: 1, sharedWith: 1 }, { unique: true });

const Share = mongoose.model("Share", shareSchema);
export default Share;