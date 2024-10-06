import {
  FC,
  useRef,
  useState,
  useEffect,
  useTransition,
  ChangeEventHandler,
  MouseEventHandler,
} from "react";
import {
  Box,
  Theme,
  Stack,
  Popover,
  SxProps,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";

//components & utils
import { Btn } from "@/components/ui/btn";
import {
  CheckBoxGroup,
  CheckboxGroupOption,
} from "@/components/ui/check-box/CheckBoxGroup";
import { useMenu } from "@/hooks/common/useMenu";
import { SearchIcon } from "@/assets/icons/SearchIcon";
import { ChipBox } from "@/components/ui/chip-box/ChipBox";
import { PassBoldIcon } from "@/assets/icons/PassBoldIcon";
import { ArrowDownBoldIcon } from "@/assets/icons/ArrowDownBoldIcon";
import { RootInputBox } from "@/components/ui/input-box/RootInputBox";
import { persianToEnglishDigits } from "@/utils/number/persianToEnglishNumber";

type ChangeEvent = (
  updatedOptions: CheckboxGroupOption[],
  checkedOptions: CheckboxGroupOption[]
) => void;

export type MultiSelectProps = {
  options?: CheckboxGroupOption[];
  onChange?: (
    updatedOptions: CheckboxGroupOption[],
    checkedOptions: CheckboxGroupOption[]
  ) => void;
  inputSx?: SxProps<Theme>;
  disabled?: boolean;
  fullWidth?: boolean;
  removeSearchBox?: boolean;
  label?: string;
  helperText?: React.ReactNode;
  placeholder?: string;
  error?: boolean;
};

type FormValues = { options: CheckboxGroupOption[] };

const inputStyle: ({
  isOpen,
  error,
}: {
  isOpen: boolean;
  error?: boolean;
}) => SxProps<Theme> = ({ isOpen, error }) => ({
  "& .MuiOutlinedInput-root": {
    ".MuiIconButton-root.prime": {
      svg: {
        mt: 0.5,
      },
      path: {
        fill: (t) => t.palette.grey[200],
      },
    },

    ...(isOpen && {
      borderRadius: "8px 8px 0 0",
      "& .MuiOutlinedInput-notchedOutline": {
        border: 2,
        borderColor: error ? "error.main" : "primary.main",
      },
      ".MuiIconButton-root.prime": {
        svg: {
          transition: "0.2s",
          mt: 0,
          transform: "rotate(180deg)",
        },
        path: {
          fill: (t) => (error ? t.palette.error.main : t.palette.primary.main),
        },
      },
    }),
  },
});

const getCheckedOptions = (options: CheckboxGroupOption[]) =>
  options.filter((c) => c.checked);

const mergeOptions = (
  checkBoxOptions: CheckboxGroupOption[],
  controllerOptions: CheckboxGroupOption[]
): CheckboxGroupOption[] => {
  const optionsMap = new Map<number, CheckboxGroupOption>();

  checkBoxOptions.forEach((option) => optionsMap.set(option.id, option));
  controllerOptions.forEach((option) => optionsMap.set(option.id, option));

  return Array.from(optionsMap.values());
};

export const MultiSelect: FC<MultiSelectProps> = ({
  options = [],
  onChange,
  inputSx = [],
  fullWidth,
  disabled,
  label,
  error,
  helperText,
  placeholder,
  removeSearchBox = false,
}) => {
  const [_, startTransition] = useTransition();

  const [baseOptions, setBaseOptions] =
    useState<CheckboxGroupOption[]>(options);

  const [checkedOptions, setCheckedOptions] = useState<CheckboxGroupOption[]>(
    getCheckedOptions(options)
  );
  const boxRef = useRef<HTMLLabelElement | null>(null);
  const initData = useRef(getCheckedOptions(options));

  const { isOpen, anchorEl, onClose, onOpen } = useMenu();

  const { handleSubmit, setValue, getValues, reset } = useForm<FormValues>({
    defaultValues: { options },
  });

  const hasOption = checkedOptions.length > 0;

  const handleSearchInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    startTransition(() => {
      setBaseOptions(() => {
        const searchValue = persianToEnglishDigits(
          e.target.value.toLowerCase().trim()
        );

        const mergedOptions = mergeOptions(options, getValues("options"));

        const filteredOptions = mergedOptions.filter((checkbox) =>
          persianToEnglishDigits(checkbox.label)
            .toLowerCase()
            .includes(searchValue)
        );
        return filteredOptions;
      });
    });
  };

  const handleCheckBoxGroupChange: ChangeEvent = (updatedOptions) => {
    const mergedOptions = mergeOptions(options, updatedOptions);

    setValue("options", mergedOptions, { shouldDirty: true });

    const checkedOptions = mergedOptions.filter((checkbox) => checkbox.checked);

    setCheckedOptions(checkedOptions);
    setBaseOptions(updatedOptions);
  };

  const handleClose = ({ hasSaved }: { hasSaved?: boolean }) => {
    reset({ options });
    setCheckedOptions((p) => {
      return hasSaved ? p : initData.current;
    });
    setBaseOptions((p) => {
      return hasSaved ? p : options;
    });
    onClose();
  };

  const handleResetClick = () => {
    handleClose({ hasSaved: false });
  };

  const handleRemoveOptions: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const unCheckedOptions = options.map((o) => ({ ...o, checked: false }));

    setCheckedOptions([]);
    setValue("options", unCheckedOptions, { shouldDirty: true });
    setBaseOptions(unCheckedOptions);

    onChange?.(unCheckedOptions, []);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const checkedOptions = data.options.filter((checkbox) => checkbox.checked);
    onChange?.(data.options, checkedOptions);
    handleClose({ hasSaved: true });
  };

  useEffect(() => {
    initData.current = getCheckedOptions(options);
    setBaseOptions(options);
  }, [options]);

  return (
    <>
      <RootInputBox
        containerRef={(node) => {
          if (node) {
            boxRef.current = node;
          }
        }}
        helperText={isOpen ? undefined : helperText}
        error={error}
        fullWidth={fullWidth}
        label={label}
        disabled={disabled}
        placeholder={hasOption ? undefined : placeholder}
        value=""
        onChange={() => {}}
        autoComplete="off"
        onClick={disabled ? undefined : onOpen}
        sx={[
          { ...inputStyle({ isOpen, error }) },
          ...(Array.isArray(inputSx) ? inputSx : [inputSx]),
        ]}
        slotProps={{
          input: {
            tabIndex: 0,
            sx: {
              borderRadius: 2,
              px: 1,
              height: 48,
            },
            endAdornment: (
              <>
                {hasOption ? (
                  <ChipBox
                    colorVariant={isOpen ? "primary" : "grey"}
                    sx={{ position: "absolute", left: "1rem" }}
                  >
                    {checkedOptions.length} مورد
                  </ChipBox>
                ) : null}
                {hasOption ? (
                  <IconButton disableRipple onClick={handleRemoveOptions}>
                    <PassBoldIcon />
                  </IconButton>
                ) : (
                  <IconButton disableRipple className="prime">
                    <ArrowDownBoldIcon />
                  </IconButton>
                )}
              </>
            ),
          },
        }}
      />
      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={() => handleClose({ hasSaved: false })}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            sx: {
              border: 1,
              borderRadius: "0 0 8px 8px",
              boxShadow: "0 -2px 4px 0 #7070700F, 0 4px 8px 0 #7070701F",
              width: boxRef.current?.getBoundingClientRect().width,
              borderColor: "grey.A200",
            },
          },
        }}
      >
        <Stack
          sx={{ width: "inherit" }}
          component="form"
          noValidate
          onSubmit={(e) => {
            e.stopPropagation();
            return handleSubmit(onSubmit)(e);
          }}
        >
          {removeSearchBox ? null : (
            <Box sx={{ p: "16px 11.5px" }}>
              <RootInputBox
                placeholder="جستجوی عنوان"
                variant="filled"
                autoComplete="off"
                slotProps={{
                  input: {
                    disableUnderline: true,
                    sx: {
                      borderRadius: "10px",
                      px: 1,
                      height: 48,
                      input: {
                        paddingTop: "5px",
                        fontSize: 12,
                      },
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                onChange={handleSearchInput}
              />
            </Box>
          )}
          <CheckBoxGroup
            options={baseOptions}
            onChange={handleCheckBoxGroupChange}
          />
          <Stack sx={{ padding: "16px 13px" }} direction="row" spacing={1}>
            <Btn
              sx={{ borderRadius: "10px", width: 1 }}
              type="button"
              variant="outlined"
              onClick={handleResetClick}
            >
              انصراف
            </Btn>
            <Btn sx={{ borderRadius: "10px", width: 1 }} type="submit">
              افزودن
            </Btn>
          </Stack>
        </Stack>
      </Popover>
    </>
  );
};

MultiSelect.displayName = "MultiSelect";
