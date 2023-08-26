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
import AddIcon from "@mui/icons-material/Add";
import InputForm from "../../components/InputForm";
import AlertDialog from "../../components/AlertDialoge";

const MainLanding = () => {
  const [searchText, setSearchText] = useState();
  const {data, isLoading} = useSelector((state) => state.allStudents);
  const [filterItems, setFilterItems] = useState(data);
  const [formDialogOpen, setFormDialogeOpen] = useState(false);
  const [deleteDialogeOpen, setDeleteDialogeOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  const [familyMemberData, setFamilyMemberData] = useState([]);

  const [role, setRole] = React.useState("");

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
    setFormDialogeOpen(true);
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

  const familyRowTemplate = [
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
    {
      key: "nationalityId",
      title: "Date Of Birth",
      type: "text-date",
    },
  ];

  const Dropdown = () => (
    <FormControl
      style={{
        backgroundColor: "white",
        minWidth: 200,
        margin: "10px 0px",
        borderRadius: "4px",
        // height: "100%",
      }}
    >
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

  const formFields = [
    {
      title: "First Name",
      controllerName: "firstName",
      fieldType: "text",
    },
    {
      title: "Last Name",
      controllerName: "lastName",
      fieldType: "text",
    },
    {
      title: "Age",
      controllerName: "dateOfBirth",
      fieldType: "date",
    },

    {
      title: "Nationality",
      controllerName: "dateOfBirth",
      fieldType: "select",
    },
  ];

  const nestedFielsTemplate = [
    {
      controllerName: "firstName",
      title: "First Name",
      fieldType: "text",
    },
    {
      controllerName: "lastName",
      title: "Last Name",
      fieldType: "text",
    },
    {
      controllerName: "dateOfBirth",
      title: "Date Of Birth",
      fieldType: "text-date",
    },
    {
      controllerName: "relationshipId",
      title: "Date Of Birth",
      fieldType: "text-date",
    },
    {
      controllerName: "nationalityId",
      title: "Date Of Birth",
      fieldType: "select",
    },
  ];

  const onRowClick = (rowData) => {
    console.log("rowData---->", rowData);
  };

  return (
    <div className="container">
      {/* <SeachInput searchText={searchText} setSearchText={setSearchText} /> */}

      <AppBar position="relative">
        <Box className={"header_container"}>
          <Typography variant="h6" noWrap component="div">
            Students Managment
          </Typography>

          <Box className={"header_button_container "}>
            {role === 1 ? (
              <Button
                variant="contained"
                color="secondary"
                endIcon={<AddIcon />}
                onClick={() => setFormDialogeOpen(true)}
              >
                Add New
              </Button>
            ) : null}
            <Dropdown />
          </Box>
        </Box>
      </AppBar>
      <AlertDialog
        open={deleteDialogeOpen}
        setOpen={setDeleteDialogeOpen}
        onClick={handleDelete}
      />
      <InputForm
        open={open}
        handleClose={() => {
          setSelected(null);
        }}
        // onSubmit={onSubmit}
        formTitle={selected ? "Update Student Record" : "Add New Student"}
        formFields={formFields}
        defaultValues={selected}
        nestedFields={nestedFielsTemplate}
        nextedTableFields={familyRowTemplate}
        nextedRowData={familyMemberData}
        setNextedRowData={setFamilyMemberData}
        permission={role === 1}
      />
      <DataTable
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        actionButtons={role === 1}
        rows={filterItems}
        rowsTemplate={rowTemplate}
        onRowClick={onRowClick}
      />
    </div>
  );
};

export default MainLanding;
