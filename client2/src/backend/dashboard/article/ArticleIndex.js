import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Layout from "../../layout";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import {
  Box,
  Button,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ArticleIndex() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    loadAllArticles();
  }, []);

  const loadAllArticles = async () => {
    try {
      const res = await axios.get("/admin/article");
      setArticles(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/admin/article/${id}/destroy`);
      loadAllArticles();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <Box
        component={Card}
        sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}
      >
        {/* <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Article
        </Typography> */}
        <CardHeader
          title={
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
              Article
            </Typography>
          }
          action={
            <IconButton>
              <Link to={`/admin/article/create`}>
                <AddIcon />
              </Link>
            </IconButton>
          }
        />
        <Divider />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item size={12}>
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
                        <TableCell>
                          <Link to={`/admin/article/${row.category_id}/edit`}>
                            {row.category_name}
                          </Link>
                        </TableCell>
                        <TableCell>{row.content}</TableCell>
                        <TableCell>{row.created_at.split("T")[0]}</TableCell>
                        <TableCell>
                          <Link to={`/admin/article/${row.id}/edit`}>
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
            </Grid>
          </Grid>
        </CardContent>
      </Box>
    </Layout>
  );
}
