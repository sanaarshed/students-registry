import {TextField} from "@mui/material";
import React from "react";
import {Controller} from "react-hook-form";

export default function FormTextField({
  title,
  control,
  controllerName,
  errors,
  type = "text",
  required = true,
  styles,
}) {
  const isError = errors[controllerName];

  const defaultStyles = {
    margin: "20px 0",
    width: "80%",
  };

  return (
    <>
      <Controller
        control={control}
        rules={{
          required,
        }}
        name={controllerName}
        render={({field: {onChange, onBlur, value}}) => {
          return (
            <TextField
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              error={isError}
              label={title}
              type={type}
              helperText={isError ? `${title} is required` : ""}
              variant="outlined"
              style={{...defaultStyles, ...styles}}
            />
          );
        }}
      />
    </>
  );
}
