import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { Typography } from "@mui/material";

// alert boxes
export default function AlertDialog({
  open,
  handleAlertClose,
  imgSrc,
  name,
  content,
}) {
  return (
    <Dialog open={open} onClose={handleAlertClose}>
      <div style={{ display: "flex", flexDirection: "row", padding: "0.5rem" }}>
        <img
          style={{ height: "5rem", width: "5rem" }}
          src={imgSrc}
          alt={name}
        />
        <div style={{ margin: "1rem 0rem 0rem 1rem" }}>
          <Typography color="#00b0ff">{name}</Typography>
          <Typography color="#00a152">{content}</Typography>
        </div>
      </div>
      <DialogActions>
        <Button
          sx={{ marginTop: "-4rem" }}
          onClick={handleAlertClose}
          autoFocus
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
