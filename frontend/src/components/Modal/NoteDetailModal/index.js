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
    console.log(props);
    return (
        <div>
            <Card>
                <CardBody style={{textAlign:'center'}}>
                    <CardTitle><b>{props.title}</b></CardTitle>
                    <CardText>{props.description}</CardText>
                    <Button onClick={props.closePopup} color="info">閉じる</Button>
                </CardBody>
            </Card>
        </div>
    )
};

export default NoteDetailModal;
