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
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ArticleIndex() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadAllCategories();
  }, []);

  const loadAllCategories = async () => {
    try {
      const res = await axios.get("/admin/category");
      setCategories(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/admin/category/${id}/destroy`);
      loadAllCategories();
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
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Category
        </Typography>
        <Grid container spacing={2}>
          <Grid item size={12}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Date Created</TableCell>
                    <TableCell colSpan={2}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((row, index) => (
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
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.created_at.split("T")[0]}</TableCell>
                      <TableCell>
                        <Link to={`/admin/category/${row.id}/edit`}>
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
      </Box>
    </Layout>
  );
}
