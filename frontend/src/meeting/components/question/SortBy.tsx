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
        console.log(category);
        setCategory(e.target.value);
      }}
    >
      <option>{CATEGORIES.POPULAR}</option>
      <option>{CATEGORIES.RECENT}</option>
      <option>{CATEGORIES.OLDER}</option>
    </Form.Select>
  );
}
