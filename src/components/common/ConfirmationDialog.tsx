import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

const ConfirmDialog = ({ open, onClose, onConfirm, loading }: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Are you sure you want to delete?</DialogTitle>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button color="error" onClick={onConfirm} disabled={loading}>
          {loading ? <CircularProgress size={18} /> : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
