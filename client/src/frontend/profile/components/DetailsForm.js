import React, { useState } from "react";
import axios from "axios";

import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid2";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function DetailsForm({ profile }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: profile.firstname,
    lastname: profile.lastname,
    dob: profile.dob,
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.put("/profile-update", { formData });
      if (res.data.success) {
        navigate(0);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.delete("/profile-delete");
      if (res.data.success) {
        await axios.post("/signout");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Dialog
        fullWidth
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="close-account-dialog-title"
        aria-describedby="close-account-dialog-description"
      >
        <DialogTitle id="close-account-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText id="close-account-dialog-description">
            <Grid container sx={{ margin: 1 }}>
              <FormGrid>
                <Typography variant="subtitle1">
                  Please confirm that you would like to delete your account. This action is irreversible and all
                  associated data will be permanently deleted.
                </Typography>
              </FormGrid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ margin: 1 }}>
          <Stack spacing={2} direction="row">
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="button" variant="contained" color="secondary" onClick={handleDelete}>
              Confirm
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
      <Grid container spacing={3} sx={{ marginBottom: 2 }}>
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="firstname" required>
            First name
          </FormLabel>
          <OutlinedInput
            id="firstname"
            name="firstname"
            required
            size="small"
            onChange={handleChange}
            defaultValue={profile.firstname ?? ""}
          />
        </FormGrid>
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="lastname">Last name</FormLabel>
          <OutlinedInput
            id="lastname"
            name="lastname"
            size="small"
            onChange={handleChange}
            defaultValue={profile.lastname ?? null}
          />
        </FormGrid>
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="dob">Date of Birth</FormLabel>
          <OutlinedInput
            id="dob"
            name="dob"
            type="date"
            size="small"
            onChange={handleChange}
            defaultValue={profile.dob ?? null}
          />
        </FormGrid>
        <FormGrid size={{ xs: 12, md: 6 }}></FormGrid>
      </Grid>
      <Grid
        container
        paddingTop="1rem"
        spacing={3}
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button variant="contained" color="error" onClick={handleOpen}>
          Delete My Account
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
    </>
  );
}
