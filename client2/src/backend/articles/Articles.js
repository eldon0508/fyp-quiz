import React, { useEffect, useState } from "react";

import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppNavbar from "../dashboard/components/AppNavbar";
import Header from "../dashboard/components/Header";
import SideMenu from "../dashboard/components/SideMenu";
import AppTheme from "../shared-theme/AppTheme";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { Button, CardContent, CardHeader, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

export default function Articles(props) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    loadAllArticles();
  }, []);

  const loadAllArticles = async () => {
    try {
      const res = await axios.get("/admin/articles");
      setArticles(res.data.articles);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/admin/articles/${id}/destroy`);
      loadAllArticles();
    } catch (err) {
      console.error(err);
    }
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
                Articles
              </Typography>
              <Grid container spacing={2}>
                <Grid item>
                  <Card>
                    <CardHeader>
                      <Link to={`/admin/articles/create`}>
                        <AddIcon />
                      </Link>
                    </CardHeader>
                    <CardContent>
                      <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>ID</TableCell>
                              <TableCell>Title</TableCell>
                              <TableCell>Subtitle</TableCell>
                              <TableCell>Category</TableCell>
                              <TableCell>Content</TableCell>
                              <TableCell>Date Created</TableCell>
                              <TableCell colSpan={2} align="center">
                                Actions
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {articles.map((row, index) => (
                              <TableRow
                                key={row.name}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  {index + 1}
                                </TableCell>
                                <TableCell>{row.title}</TableCell>
                                <TableCell>{row.subtitle}</TableCell>
                                <TableCell style={{ textDecoration: "none" }}>
                                  <Link
                                    to={`/admin/articles/${row.category_id}/edit`}
                                  >
                                    {row.category_name}
                                  </Link>
                                </TableCell>
                                <TableCell>{row.content}</TableCell>
                                <TableCell>
                                  {row.created_at.split("T")[0]}
                                </TableCell>
                                <TableCell>
                                  <Link to={`/admin/articles/${row.id}/edit`}>
                                    <EditIcon />
                                  </Link>
                                </TableCell>
                                <TableCell>
                                  <Button
                                    type="button"
                                    onClick={() => handleDelete(row.id)}
                                  >
                                    <DeleteIcon />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
