import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useCallback } from "react";

import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import MenuList from "@mui/material/MenuList";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import MenuItem, { menuItemClasses } from "@mui/material/MenuItem";

import { Iconify } from "src/components/iconify";
import { useAlert } from "../../components/alert/AlertContext";

// ----------------------------------------------------------------------

export type QuestionProps = {
  id: string;
  quiz_id: number;
  quiz_name: string;
  question_text: string;
  feedback: string;
  created_at: string;
};

type QuestionTableRowProps = {
  row: QuestionProps;
  selected: boolean;
  onSelectRow: () => void;
  reloadDatas: () => void;
};

export function QuestionTableRow({ row, selected, onSelectRow, reloadDatas }: QuestionTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const { setAlert } = useAlert();

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const result = await axios.delete(`http://localhost:3001/admin/question/${id}/destroy`);
      if (result.data.success) {
        reloadDatas();
        setAlert({ title: "Success", type: "success", context: "Question deleted successfully!" });
      } else {
        setAlert({ title: "Opps", type: "error", context: "Something went wrong, please try again." });
      }
    } catch (err) {
      setAlert({ title: "Opps", type: "error", context: "Something went wrong, please try again." });
      console.error(err);
    }
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell sx={{ maxWidth: 450 }}>{row.question_text}</TableCell>
        <TableCell sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", maxWidth: 400 }}>
          {row.feedback}
        </TableCell>
        <TableCell>{row.created_at.split("T")[0]}</TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: "flex",
            flexDirection: "column",
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: "action.selected" },
            },
          }}
        >
          <Link to={`/admin/question/${row.id}/edit`}>
            <MenuItem sx={{ textDecoration: "none" }}>
              <Iconify icon="solar:pen-bold" />
              Edit
            </MenuItem>
          </Link>
          <MenuItem onClick={() => handleDelete(row.id)} sx={{ color: "error.main" }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
