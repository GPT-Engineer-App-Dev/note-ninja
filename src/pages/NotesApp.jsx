import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import NoteCard from "@/components/NoteCard";
import AddEditNoteModal from "@/components/AddEditNoteModal";

const NotesApp = () => {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const addNote = (note) => {
    setNotes([...notes, { ...note, id: Date.now() }]);
  };

  const updateNote = (updatedNote) => {
    setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const openAddModal = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const openEditModal = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Notes App</h1>
        <Button onClick={openAddModal}>
          <Plus className="mr-2 h-4 w-4" /> Add Note
        </Button>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onEdit={() => openEditModal(note)}
            onDelete={() => deleteNote(note.id)}
          />
        ))}
      </div>
      <AddEditNoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={editingNote ? updateNote : addNote}
        note={editingNote}
      />
    </div>
  );
};

export default NotesApp;