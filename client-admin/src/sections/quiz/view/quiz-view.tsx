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
import { Grid, Stack, TextField, CardActions, CardContent, FormControl } from "@mui/material";

import { Iconify } from "src/components/iconify";
import { Scrollbar } from "src/components/scrollbar";
import { DashboardContent } from "src/layouts/dashboard";
import { TableEmptyRows } from "src/utils/table-empty-rows";
import { TableNoData } from "src/utils/table-no-data";
import { QuizTableHead } from "../quiz-table-head";
import { QuizTableRow } from "../quiz-table-row";
import { emptyRows, applyFilter, getComparator } from "../utils";

import type { QuizProps } from "../quiz-table-row";
import { useRouter } from "../../../routes/hooks/use-router";
import { useAlert } from "../../../components/alert/AlertContext";

// ----------------------------------------------------------------------

export function QuizView() {
  const table = useTable();

  const [filterName, setFilterName] = useState("");
  const [quizzes, setQuizzes] = useState<QuizProps[]>([]);

  const dataFiltered: QuizProps[] = applyFilter({
    inputData: quizzes,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  useEffect(() => {
    loadAllDatas();
  }, []);

  const loadAllDatas = async () => {
    try {
      const res = await axios.get("http://localhost:3001/admin/quiz");
      setQuizzes(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Quizzes
        </Typography>
        <Link to="/admin/quiz/create">
          <Button variant="contained" color="inherit" startIcon={<Iconify icon="mingcute:add-line" />}>
            New quiz
          </Button>
        </Link>
      </Box>
      <Card>
        <Scrollbar>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 800 }}>
              <QuizTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={quizzes.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    quizzes.map((data) => data.id)
                  )
                }
                headLabel={[
                  { id: "name", label: "Name" },
                  { id: "description", label: "Description" },
                  { id: "question_count", label: "Questions Count" },
                  { id: "created_at", label: "Date Created" },
                  { id: "actions", label: "" },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(table.page * table.rowsPerPage, table.page * table.rowsPerPage + table.rowsPerPage)
                  .map((row) => (
                    <QuizTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      reloadDatas={loadAllDatas}
                    />
                  ))}

                <TableEmptyRows height={68} emptyRows={emptyRows(table.page, table.rowsPerPage, quizzes.length)} />
                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          component="div"
          page={table.page}
          count={quizzes.length}
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

export function QuizCreate() {
  const router = useRouter();
  const { setAlert } = useAlert();
  const [quiz, setQuiz] = useState({
    name: "",
    description: "",
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await axios.post(`http://localhost:3001/admin/quiz/store`, quiz);
      if (result.data.success) {
        router.push("/admin/quiz");
        setAlert({ title: "Success", type: "success", context: "Quiz created successfully!" });
      } else {
        setAlert({ title: "Opps", type: "error", context: "Something went wrong, please try again." });
      }
    } catch (err) {
      setAlert({ title: "Opps", type: "error", context: "Something went wrong, please try again." });
      console.error(err);
    }
  };

  const handleCancel = () => router.back();

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Quiz - Create
        </Typography>
      </Box>
      <Card>
        <form onSubmit={(e) => handleSubmit(e)}>
          <CardContent>
            <Grid container spacing={2} padding={3}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField fullWidth id="name" name="name" label="Name" required onChange={(e) => onInputChange(e)} />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    id="description"
                    name="description"
                    label="Description"
                    required
                    onChange={(e) => onInputChange(e)}
                    multiline
                    rows={3}
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

export function QuizEdit() {
  const { id } = useParams();
  const router = useRouter();
  const { setAlert } = useAlert();
  const [quiz, setQuiz] = useState({
    name: "",
    description: "",
  });

  const { name, description } = quiz;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/admin/quiz/${id}/edit`);
      setQuiz(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await axios.put(`http://localhost:3001/admin/quiz/${id}/update`, quiz);
      if (result.data.success) {
        router.push("/admin/quiz");
        setAlert({ title: "Success", type: "success", context: "Quiz updated successfully!" });
      } else {
        setAlert({ title: "Opps", type: "error", context: "Something went wrong, please try again." });
      }
    } catch (err) {
      setAlert({ title: "Opps", type: "error", context: "Something went wrong, please try again." });
      console.error(err);
    }
  };

  const handleCancel = () => router.back();

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Quiz - Edit
        </Typography>
      </Box>
      <Card>
        <form onSubmit={(e) => handleSubmit(e)}>
          <CardContent>
            <Box sx={{ p: 4 }}>
              <Stack direction="row" spacing={2}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    required
                    onChange={(e) => onInputChange(e)}
                    value={name}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    id="description"
                    name="description"
                    label="Description"
                    required
                    onChange={(e) => onInputChange(e)}
                    multiline
                    rows={3}
                    value={description}
                  />
                </FormControl>
              </Stack>
            </Box>
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
