import { Stack } from "@mui/material";
import { ComponentProps, forwardRef } from "react";

//components & utils
import { PageLink } from "./components/PageLink";
import { getPaginationItems } from "./utils/getPaginationItems";
import { ChevronLeftIcon } from "@/assets/icons/ChevronLeftIcon";
import { ChevronRightIcon } from "@/assets/icons/ChevronRightIcon";

export type PaginationProps = {
  containerProps?: ComponentProps<typeof Stack>;
  currentPage: number;
  lastPage: number;
  maxLength?: number;
  onChange: (page: number) => void;
};

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  ({ containerProps, currentPage, lastPage, maxLength = 5, onChange }, ref) => {
    const pageNums = getPaginationItems(currentPage, lastPage, maxLength);

    return (
      <Stack
        ref={ref}
        component="nav"
        aria-label="pagination"
        sx={{ flexWrap: "wrap" }}
        spacing={0.2}
        direction="row"
        {...containerProps}
      >
        <PageLink
          disabled={currentPage === 1}
          onClick={() => onChange(currentPage - 1)}
        >
          <ChevronRightIcon />
        </PageLink>
        {pageNums.map((pageNum, index) => {
          return (
            <PageLink
              key={index}
              active={currentPage === pageNum}
              disabled={isNaN(pageNum)}
              onClick={() => onChange(pageNum)}
            >
              {!isNaN(pageNum) ? pageNum : "..."}
            </PageLink>
          );
        })}
        <PageLink
          disabled={currentPage === lastPage}
          onClick={() => onChange(currentPage + 1)}
        >
          <ChevronLeftIcon />
        </PageLink>
      </Stack>
    );
  }
);
