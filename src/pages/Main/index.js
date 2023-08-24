import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {
  deleteRecord,
  getStudentstList,
} from "../../redux/slices/students/actions";
import "./style.css";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import DataTable from "../../components/DataTable";

const MainLanding = () => {
  const [searchText, setSearchText] = useState();
  const {data, isLoading} = useSelector((state) => state.allStudents);
  const [filterItems, setFilterItems] = useState(data);
  const [editDialogOpen, setEditDialogeOpen] = useState(false);
  const [deleteDialogeOpen, setDeleteDialogeOpen] = useState(false);
  const [selected, setSelected] = useState(false);

  const [role, setRole] = React.useState("");

  // const filterItems = useFilterHook(searchText);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudentstList());
  }, []);
  useEffect(() => {
    setFilterItems(data);
  }, [data]);

  useEffect(() => {
    let filterData = data;
    if (searchText?.length > 0) {
      filterData = data?.filter((item) => item?.name?.match(searchText));
    } else filterData = data;
    // Return the filtered data
    setFilterItems(filterData);
  }, [searchText]);

  const handleChange = (event) => {
    setRole(event.target.value);
  };
  const handleDeleteClick = (data) => {
    setDeleteDialogeOpen(true);
    setSelected(data);
  };
  const handleEditClick = (data) => {
    setEditDialogeOpen(true);
    setSelected(data);
  };
  const handleDelete = () => {
    deleteRecord(selected.ID);
  };

  const rowTemplate = [
    {
      key: "firstName",
      title: "First Name",
      type: "text",
    },
    {
      key: "lastName",
      title: "Last Name",
      type: "text",
    },
    {
      key: "dateOfBirth",
      title: "Date Of Birth",
      type: "text-date",
    },
  ];

  const Dropdown = () => (
    <FormControl>
      <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={role}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value={0}>Admin</MenuItem>
        <MenuItem value={1}>Registrar</MenuItem>
      </Select>
    </FormControl>
  );

  const InpuForm = () => {
    const handleDialogClose = () => {
      setEditDialogeOpen(false);
    };

    return (
      <Dialog open={editDialogOpen} onClose={handleDialogClose}>
        <DialogContent>
          <DialogContentText>Fill the form</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            title="cancel"
            color={"secondary"}
          />
          <Button onClick={handleDelete} title="Submit" />
        </DialogActions>
      </Dialog>
    );
  };
  const AlertDialog = ({open, setOpen, onCliCk}) => {
    const handleDialogClose = () => {
      setDeleteDialogeOpen(false);
    };

    return (
      <Dialog open={deleteDialogeOpen} onClose={handleDialogClose}>
        <DialogContent>
          <DialogContentText>
            Are you sure, you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            title="cancel"
            color={"secondary"}
          />
          <Button onClick={handleDelete} title="Delete" color={"error"} />
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div className="container">
      {/* <SeachInput searchText={searchText} setSearchText={setSearchText} /> */}

      <AppBar
        // color="theme.palette.secondary.lights"
        position="relative"
      >
        <Toolbar
          style={{
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" noWrap component="div">
            Students Managment
          </Typography>
          <Dropdown />
        </Toolbar>
      </AppBar>
      {/* <AlertDialog />
      <InpuForm /> */}
      <DataTable
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        actionButtons={role === 1}
        rows={filterItems}
        rowsTemplate={rowTemplate}
      />
    </div>
  );
};

export default MainLanding;
