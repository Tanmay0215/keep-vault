import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { notesAPI } from '../../services/api';
import { formatDate } from '../../utils/helpers';

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const NoteViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNote = async () => {
      try {
        if (!id) return;
        const data = await notesAPI.getNoteById(id);
        setNote(data);      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch note';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!note?._id || !window.confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      await notesAPI.deleteNote(note._id);
      navigate('/notes');    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete note';
      setError(errorMessage);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
        <div className="mt-4">
          <Link to="/notes" className="text-indigo-600 hover:text-indigo-800">
            ← Back to Notes
          </Link>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Note not found</h2>
          <p className="mt-2 text-gray-600">The note you're looking for doesn't exist or has been deleted.</p>
          <div className="mt-6">
            <Link to="/notes" className="text-indigo-600 hover:text-indigo-800">
              ← Back to Notes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <Link to="/notes" className="text-indigo-600 hover:text-indigo-800 mb-4">
            ← Back to Notes
          </Link>
          <div className="flex space-x-4">
            <Link
              to={`/notes/${note._id}/edit`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Edit Note
            </Link>
            <button
              onClick={handleDelete}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Note Content */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{note.title}</h1>
        
        <div className="text-sm text-gray-500 mb-6">
          Last updated: {formatDate(note.updatedAt)}
        </div>
        
        <div className="prose max-w-none">
          {note.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};