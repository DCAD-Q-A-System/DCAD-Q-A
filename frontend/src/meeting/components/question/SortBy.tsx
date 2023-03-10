import React, { SetStateAction } from "react";
import { Form } from "react-bootstrap";
import { CATEGORIES } from "../../../utils/enums";
import { IQuestion } from "../../../utils/interfaces";

export function SortBy({
  category,
  setCategory,
}: {
  category: CATEGORIES;
  setCategory: React.Dispatch<SetStateAction<CATEGORIES>>;
}) {
  return (
    <Form.Select
      value={category}
      onChange={(e) => {
        let category: CATEGORIES;
        switch (e.target.value) {
          case CATEGORIES.POPULAR:
            category = CATEGORIES.POPULAR;
            break;
          case CATEGORIES.RECENT:
            category = CATEGORIES.RECENT;
            break;
          case CATEGORIES.OLDER:
            category = CATEGORIES.OLDER;
            break;
          default:
            category = CATEGORIES.POPULAR;
        }
        setCategory(category);
      }}
    >
      <option>{CATEGORIES.POPULAR}</option>
      <option>{CATEGORIES.RECENT}</option>
      <option>{CATEGORIES.OLDER}</option>
    </Form.Select>
  );
}
