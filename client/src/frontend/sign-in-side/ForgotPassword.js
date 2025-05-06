import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";

function ForgotPassword({ open, handleClose }) {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData(e.currentTarget);
      const res = await axios.post("/api/forgot-password", data);
      if (res.data.success) {
        handleClose();
        alert("Password reset instructions have been sent to the provided email address, if an account exists.");
        navigate("/signin");
      } else {
        setEmailError(true);
        setEmailErrorMessage("Something went wrong. Please try again.");
      }
    } catch (err) {
      setEmailError(true);
      setEmailErrorMessage("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} component="form" onSubmit={handleSubmit}>
      <DialogTitle>Reset password</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
        <DialogContentText>
          Enter your account&apos;s email address, and we&apos;ll send you a link to reset your password.
        </DialogContentText>
        <OutlinedInput
          error={emailError}
          helperText={emailErrorMessage}
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          label="Email address"
          placeholder="Email address"
          type="email"
          fullWidth
          color={emailError ? "error" : "primary"}
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ForgotPassword.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ForgotPassword;
