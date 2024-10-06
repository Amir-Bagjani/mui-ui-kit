import {
  useMemo,
  useState,
  MouseEvent,
  useCallback,
  KeyboardEvent,
} from "react";

export const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return useMemo(
    () => ({
      anchorEl,
      isOpen: open,
      onOpen: handleClick,
      onClose: handleClose,
    }),
    [anchorEl, handleClick, handleClose, open]
  );
};
