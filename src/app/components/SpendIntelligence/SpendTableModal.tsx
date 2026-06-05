import { useEffect } from 'react';
import { TABLES } from './tables';

interface Props {
  tableId: string | null;
  onClose: () => void;
}

export function SpendTableModal({ tableId, onClose }: Props) {
  const open = tableId !== null;
  const entry = tableId ? TABLES[tableId] : null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div
      className={'table-modal-overlay' + (open ? ' open' : '')}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="table-modal">
        <div className="table-modal-header">
          <div className="table-modal-title">{entry?.title ?? ''}</div>
          <button className="table-modal-close" onClick={onClose}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        <div className="table-modal-body">
          {entry?.render()}
        </div>
      </div>
    </div>
  );
}
