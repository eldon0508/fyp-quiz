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
import { Grid, Stack, TextField, CardActions, CardContent, FormControl, MenuItem } from "@mui/material";

import { Iconify } from "src/components/iconify";
import { Scrollbar } from "src/components/scrollbar";
import { DashboardContent } from "src/layouts/dashboard";
import { TableEmptyRows } from "src/utils/table-empty-rows";
import { TableNoData } from "src/utils/table-no-data";
import { AnswerTableHead } from "../answer-table-head";
import { AnswerTableRow } from "../answer-table-row";
import { emptyRows, applyFilter, getComparator } from "../utils";

import type { AnswerProps } from "../answer-table-row";
import { useRouter } from "../../../routes/hooks/use-router";

// ----------------------------------------------------------------------

type Question = {
  id: number;
  name: string;
};

export function AnswerView() {
  const table = useTable();

  const [filterName, setFilterName] = useState("");
  const [answers, setAnswers] = useState<AnswerProps[]>([]);

  const dataFiltered: AnswerProps[] = applyFilter({
    inputData: answers,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  useEffect(() => {
    loadAllDatas();
  }, []);

  const loadAllDatas = async () => {
    try {
      const res = await axios.get("http://localhost:3001/admin/answer");
      setAnswers(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Answers
        </Typography>
        <Link to="/admin/answer/create">
          <Button variant="contained" color="inherit" startIcon={<Iconify icon="mingcute:add-line" />}>
            New answer
          </Button>
        </Link>
      </Box>
      <Card>
        <Scrollbar>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 800 }}>
              <AnswerTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={answers.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    answers.map((data) => data.id)
                  )
                }
                headLabel={[
                  { id: "answer_text", label: "Answer" },
                  { id: "is_correct", label: "Correctness" },
                  { id: "created_at", label: "Date Created" },
                  { id: "actions", label: "" },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(table.page * table.rowsPerPage, table.page * table.rowsPerPage + table.rowsPerPage)
                  .map((row) => (
                    <AnswerTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      reloadDatas={loadAllDatas}
                    />
                  ))}

                <TableEmptyRows height={68} emptyRows={emptyRows(table.page, table.rowsPerPage, answers.length)} />
                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          component="div"
          page={table.page}
          count={answers.length}
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

export function AnswerCreate() {
  const { question_id } = useParams();
  const router = useRouter();
  const [answer, setAnswer] = useState({
    answer_text: "",
    is_correct: -1,
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAnswer({ ...answer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/admin/answer/store`, { answer, question_id });
      router.back();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {}, []);

  const handleCancel = () => router.back();

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Answer - Create
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
                    id="answer_text"
                    name="answer_text"
                    label="Answer"
                    required
                    onChange={(e) => onInputChange(e)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    fullWidth
                    id="is_correct"
                    name="is_correct"
                    label="Correctness"
                    required
                    onChange={(e) => onInputChange(e)}
                    select
                  >
                    <MenuItem value={-1} disabled>
                      --- Select Correctness ---
                    </MenuItem>
                    <MenuItem value={0}>False</MenuItem>
                    <MenuItem value={1}>True</MenuItem>
                  </TextField>
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

export function AnswerEdit() {
  const { id } = useParams();
  const router = useRouter();
  const [answer, setAnswer] = useState({
    answer_text: "",
    is_correct: -1,
  });

  const { answer_text, is_correct } = answer;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/admin/answer/${id}/edit`);
      setAnswer(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAnswer({ ...answer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/admin/answer/${id}/update`, answer);
      router.back();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => router.back();

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Answer - Edit
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
                    id="answer_text"
                    name="answer_text"
                    label="Answer"
                    required
                    onChange={(e) => onInputChange(e)}
                    value={answer_text}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    fullWidth
                    id="is_correct"
                    name="is_correct"
                    label="Correctness"
                    required
                    onChange={(e) => onInputChange(e)}
                    select
                    value={is_correct}
                  >
                    <MenuItem value={-1} disabled>
                      --- Select Corretness ---
                    </MenuItem>
                    <MenuItem value={0}>False</MenuItem>
                    <MenuItem value={1}>True</MenuItem>
                  </TextField>
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
