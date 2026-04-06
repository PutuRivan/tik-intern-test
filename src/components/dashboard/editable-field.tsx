'use client';

import {
  CheckRounded,
  CloseRounded,
  EditRounded,
} from '@mui/icons-material';
import {
  CircularProgress,
  IconButton,
  TextField,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';

interface EditableFieldProps {
  label: string;
  value: string;
  onSave: (newValue: string) => Promise<void>;
  type?: 'text' | 'email';
}

export default function EditableField({
  label,
  value,
  onSave,
  type = 'text',
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleEdit = () => {
    setInputValue(value);
    setError('');
    setIsEditing(true);
  };

  const handleCancel = () => {
    setInputValue(value);
    setError('');
    setIsEditing(false);
  };

  const validate = (): boolean => {
    if (!inputValue.trim()) {
      setError(`${label} wajib diisi.`);
      return false;
    }
    if (type === 'email' && !/\S+@\S+\.\S+/.test(inputValue)) {
      setError('Format email tidak valid.');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;
    if (inputValue === value) {
      setIsEditing(false);
      return;
    }
    setSaving(true);
    try {
      await onSave(inputValue);
      setIsEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  };

  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm text-gray-500">{label}</p>

      {isEditing ? (
        <div className="flex items-center gap-2">
          <TextField
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setError('');
            }}
            onKeyDown={handleKeyDown}
            type={type}
            size="small"
            autoFocus
            fullWidth
            error={!!error}
            helperText={error}
            disabled={saving}
          />
          <Tooltip title="Simpan">
            <span>
              <IconButton
                size="small"
                color="primary"
                onClick={handleSave}
                disabled={saving}
              >
                {saving
                  ? <CircularProgress size={16} />
                  : <CheckRounded fontSize="small" />
                }
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Batal">
            <IconButton
              size="small"
              color="error"
              onClick={handleCancel}
              disabled={saving}
            >
              <CloseRounded fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      ) : (
        <div className="flex items-center gap-2 group">
          <p className="font-medium text-base">{value || '-'}</p>
          <Tooltip title={`Edit ${label}`}>
            <IconButton
              size="small"
              onClick={handleEdit}
              sx={{
                opacity: { xs: 1, sm: 0 },
                '.group:hover &': { opacity: 1 },
                transition: 'opacity 0.2s',
              }}
            >
              <EditRounded sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </div>
  );
}