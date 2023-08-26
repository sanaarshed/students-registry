import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";

import {Controller} from "react-hook-form";

export default function FormSelectField({
  title,
  control,
  controllerName,
  errors,
  options,
}) {
  const isError = errors[controllerName];
  const defaultStyles = {margin: "20px 0", width: "80%"};

  return (
    <>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name={controllerName}
        render={({field: {onChange, onBlur, value}}) => {
          return (
            <FormControl
              variant="outlined"
              error={isError}
              style={{...defaultStyles}}
            >
              <InputLabel>{title}</InputLabel>
              <Select
                value={value || ""}
                onChange={onChange}
                onBlur={onBlur}
                label={title}
              >
                {options?.map(({key, value}) => (
                  <MenuItem value={key} key={key}>
                    <em>{value}</em>
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {isError ? `${title} is required` : ""}
              </FormHelperText>
            </FormControl>
          );
        }}
      />
    </>
  );
}
