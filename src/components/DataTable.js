import * as React from "react";
import {styled} from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {IconButton, TextField, Typography} from "@mui/material";
import moment from "moment/moment";

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// const rows = [
//   {
//     ID: 1,
//     firstName: "John",
//     lastName: "Doe",
//     dateOfBirth: "2023-07-31T12:44:55.403Z",
//   },
//   {
//     ID: 2,
//     firstName: "John",
//     lastName: "Doe",
//     dateOfBirth: "2023-07-31T12:44:55.403Z",
//   },
// ];

function DataTable(props) {
  const {
    rows,
    rowsTemplate,
    actionButtons = true,
    onEditClick,
    onDeleteClick,
  } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 700}} aria-label="customized table">
        <TableHead>
          <TableRow>
            {rowsTemplate?.map((item) => (
              <StyledTableCell
              // align="right"
              >
                {item.title}
              </StyledTableCell>
            ))}
            {actionButtons ? (
              <StyledTableCell
                colSpan={2}
                key={"actions-key"}
                component="th"
                scope="row"
              >
                Actions
              </StyledTableCell>
            ) : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            // const rowKeys = Object.keys(rowsTemplate[index]);
            // const template = rowsTemplate[index];

            return (
              <StyledTableRow key={row.name}>
                {rowsTemplate.map(({key, type}) => (
                  <StyledTableCell key={key} component="th" scope="row">
                    {type === "text" ? (
                      <Typography>{row[key]}</Typography>
                    ) : null}
                    {type === "text-date" ? (
                      <Typography>
                        {moment(row[key]).format("DD-MM-YYYY")}
                      </Typography>
                    ) : null}
                  </StyledTableCell>
                ))}

                {/* {rowKeys.map((key) => (
                  <StyledTableCell key={key} component="th" scope="row">
                    {row[key]}
                  </StyledTableCell>
                ))} */}
                {actionButtons ? (
                  <>
                    <StyledTableCell
                      key={"edit-key"}
                      component="th"
                      scope="row"
                    >
                      <IconButton
                        aria-label="edit"
                        onClick={() => onEditClick(row)}
                      >
                        <EditIcon />
                      </IconButton>
                    </StyledTableCell>
                    <StyledTableCell
                      key={"delete-key"}
                      component="th"
                      scope="row"
                    >
                      <IconButton
                        aria-label="delete"
                        onClick={() => onDeleteClick(row)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </StyledTableCell>
                  </>
                ) : null}
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default React.memo(DataTable);
