import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import AppNavbar from "../dashboard/components/AppNavbar";
import Header from "../dashboard/components/Header";
import SideMenu from "../dashboard/components/SideMenu";
import AppTheme from "../shared-theme/AppTheme";

import axios from "axios";
import Grid from "@mui/material/Grid2";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

export default function ArticleCreate(props) {
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
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await axios.get(`/admin/articles/create`);
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
      const result = await axios.post(`/admin/articles/store`, article);
      navigate("/admin/articles");
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    navigate("/admin/articles");
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <AppNavbar />
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto",
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
              <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                Articles - Edit
              </Typography>
              <Grid container spacing={2}>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <Card>
                    <CardContent>
                      <FormControl>
                        <FormLabel htmlFor="title">Title</FormLabel>
                        <TextField
                          id="title"
                          name="title"
                          placeholder="Title"
                          autoFocus
                          required
                          fullWidth
                          variant="outlined"
                          onChange={(e) => onInputChange(e)}
                        />
                        <FormLabel htmlFor="subtitle">Subtitle</FormLabel>
                        <TextField
                          id="subtitle"
                          name="subtitle"
                          placeholder="Subtitle"
                          required
                          fullWidth
                          variant="outlined"
                          onChange={(e) => onInputChange(e)}
                        />
                        <FormLabel htmlFor="category_id">Category</FormLabel>
                        <Select
                          id="category_id"
                          name="category_id"
                          label="Age"
                          onChange={(e) => onInputChange(e)}
                        >
                          <MenuItem>--- Select Category ---</MenuItem>
                          {categories.map((category) => {
                            return (
                              <MenuItem value={category.id} key={category.id}>
                                {category.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                        <FormLabel htmlFor="content">Content</FormLabel>
                        <TextField
                          id="content"
                          name="content"
                          placeholder="Content"
                          required
                          fullWidth
                          variant="outlined"
                          onChange={(e) => onInputChange(e)}
                        />
                      </FormControl>
                    </CardContent>
                    <CardActions>
                      <Button type="button" onClick={handleCancel}>
                        Cancel
                      </Button>
                      <Button type="submit">Submit</Button>
                    </CardActions>
                  </Card>
                </form>
              </Grid>
            </Box>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
