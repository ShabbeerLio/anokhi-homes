import React from "react";
import NiEdit from "../../icons/ni-edit";
import NiDelete from "../../icons/ni-delete";

const NoteItem = ({
  item,
  notes,
  editingNoteId,
  editText,
  noteText,
  setEditingNoteId,
  setEditText,
  setNoteText,
  handleAddNote,
  handleEditNote,
  handleDeleteNote,
}) => {
  const isSystemNote = (text) => {
    return text?.toLowerCase().includes("accepted by");
  };
  return (
    <>
      <h4>Notes</h4>
      <div className="note-history">
        {[...notes]?.reverse()?.map((n) => (
          <div key={n?._id} className="note-item">
            <small>
              <span
                className={`comment ${
                  n?.by?.role === "admin"
                    ? "admin"
                    : n?.by?.role === "agent"
                      ? "agent"
                      : n?.by?.role === "staff"
                        ? "staff"
                        : "user"
                }`}
              >
                {n?.by?.name || "User"}
              </span>{" "}
              {new Date(n?.date).toLocaleString()}
            </small>

            {editingNoteId === n?._id ? (
              <>
                <div class="field">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                </div>

                <div className="modal-actions">
                  <button onClick={() => handleEditNote(item?._id, n?._id)}>
                    Save
                  </button>
                  <button onClick={() => setEditingNoteId(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <div style={{ position: "relative" }}>
                <p>{n?.text}</p>

                <div className="plot-card-actions dots">
                  {!isSystemNote(n?.text) && (
                    <>
                      <span
                        onClick={() => {
                          setEditingNoteId(n?._id);
                          setEditText(n?.text);
                        }}
                      >
                        <NiEdit />
                      </span>
                      <span onClick={() => handleDeleteNote(item?._id, n?._id)}>
                        <NiDelete />
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div class="field">
        <textarea
          placeholder="Add reason or note..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
      </div>

      <div className="modal-actions">
        <button
          onClick={() => {
            if (!noteText.trim()) return;
            handleAddNote(item._id);
          }}
        >
          Add Note
        </button>
      </div>
    </>
  );
};

export default NoteItem;
