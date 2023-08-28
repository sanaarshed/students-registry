import React from "react";

// import {MuiPickersUtilsProvider} from "@material-ui/pickers";
// import DateFnsUtils from "@date-io/date-fns";

import {Controller} from "react-hook-form";
import {FormControl, FormHelperText} from "@mui/material";
// import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers-pro";
// import {AdapterDayjs} from "@mui/x-date-pickers-pro/AdapterDayjs";
// import moment from "moment";

export default function FormDateField({
  title,
  control,
  controllerName,
  errors,
  required = true,
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
        rules={{required}}
        name={controllerName}
        render={({field}) => {
          // console.log(moment(field.value).format("YYYY-MM-DD"));
          const {onChange, value} = field;
          return (
            <FormControl
              variant="outlined"
              error={isError}
              style={{...defaultStyles}}
            >
              <input
                type="date"
                onChange={onChange}
                value={value}
                style={{
                  width: "100%",
                  height: "3.2rem",
                  fontSize: "1.25rem",
                }}
              />

              {/* onChange={(v) => field.onChange(v?.$d)} */}
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
