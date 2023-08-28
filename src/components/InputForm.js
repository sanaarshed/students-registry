import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {useForm} from "react-hook-form";
import Grid from "@mui/material/Grid";
import {toast} from "react-toastify";
import FormTextField from "./FormTextInput";
import FormDateField from "./FormDateField";
import FormSelectField from "./FormSelectField";
import {Divider, IconButton} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DataTable from "./DataTable";
import AlertDialog from "./AlertDialoge";
import moment from "moment";

export default function InputForm({
  open,
  handleClose,
  defaultValues,
  onSubmit,
  formTitle,
  formFields,
  nestedFields,
  nextedTableFields,
  nextedRowData,
  setNextedRowData,
  permission,
  showNested,
  setShowNested,
}) {
  const [showNestedInputs, setShowNestedInputs] = useState(false);
  const [deleteDialogeOpen, setDeleteDialogeOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
    reset,
  } = useForm();
  const {
    control: nestedControl,
    handleSubmit: handleNestedSubmit,
    formState: {errors: nestedErrors},
    getValues: getNestedValues,
    reset: nestedReset,
  } = useForm();

  useEffect(() => {
    reset({});
    clearNested();
  }, []);

  const clearNested = () => {
    nestedReset({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      relationshipId: "",
      nationalityId: "",
    });
  };

  useEffect(() => {
    console.log("defaultValues---->", defaultValues);
    reset(defaultValues);
  }, [defaultValues]);

  const handleCancel = () => {
    reset({});
    nestedReset({});
    setNextedRowData([]);
    handleClose();
  };

  const handleOnSubmit = () => {
    onSubmit(getValues());
  };

  const handleAddNestedData = () => {
    console.log("getNestedValues---->", getNestedValues());
    let temp = [...nextedRowData];
    if (temp[selected]) {
      console.log(" temp[selected]---->", temp[selected]);
      temp[selected] = getNestedValues();
      console.log("temp---->", temp);
      setNextedRowData(temp);
    } else {
      setNextedRowData([...nextedRowData, getNestedValues()]);
    }
    clearNested();
    setShowNestedInputs(false);
    setSelected(null);
  };

  const handleDeleteClick = (data) => {
    setDeleteDialogeOpen(true);
    // setSelected(data);
  };
  const handleEditClick = (data) => {
    setShowNestedInputs(true);
    clearNested();
    // setSelected(data);
  };
  const handleDelete = () => {
    // deleteRecord(selected.ID);
  };
  const onRowClick = (data, index) => {
    nestedReset(data);
    setSelected(index);
  };

  const nestedInputs = (template) => {
    return template?.map((item) => (
      <Grid item xs={12} sm={6} key={item.controllerName}>
        {item.fieldType === "text" ? (
          <FormTextField
            control={nestedControl}
            errors={nestedErrors}
            {...item}
          />
        ) : item.fieldType === "select" ? (
          <FormSelectField
            control={nestedControl}
            errors={nestedErrors}
            {...item}
          />
        ) : item.fieldType === "date" ? (
          <FormDateField
            control={nestedControl}
            errors={nestedErrors}
            {...item}
          />
        ) : null}
      </Grid>
    ));
  };

  const renderInputs = (template) => {
    return template?.map((item) => (
      <Grid item xs={12} sm={6} key={item.controllerName}>
        {item.fieldType === "text" ? (
          <FormTextField control={control} errors={errors} {...item} />
        ) : item.fieldType === "select" ? (
          <FormSelectField control={control} errors={errors} {...item} />
        ) : item.fieldType === "date" ? (
          <FormDateField control={control} errors={errors} {...item} />
        ) : null}
      </Grid>
    ));
  };

  console.log("selected---->", selected);
  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      fullWidth
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{formTitle}</DialogTitle>
      <DialogContent>
        <Grid container>{renderInputs(formFields)}</Grid>
        {showNested ? (
          <Grid container>
            <Divider>Add Family Member</Divider>

            {showNestedInputs ? (
              // | (selected != null)
              <Grid container item>
                {nestedInputs(nestedFields)}
                <Grid
                  container
                  item
                  alignItems={"center"}
                  xs={12}
                  sm={6}
                  gap={3}
                >
                  <Button
                    autoFocus
                    variant="contained"
                    onClick={handleNestedSubmit(handleAddNestedData)}
                    color="primary"
                  >
                    {selected == null ? "Add" : "Update"}
                  </Button>
                  <Button
                    autoFocus
                    variant="contained"
                    onClick={() => {
                      setSelected(null);
                      clearNested();
                      setShowNestedInputs(false);
                    }}
                    color="primary"
                  >
                    cancel
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Button
                autoFocus
                variant="contained"
                onClick={() => setShowNestedInputs(true)}
                color="primary"
              >
                Add New Member
              </Button>
            )}
            <DataTable
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
              actionButtons={permission}
              rows={nextedRowData}
              rowsTemplate={nextedTableFields}
              onRowClick={onRowClick}
            />
            <AlertDialog
              open={deleteDialogeOpen}
              setOpen={setDeleteDialogeOpen}
              onClick={handleDelete}
            />
          </Grid>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          variant="contained"
          onClick={handleSubmit(handleOnSubmit)}
          color="primary"
        >
          Submit
        </Button>
        <Button onClick={handleCancel} color="primary" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
