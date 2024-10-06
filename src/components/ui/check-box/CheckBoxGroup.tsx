import { List, ListItemButton } from "@mui/material";
import { ComponentProps, FC, useEffect, useState } from "react";

//components
import { CheckBox } from "./CheckBox";

export interface CheckboxGroupOption {
  id: number;
  name: string;
  label: string;
  checked: boolean;
}

export interface CheckboxGroupProps {
  options?: CheckboxGroupOption[];
  onChange?: (
    updatedOptions: CheckboxGroupOption[],
    checkedOptions: CheckboxGroupOption[]
  ) => void;
  fullWidth?: boolean;
  checkBoxProps?: ComponentProps<typeof CheckBox>;
  containerListProps?: ComponentProps<typeof List>;
  itemProps?: ComponentProps<typeof ListItemButton>;
}


export const CheckBoxGroup: FC<CheckboxGroupProps> = ({
  options,
  onChange,
  fullWidth,
  itemProps,
  checkBoxProps,
  containerListProps,
}) => {
  const [checkboxes, setCheckboxes] = useState(options || []);

  const handleCheckboxChange = (id: number, checked: boolean) => {
    const updatedCheckboxes = checkboxes.map((checkbox) =>
      checkbox.id === id ? { ...checkbox, checked } : checkbox
    );
    const checkedOptions = updatedCheckboxes.filter(
      (checkbox) => checkbox.checked
    );

    setCheckboxes(updatedCheckboxes);
    onChange?.(updatedCheckboxes, checkedOptions);
  };

  useEffect(() => {
    setCheckboxes(options || []);
  }, [options]);

  return (
    <List
      {...containerListProps}
      sx={[
        { width: fullWidth ? 1 : 280, py: 0 },
        ...(Array.isArray(containerListProps?.sx)
          ? containerListProps.sx
          : [containerListProps?.sx]),
      ]}
    >
      {checkboxes.map((checkbox) => (
        <ListItemButton
          key={checkbox.id}
          {...itemProps}
          sx={[
            { ":hover": { bgcolor: "primary.400" } },
            ...(Array.isArray(itemProps?.sx) ? itemProps.sx : [itemProps?.sx]),
          ]}
        >
          <CheckBox
            label={checkbox.label}
            checked={checkbox.checked}
            onChange={(_, checked) => {
              handleCheckboxChange(checkbox.id, checked);
            }}
            fullWidth
            {...checkBoxProps}
          />
        </ListItemButton>
      ))}
    </List>
  );
};

CheckBoxGroup.displayName = "CheckBoxGroup";
