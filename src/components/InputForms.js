import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";
import {useForm} from "react-hook-form";
import FormTextField from "./FormTextField";
import Grid from "@material-ui/core/Grid";
import FormSelectField from "./FormSelectField";
import FormDialogCategoryItems from "./FormDialogCategoryItems";
import {toast} from "react-toastify";
import FormDateField from "./FormDateField";

export default function FormDialog({
  open,
  handleClose,
  defaultValues,
  onSubmit,
  formTitle,
  formFields,
  categoryItems = false,
  categoryItemsTitle,
  categoryItemsDataKey,
  // loading,
  // setloading,
  ...props
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [categoryItemsContent, setCategoryItemsContent] = useState([]);

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
    reset,
  } = useForm();

  useEffect(() => {
    reset({});
  }, []);

  useEffect(() => {
    reset(defaultValues);
    categoryItems &&
      defaultValues &&
      defaultValues[categoryItemsDataKey] &&
      setCategoryItemsContent(defaultValues[categoryItemsDataKey]);
  }, [defaultValues]);

  const handleCancel = () => {
    setCategoryItemsContent([]);
    reset({});
    handleClose();
  };

  const handleOnSubmit = () => {
    // if(loading) alert("loading")
    // else{
    // setloading && setloading(true);
    if (categoryItems) {
      if (categoryItemsContent.length)
        onSubmit(getValues(), categoryItemsContent);
      else toast.error("Please add record!!!");
    } else onSubmit(getValues());
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleCancel}
      fullWidth
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{formTitle}</DialogTitle>
      <DialogContent>
        <Grid container>
          {categoryItems && defaultValues
            ? null
            : formFields.map((item) => (
                <Grid item xs={12} sm={6} key={item.controllerName}>
                  {item.fieldType === "text" ? (
                    <FormTextField
                      control={control}
                      errors={errors}
                      {...item}
                    />
                  ) : item.fieldType === "select" ? (
                    <FormSelectField
                      control={control}
                      errors={errors}
                      {...item}
                    />
                  ) : item.fieldType === "date" ? (
                    <FormDateField
                      control={control}
                      errors={errors}
                      {...item}
                    />
                  ) : null}
                </Grid>
              ))}
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
