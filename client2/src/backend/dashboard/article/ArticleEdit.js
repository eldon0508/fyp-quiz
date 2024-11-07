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
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function ArticleEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({
    title: "",
    subtitle: "",
    category_id: -1,
    content: "",
  });
  const [categories, setCategories] = useState([]);
  const { title, category_id, subtitle, content } = article;

  useEffect(() => {
    loadArticle();
  }, []);

  const loadArticle = async () => {
    try {
      const res = await axios.get(`/admin/article/${id}/edit`);
      setArticle(res.data.data);
      setCategories(res.data.categories);
    } catch (err) {
      console.error(err);
    }
  };

  const onInputChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.put(`/admin/article/${id}/update`, article);
      console.log(result, "abbababa");
      navigate("/admin/article");
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    navigate("/admin/article");
  };

  return (
    <Layout>
      <Box
        component={"form"}
        onSubmit={(e) => handleSubmit(e)}
        sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}
      >
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Article - Edit
        </Typography>
        <Grid container spacing={2}>
          <Grid item size={6}>
            <FormControl fullWidth>
              <TextField
                id="title"
                name="title"
                placeholder="Title"
                value={title}
                onChange={(e) => onInputChange(e)}
                required
              />
            </FormControl>
          </Grid>
          <Grid item size={6}>
            <FormControl fullWidth>
              <TextField
                id="subtitle"
                name="subtitle"
                placeholder="Subtitle"
                value={subtitle}
                onChange={(e) => onInputChange(e)}
                required
              />
            </FormControl>
          </Grid>
          <Grid item size={6}>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="category_id"
                name="category_id"
                label="Category"
                value={category_id}
                onChange={(e) => onInputChange(e)}
                required
                select
              >
                <MenuItem value={-1} disabled>
                  --- Select Category ---
                </MenuItem>
                {categories.map((category) => {
                  return (
                    <MenuItem value={category.id} key={category.id}>
                      {category.name}
                    </MenuItem>
                  );
                })}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item size={6}>
            <FormControl fullWidth>
              <TextField
                id="content"
                name="content"
                placeholder="Content"
                value={content}
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
    </Layout>
  );
}
