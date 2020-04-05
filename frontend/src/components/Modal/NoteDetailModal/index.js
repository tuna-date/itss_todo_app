import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from 'reactstrap';

const NoteDetailModal = (props) => {
  return (
      <Card>
        <CardBody>
          <CardTitle>{props.title}</CardTitle>
          <CardText>{props.description}</CardText>

          <Button onClick={props.closePopup}>キャンセル</Button> 
        </CardBody>
      </Card>
  )
}

export default NoteDetailModal;