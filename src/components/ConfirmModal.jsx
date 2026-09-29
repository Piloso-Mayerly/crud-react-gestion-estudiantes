function ConfirmModal({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null
  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="btn" onClick={onCancel}>Cancel</button>
          <button className="btn btn-delete" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
