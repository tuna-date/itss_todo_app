import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardHeader,
  CardFooter,
} from 'reactstrap';

const NoteDetailModal = (props) => {
  return (
    <Card >
      <CardHeader>{props.title}</CardHeader>
      <CardBody>
        <CardText>{props.description}</CardText>
      </CardBody>
        <Button onClick={props.closePopup}>キャンセル</Button>
    </Card>
  )
}

export default NoteDetailModal;