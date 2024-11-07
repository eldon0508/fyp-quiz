import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../layout";

import axios from "axios";
import {
  Box,
  Button,
  Card,
  FormControl,
  Grid2 as Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function CategoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });
  const { name, description } = category;

  useEffect(() => {
    loadArticle();
  }, []);

  const loadArticle = async () => {
    try {
      const res = await axios.get(`/admin/category/${id}/edit`);
      setCategory(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const onInputChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.put(`/admin/category/${id}/update`, category);
      navigate("/admin/category");
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    navigate("/admin/category");
  };

  return (
    <Layout>
      <Box
        component={"form"}
        onSubmit={(e) => handleSubmit(e)}
        sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}
      >
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Category - Edit
        </Typography>
        <Box component={Card}>
          <Grid container spacing={2}>
            <Grid item size={6}>
              <FormControl fullWidth>
                <TextField
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </FormControl>
            </Grid>
            <Grid item size={6}>
              <FormControl fullWidth>
                <TextField
                  id="description"
                  name="description"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </FormControl>
            </Grid>
            <Grid item>
              <Stack spacing={2} direction={"row"}>
                <Button type="button" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
}
