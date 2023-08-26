import React from "react";

import {Controller} from "react-hook-form";
import {FormControl, FormHelperText} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers-pro";
import {AdapterDayjs} from "@mui/x-date-pickers-pro/AdapterDayjs";

export default function FormDateField({
  title,
  control,
  controllerName,
  errors,
  required = true,
  defaultValue = undefined,
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
        render={({field: {onChange, value = defaultValue}}) => {
          return (
            <FormControl
              variant="outlined"
              error={isError}
              style={{...defaultStyles}}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Controlled picker"
                  value={value}
                  onChange={onChange}
                  format={"dd MMM yyyy"}
                  views={["year", "month", "day"]}
                />
              </LocalizationProvider>

              <FormHelperText>
                {isError ? `${title} is required.` : ""}
              </FormHelperText>
            </FormControl>
          );
        }}
      />
    </>
  );
}
