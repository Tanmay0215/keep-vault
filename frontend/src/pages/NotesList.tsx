import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { notesAPI } from '../services/api';

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const NotesList = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const data = await notesAPI.getAllNotes();
      setNotes(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch notes');
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      await notesAPI.deleteNote(id);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete note');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>
        <Link
          to="/notes/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Create New Note
        </Link>
      </div>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <div
            key={note._id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {note.title}
            </h2>
            <p className="text-gray-600 mb-4 line-clamp-3">{note.content}</p>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {new Date(note.updatedAt).toLocaleDateString()}
              </div>
              <div className="space-x-2">
                <Link
                  to={`/notes/${note._id}`}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {notes.length === 0 && !error && (
        <div className="text-center text-gray-600 mt-8">
          No notes found. Create your first note!
        </div>
      )}
    </div>
  );
};
