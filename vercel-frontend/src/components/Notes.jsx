import { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { notesService } from '../services/notesService';
import { useAuth } from '../hooks/useAuth';
import Button from './ui/Button';
import Input from './ui/Input';
import Card from './ui/Card';
import UpgradeModal from './UpgradeModal';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const { user } = useAuth();

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setLoading(true);
      const data = await notesService.getNotes();
      // Backend returns: { notes: [...], pagination: {...} }
      setNotes(data.notes); // Extract the notes array
    } catch (error) {
      console.error('Error loading notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    if (!newNote.title.trim()) return;

    try {
      setCreating(true);
      await notesService.createNote(newNote);
      setNewNote({ title: '', content: '' });
      setShowCreateForm(false);
      await loadNotes();
    } catch (error) {
      console.error('Error creating note:', error);
      // Check if it's a limit reached error (status 403)
      if (error.response?.status === 403) {
        setShowUpgradeModal(true);
      }
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteNote = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;

    try {
      await notesService.deleteNote(id);
      await loadNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Notes</h2>
          <p className="text-sm text-gray-500">
            {notes.length} {notes.length === 1 ? 'note' : 'notes'}
            {user?.subscription === 'free' && (
              <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                Free Plan
              </span>
            )}
          </p>
        </div>
        <Button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          New Note
        </Button>
      </div>

      {/* Create Note Form */}
      {showCreateForm && (
        <Card>
          <Card.Body>
            <form onSubmit={handleCreateNote} className="space-y-4">
              <Input
                label="Title"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                placeholder="Enter note title"
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  placeholder="Write your note here..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="flex space-x-3">
                <Button type="submit" loading={creating} className="flex-1">
                  {creating ? 'Creating...' : 'Create Note'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewNote({ title: '', content: '' });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card.Body>
        </Card>
      )}

      {/* Notes Grid */}
      {notes.length === 0 ? (
        <Card>
          <Card.Body className="text-center py-12">
            <div className="text-gray-500">
              <PencilIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">No notes yet</h3>
              <p className="text-sm">Create your first note to get started!</p>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <Card key={note.id} className="hover:shadow-lg transition-shadow">
              <Card.Body>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-gray-900 truncate flex-1">
                    {note.title}
                  </h3>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-gray-400 hover:text-red-500 p-1"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
                
                {note.content && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {note.content}
                  </p>
                )}
                
                <div className="text-xs text-gray-400">
                  Created: {formatDate(note.created_at)}
                  {note.updated_at !== note.created_at && (
                    <div>Updated: {formatDate(note.updated_at)}</div>
                  )}
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onUpgradeSuccess={() => {
          // Reload notes after successful upgrade
          loadNotes();
        }}
      />
    </div>
  );
};

export default Notes;