import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useAppSelector } from "../store/hooks";

export function GlobalModal({
  pShow,
  setPShow,
  title,
  message,
  onSubmit,
}: {
  pShow: boolean;
  setPShow: (value: boolean | ((prevState: boolean) => boolean)) => void;
  title: string;
  message: string;
  onSubmit: () => Promise<void>;
}) {
  //   const [show, setShow] = useState(pShow);
  //   const { onSubmit, title, message } = useAppSelector((s) => s.modalReducer);
  const handleClose = () => setPShow(false);
  return (
    <Modal show={pShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={async () => {
            await onSubmit();
            handleClose();
          }}
          type="button"
        >
          Submit
        </Button>
        <Button variant="secondary" type="button" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
