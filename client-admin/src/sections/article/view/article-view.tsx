/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import { Grid, MenuItem, TextField, CardActions, CardContent, FormControl } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { Iconify } from "src/components/iconify";
import { Scrollbar } from "src/components/scrollbar";
import { DashboardContent } from "src/layouts/dashboard";
import { TableEmptyRows } from "src/utils/table-empty-rows";
import { TableNoData } from "src/utils/table-no-data";
import { ArticleTableRow } from "../article-table-row";
import { ArticleTableHead } from "../article-table-head";
import { emptyRows, applyFilter, getComparator } from "../utils";

import type { ArticleProps } from "../article-table-row";
import { useRouter } from "../../../routes/hooks/use-router";
import { useAlert } from "../../../components/alert/AlertContext";

// ----------------------------------------------------------------------

type Category = {
  id: number;
  name: string;
};

export function ArticleView() {
  const router = useRouter();
  const { setAlert } = useAlert();
  const table = useTable();

  const [filterName, setFilterName] = useState("");
  const [articles, setArticles] = useState<ArticleProps[]>([]);

  const dataFiltered: ArticleProps[] = applyFilter({
    inputData: articles,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  useEffect(() => {
    loadAllDatas();
  }, []);

  const loadAllDatas = async () => {
    try {
      const res = await axios.get("http://localhost:3001/admin/article");
      setArticles(res.data.data);
    } catch (err) {
      console.error(err);
      if (err.response.status === 401) {
        router.push("/admin/signin");
        setAlert({ title: "Opps", type: "error", context: "Unauthorized, please sign in to access." });
      }
    }
  };

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Articles
        </Typography>
        <Link to="/admin/article/create">
          <Button variant="contained" color="inherit" startIcon={<Iconify icon="mingcute:add-line" />}>
            New article
          </Button>
        </Link>
      </Box>
      <Card>
        <Scrollbar>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 800 }}>
              <ArticleTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={articles.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    articles.map((data) => data.id)
                  )
                }
                headLabel={[
                  { id: "title", label: "Title" },
                  { id: "subtitle", label: "Subtitle" },
                  { id: "category_id", label: "Category" },
                  { id: "created_at", label: "Date Created" },
                  { id: "actions", label: "" },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(table.page * table.rowsPerPage, table.page * table.rowsPerPage + table.rowsPerPage)
                  .map((row) => (
                    <ArticleTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      reloadDatas={loadAllDatas}
                    />
                  ))}
                <TableEmptyRows height={68} emptyRows={emptyRows(table.page, table.rowsPerPage, articles.length)} />
                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          component="div"
          page={table.page}
          count={articles.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[10, 25, 50, 100]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState("name");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}

export function ArticleCreate() {
  const router = useRouter();
  const { setAlert } = useAlert();
  const [article, setArticle] = useState({
    category_id: -1,
    title: "",
    subtitle: "",
    authors: "",
    url: "",
    published: -1,
    content: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await axios.post(`http://localhost:3001/admin/article/store`, article);
      if (result.data.success) {
        router.push("/admin/article");
        setAlert({ title: "Success", type: "success", context: "Article created successfully!" });
      } else {
        setAlert({ title: "Opps", type: "error", context: "Something went wrong, please try again." });
      }
    } catch (err) {
      setAlert({ title: "Opps", type: "error", context: "Something went wrong, please try again." });
      console.error(err);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/admin/article/create`);
      setCategories(res.data.categories);
    } catch (err) {
      console.error(err);
      if (err.response.status === 401) {
        router.push("/admin/signin");
        setAlert({ title: "Opps", type: "error", context: "Unauthorized, please sign in to access." });
      }
    }
  };

  const handleCancel = () => router.back();

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Article - Create
        </Typography>
      </Box>
      <Card>
        <form onSubmit={(e) => handleSubmit(e)}>
          <CardContent>
            <Grid container spacing={2} padding={3}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    id="title"
                    name="title"
                    label="Title"
                    required
                    onChange={(e) => onInputChange(e)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    id="subtitle"
                    name="subtitle"
                    label="Subtitle"
                    required
                    onChange={(e) => onInputChange(e)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    fullWidth
                    id="category_id"
                    name="category_id"
                    label="Category"
                    required
                    onChange={(e) => onInputChange(e)}
                    select
                  >
                    <MenuItem value={-1} disabled>
                      --- Select Category ---
                    </MenuItem>
                    {categories.map((category: Category) => (
                      <MenuItem value={category.id} key={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    fullWidth
                    id="authors"
                    name="authors"
                    label="Authors"
                    required
                    onChange={(e) => onInputChange(e)}
                    helperText="No whitespaces needed. E.g. John,James,Kate"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <TextField fullWidth id="url" name="url" label="URL" required onChange={(e) => onInputChange(e)} />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    fullWidth
                    id="published"
                    name="published"
                    label="Status"
                    required
                    onChange={(e) => onInputChange(e)}
                    select
                  >
                    <MenuItem value={-1} disabled>
                      --- Select Status ---
                    </MenuItem>
                    <MenuItem value={1}>Published</MenuItem>
                    <MenuItem value={0}>Unpublished</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    id="content"
                    name="content"
                    label="Content"
                    required
                    onChange={(e) => onInputChange(e)}
                    multiline
                    rows={10}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container spacing={2} padding={3} direction="row" justifyContent="flex-end" alignItems="center">
              <Grid item>
                <Button type="button" variant="contained" color="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </form>
      </Card>
    </DashboardContent>
  );
}

export function ArticleEdit() {
  const router = useRouter();
  const { id } = useParams();
  const { setAlert } = useAlert();
  const [article, setArticle] = useState({
    category_id: -1,
    title: "",
    subtitle: "",
    authors: "",
    url: "",
    published: null,
    content: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { category_id, title, subtitle, authors, url, published, content } = article;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/admin/article/${id}/edit`);
      setArticle(res.data.data);
      setCategories(res.data.categories);
    } catch (err) {
      console.error(err);
      if (err.response.status === 401) {
        router.push("/admin/signin");
        setAlert({ title: "Opps", type: "error", context: "Unauthorized, please sign in to access." });
      }
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setImage(target.files[0]);
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const formData = {
        image: image ?? null,
      };
      const result = await axios.post(`http://localhost:3001/admin/article/${id}/upload`, formData, config);
      if (result.data.success) {
        router.push("/admin/article");
        setAlert({ title: "Success", type: "success", context: "Article image uploaded successfully!" });
      } else {
        setAlert({ title: "Opps", type: "error", context: "Something went wrong, please try again." });
      }
    } catch (err) {
      setAlert({ title: "Opps", type: "error", context: "Something went wrong, please try again." });
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await axios.put(`http://localhost:3001/admin/article/${id}/update`, article);
      if (result.data.success) {
        router.push("/admin/article");
        setAlert({ title: "Success", type: "success", context: "Article updated successfully!" });
      } else {
        setAlert({ title: "Opps", type: "error", context: "Something went wrong, please try again." });
      }
    } catch (err) {
      setAlert({ title: "Opps", type: "error", context: "Something went wrong, please try again." });
      console.error(err);
    }
  };

  const handleCancel = () => router.back();
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Article - Edit
        </Typography>
      </Box>
      <Card>
        <Dialog
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form onSubmit={(e) => handleUpload(e)}>
            <DialogTitle id="alert-dialog-title">Upload Image</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <TextField type="file" name="image" id="image" onChange={handleImageChange} />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
              <Button type="submit">Upload</Button>
            </DialogActions>
          </form>
        </Dialog>
        <form onSubmit={(e) => handleSubmit(e)}>
          <CardContent>
            <Grid container spacing={2} padding={3}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    id="title"
                    name="title"
                    label="Title"
                    required
                    onChange={(e) => onInputChange(e)}
                    value={title}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    id="subtitle"
                    name="subtitle"
                    label="Subtitle"
                    required
                    onChange={(e) => onInputChange(e)}
                    value={subtitle}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    fullWidth
                    id="category_id"
                    name="category_id"
                    label="Category"
                    required
                    onChange={(e) => onInputChange(e)}
                    select
                    value={category_id}
                  >
                    <MenuItem value={-1} disabled>
                      --- Select Category ---
                    </MenuItem>
                    {categories.map((category: Category) => (
                      <MenuItem value={category.id} key={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    fullWidth
                    id="authors"
                    name="authors"
                    label="authors"
                    required
                    onChange={(e) => onInputChange(e)}
                    helperText="No whitespaces needed. E.g. John,James,Kate"
                    value={authors}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    fullWidth
                    id="url"
                    name="url"
                    label="URL"
                    required
                    onChange={(e) => onInputChange(e)}
                    value={url}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    fullWidth
                    id="published"
                    name="published"
                    label="Status"
                    required
                    onChange={(e) => onInputChange(e)}
                    select
                    value={article.published === true ? 1 : 0}
                  >
                    <MenuItem value={-1} disabled>
                      --- Select Status ---
                    </MenuItem>
                    <MenuItem value={1}>Published</MenuItem>
                    <MenuItem value={0}>Unpublished</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    id="content"
                    name="content"
                    label="Content"
                    required
                    onChange={(e) => onInputChange(e)}
                    multiline
                    value={content}
                    rows={10}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container spacing={2} padding={3} direction="row" justifyContent="flex-end" alignItems="center">
              <Grid item>
                <Button type="button" variant="contained" color="info" onClick={handleOpen}>
                  Upload Image
                </Button>
              </Grid>
              <Grid item>
                <Button type="button" variant="contained" color="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </form>
      </Card>
    </DashboardContent>
  );
}
