import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid2";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/system";
import { Button, TextField } from "@mui/material";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function PasswordForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [matchError, setMatchError] = useState(false);
  const [formatError, setFormatError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      formData.password.length < 8 ||
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(
        formData.password
      )
    ) {
      setFormatError(true);
    } else if (formData.password_confirm !== formData.password) {
      setFormatError(false);
      setMatchError(true);
    } else {
      setMatchError(false);
      setFormatError(false);
      try {
        const res = await axios.put("/password-update", {
          password: formData.password,
        });
        if (res.data.success) {
          navigate("/");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <FormGrid size={{ xs: 12 }}>
          <FormLabel htmlFor="password" required>
            Password
          </FormLabel>
          <TextField
            variant="outlined"
            size="small"
            id="passwors"
            name="password"
            type="password"
            required
            onChange={handleChange}
            error={formatError}
            helperText={
              formatError
                ? "Password must be at least 8 characters long and include at least one uppercase, one lowercase, one number, and one symbol."
                : ""
            }
          />
        </FormGrid>
        <FormGrid size={{ xs: 12 }}>
          <FormLabel htmlFor="password_confirm" required>
            Confirm new password
          </FormLabel>
          <TextField
            variant="outlined"
            size="small"
            id="password_confirm"
            name="password_confirm"
            type="password"
            onChange={handleChange}
            required
            error={matchError}
            helperText={matchError ? "Password don't match." : ""}
          />
        </FormGrid>
        <Stack spacing={2} direction="row">
          <Button>Cancel</Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </Grid>
    </form>
  );
}
