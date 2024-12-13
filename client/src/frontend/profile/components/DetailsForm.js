import React, { useState } from "react";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid2";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/system";
import { Button } from "@mui/material";
import axios from "axios";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function DetailsForm({ profile }) {
  const [formData, setFormData] = useState({});
  const [editDisabled, setEditDisabled] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = () => setEditDisabled(false);
  const handleCancel = () => setEditDisabled(true);

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
          <FormLabel htmlFor="firstnname" required>
            First name
          </FormLabel>
          <OutlinedInput
            id="firstnname"
            name="firstnname"
            required
            size="small"
            onChange={handleChange}
            value={profile.firstname}
            disabled={editDisabled}
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
            value={profile.lastname}
            disabled={editDisabled}
          />
        </FormGrid>
        <FormGrid size={{ xs: 12 }}>
          <FormLabel htmlFor="address1" required>
            Address line 1
          </FormLabel>
          <OutlinedInput
            id="address1"
            name="address1"
            placeholder="Street name and number"
            autoComplete="shipping address-line1"
            required
            size="small"
            onChange={handleChange}
          />
        </FormGrid>
        <FormGrid size={{ xs: 12 }}>
          <FormLabel htmlFor="address2">Address line 2</FormLabel>
          <OutlinedInput
            id="address2"
            name="address2"
            placeholder="Apartment, suite, unit, etc. (optional)"
            autoComplete="shipping address-line2"
            required
            size="small"
            onChange={handleChange}
          />
        </FormGrid>
        <FormGrid size={{ xs: 6 }}>
          <FormLabel htmlFor="city" required>
            City
          </FormLabel>
          <OutlinedInput
            id="city"
            name="city"
            placeholder="New York"
            autoComplete="City"
            required
            size="small"
            onChange={handleChange}
          />
        </FormGrid>
        <FormGrid size={{ xs: 6 }}>
          <FormLabel htmlFor="state" required>
            State
          </FormLabel>
          <OutlinedInput
            id="state"
            name="state"
            placeholder="NY"
            autoComplete="State"
            required
            size="small"
          />
        </FormGrid>
        <FormGrid size={{ xs: 6 }}>
          <FormLabel htmlFor="zip" required>
            Zip / Postal code
          </FormLabel>
          <OutlinedInput
            id="zip"
            name="zip"
            placeholder="12345"
            autoComplete="shipping postal-code"
            required
            size="small"
          />
        </FormGrid>
        <FormGrid size={{ xs: 6 }}>
          <FormLabel htmlFor="country" required>
            Country
          </FormLabel>
          <OutlinedInput
            id="country"
            name="country"
            placeholder="United States"
            autoComplete="shipping country"
            required
            size="small"
          />
        </FormGrid>
        <Stack spacing={2} direction="row">
          {editDisabled ? (
            <Button onClick={handleEdit}>Edit</Button>
          ) : (
            <Button onClick={handleCancel}>Cancel</Button>
          )}
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </Grid>
    </form>
  );
}
