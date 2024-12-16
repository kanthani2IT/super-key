import { Button, Dialog } from "@mui/material";

const AppTaskCard = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Button onClick={onClose}>Close</Button>
    </Dialog>
  );
};

export default AppTaskCard;
