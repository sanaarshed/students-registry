import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

const AlertDialog = ({open, setOpen, onClick}) => {
  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleDialogClose}>
      <DialogContent>
        <DialogContentText>
          Are you sure, you want to proceed?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleDialogClose}
          title="cancel"
          color={"secondary"}
        />
        <Button onClick={onClick} title="Delete" color={"error"} />
      </DialogActions>
    </Dialog>
  );
};
export default AlertDialog;
