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
import { QuestionTableHead } from "../question-table-head";
import { QuestionTableRow } from "../question-table-row";
import { emptyRows, applyFilter, getComparator } from "../utils";

import type { QuestionProps } from "../question-table-row";
import { useRouter } from "../../../routes/hooks/use-router";
import { AnswerTableRow, type AnswerProps } from "../../answer/answer-table-row";
import { applyFilter as applyAnswerFilter } from "../../answer/utils";

// ----------------------------------------------------------------------

type Quiz = {
  id: number;
  name: string;
};

export function QuestionView() {
  const table = useTable();

  const [filterName, setFilterName] = useState("");
  const [questions, setQuestions] = useState<QuestionProps[]>([]);

  const dataFiltered: QuestionProps[] = applyFilter({
    inputData: questions,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  useEffect(() => {
    loadAllDatas();
  }, []);

  const loadAllDatas = async () => {
    try {
      const res = await axios.get("http://localhost:3001/admin/question");
      setQuestions(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Questions
        </Typography>
        <Link to="/admin/question/create">
          <Button variant="contained" color="inherit" startIcon={<Iconify icon="mingcute:add-line" />}>
            New question
          </Button>
        </Link>
      </Box>
      <Card>
        <Scrollbar>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 800 }}>
              <QuestionTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={questions.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    questions.map((data) => data.id)
                  )
                }
                headLabel={[
                  { id: "quiz_name", label: "Quiz Name" },
                  { id: "question_text", label: "Question" },
                  { id: "feedback", label: "Feedback" },
                  { id: "created_at", label: "Date Created" },
                  { id: "actions", label: "" },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(table.page * table.rowsPerPage, table.page * table.rowsPerPage + table.rowsPerPage)
                  .map((row) => (
                    <QuestionTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      reloadDatas={loadAllDatas}
                    />
                  ))}

                <TableEmptyRows height={68} emptyRows={emptyRows(table.page, table.rowsPerPage, questions.length)} />
                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          component="div"
          page={table.page}
          count={questions.length}
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

export function QuestionCreate() {
  const router = useRouter();
  const [question, setQuestion] = useState({
    quiz_id: -1,
    question_text: "",
    feedback: "",
  });
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/admin/question/store`, question);
      router.push("/admin/question");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/admin/question/create`);
      setQuizzes(res.data.quizzes);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => router.back();

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Question - Create
        </Typography>
      </Box>
      <Card>
        <form onSubmit={(e) => handleSubmit(e)}>
          <CardContent>
            <Grid container spacing={2} padding={3}>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    fullWidth
                    id="quiz_id"
                    name="quiz_id"
                    label="Quiz"
                    required
                    onChange={(e) => onInputChange(e)}
                    select
                  >
                    <MenuItem value={-1} disabled>
                      --- Select Quiz ---
                    </MenuItem>
                    {quizzes.map((quiz: Quiz) => (
                      <MenuItem value={quiz.id} key={quiz.id}>
                        {quiz.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    id="question_text"
                    name="question_text"
                    label="Question"
                    required
                    onChange={(e) => onInputChange(e)}
                    multiline
                    rows={6}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    id="feedback"
                    name="feedback"
                    label="Feedback"
                    required
                    onChange={(e) => onInputChange(e)}
                    multiline
                    rows={6}
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

export function QuestionEdit() {
  const { id } = useParams();
  const router = useRouter();
  const [question, setQuestion] = useState({
    quiz_id: -1,
    question_text: "",
    feedback: "",
  });
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const { quiz_id, question_text, feedback } = question;

  const table = useTable();

  const [filterName, setFilterName] = useState("");
  const [answers, setAnswers] = useState<AnswerProps[]>([]);

  const dataFiltered: AnswerProps[] = applyAnswerFilter({
    inputData: answers,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/admin/question/${id}/edit`);
      setQuestion(res.data.data);
      setQuizzes(res.data.quizzes);
      setAnswers(res.data.answers);
    } catch (err) {
      console.error(err);
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await axios.put(`http://localhost:3001/admin/question/${id}/update`, question);
      if (result.data.success) {
        router.push("/admin/question");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => router.back();

  return (
    <DashboardContent>
      {/* Question Card */}
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Question - Edit
        </Typography>
      </Box>
      <Card>
        <form onSubmit={(e) => handleSubmit(e)}>
          <CardContent>
            <Grid container spacing={2} padding={3}>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    fullWidth
                    id="quiz_id"
                    name="quiz_id"
                    label="Quiz"
                    required
                    onChange={(e) => onInputChange(e)}
                    select
                    value={quiz_id}
                  >
                    <MenuItem value={-1} disabled>
                      --- Select Quiz ---
                    </MenuItem>
                    {quizzes.map((quiz: Quiz) => (
                      <MenuItem value={quiz.id} key={quiz.id}>
                        {quiz.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    id="question_text"
                    name="question_text"
                    label="Question"
                    required
                    onChange={(e) => onInputChange(e)}
                    multiline
                    rows={6}
                    value={question_text}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    id="feedback"
                    name="feedback"
                    label="Feedback"
                    required
                    onChange={(e) => onInputChange(e)}
                    multiline
                    rows={6}
                    value={feedback}
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

      {/* Answer Card */}
      <Box display="flex" alignItems="center" my={5}>
        <Typography variant="h4" flexGrow={1}>
          Answers
        </Typography>
        <Link to={`/admin/answer/${id}/create`}>
          <Button variant="contained" color="inherit" startIcon={<Iconify icon="mingcute:add-line" />}>
            New answer
          </Button>
        </Link>
      </Box>
      <Card>
        <Scrollbar>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 800 }}>
              <QuestionTableHead
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
                  { id: "rate", label: "Vulnerability Rate" },
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
                      reloadDatas={loadData}
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
