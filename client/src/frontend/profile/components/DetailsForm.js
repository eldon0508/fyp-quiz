import React, { useEffect, useState } from "react";
import axios from "axios";

import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid2";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function DetailsForm({ profile }) {
  const [formData, setFormData] = useState({
    firstname: profile.firstname,
    lastname: profile.lastname,
    dob: profile.dob,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData, profile);
    try {
      const res = await axios.put("/profile-update", { formData });
      if (res.data.success) {
        console.log("success udpate");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
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
          <FormLabel htmlFor="lastname" required>
            Last name
          </FormLabel>
          <OutlinedInput
            id="lastname"
            name="lastname"
            required
            size="small"
            onChange={handleChange}
            defaultValue={profile.lastname ?? ""}
          />
        </FormGrid>
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="dob" required>
            Date of Birth
          </FormLabel>
          <OutlinedInput
            id="dob"
            name="dob"
            type="date"
            required
            size="small"
            onChange={handleChange}
            defaultValue={profile.dob ?? ""}
          />
        </FormGrid>
        <FormGrid size={{ xs: 12, md: 6 }}></FormGrid>
        <Stack spacing={2} direction="row">
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </Grid>
    </form>
  );
}
