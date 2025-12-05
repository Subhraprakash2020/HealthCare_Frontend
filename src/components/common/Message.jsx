/* eslint-disable react/prop-types */
import React from "react";
import { Alert } from "react-bootstrap";

function Message({ variant, message, onClose }) {
  return (
    <Alert variant={variant} dismissible onClose={onClose} className="shadow-sm">
      {message}
    </Alert>
  );
}

export default Message;
