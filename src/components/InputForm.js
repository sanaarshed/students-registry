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
  setFamilyMemberData,
  permission,
}) {
  const [nestedInput, setNestedInput] = useState(false);
  const [deleteDialogeOpen, setDeleteDialogeOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
    reset,
  } = useForm();
  const {
    control: nestedControl,
    handleSubmit: handleNetedSubmit,
    formState: {errors: nestedErrors},
    getValues: getNestedValues,
    reset: nestedReset,
  } = useForm();

  useEffect(() => {
    reset({});
  }, []);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  const handleCancel = () => {
    reset({});
    handleClose();
  };

  const handleOnSubmit = () => {
    onSubmit(getValues());
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
    // deleteRecord(selected.ID);
  };
  const onRowClick = (data) => {
    console.log("data---->", data);
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
        <Divider>Add Family Member</Divider>
        <Grid container>
          {
            <Button
              autoFocus
              variant="contained"
              onClick={() => setNestedInput(true)}
              color="primary"
            >
              Add New Member
            </Button>
          }
          {nestedInput ? (
            <Grid container item>
              {renderInputs(nestedFields)}
              <Button
                autoFocus
                variant="contained"
                onClick={() => addFamilyMember()}
                color="primary"
              >
                Add
              </Button>
              <Button
                autoFocus
                variant="contained"
                onClick={() => setNestedInput(false)}
                color="primary"
              >
                cancel
              </Button>
            </Grid>
          ) : null}
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
