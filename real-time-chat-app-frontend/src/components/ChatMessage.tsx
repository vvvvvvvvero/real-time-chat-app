import {Card, Col} from 'react-bootstrap';

interface ChatMessageProps {
    message: {
        sender: string;
        content: string;
        type: string;
        timeStamp: string;
        image?: string;
    };
    username: string;
}

function ChatMessage({message, username}: ChatMessageProps) {
    const isCurrentUser = message.sender === username;
    const isJoin = message.type === 'JOIN';
    const isLeave = message.type === 'LEAVE';
    const isImage = message.type === 'IMAGE';

    console.log(message.timeStamp, message.image);


    if (isJoin || isLeave) {
        return (
            <Col className="d-flex justify-content-center">
                <div className="text-secondary">
                    {message.content}
                </div>
            </Col>
        );
    }

    if (isImage) {
        return (
            <Col className={`d-flex ${isCurrentUser ? 'justify-content-end' : 'justify-content-start'}`}>
                <div className={`mb-2 mt-5 w-25 h-25${isCurrentUser ? 'text-end' : ''}`}>
                    <div className={`p-1 text-${isCurrentUser ? 'dark' : 'secondary'}`}>
                        {message.sender}
                    </div>
                    <Card
                        text={isCurrentUser ? 'white' : 'dark'}
                        className="flex-grow-0"
                    >
                        <Card.Img src={message.image} alt="Image"/>
                        <Card.Body className="p-2">
                            <Card.Text className="mb-1">
                                {message.content}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <div className={`p-1 text-secondary`}>
                        {message.timeStamp}
                    </div>
                </div>
            </Col>
        );
    }


    return (
        <Col className={`d-flex ${isCurrentUser ? 'justify-content-end' : 'justify-content-start'}`}>
            <div className={`mb-2 mt-5 ${isCurrentUser ? 'text-end' : ''}`} style={{maxWidth: '80%'}}>
                <div className={`p-1 text-${isCurrentUser ? 'dark' : 'secondary'}`}>
                    {message.sender}
                </div>
                <Card
                    bg={isCurrentUser ? 'primary' : 'light'}
                    text={isCurrentUser ? 'white' : 'dark'}
                    className="flex-grow-0"
                >
                    <Card.Body className="p-2">
                        <Card.Text className="mb-1">
                            {message.content}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <div className={`p-1 text-secondary`}>
                    {message.timeStamp}
                </div>
            </div>
        </Col>
    );
}

export default ChatMessage;
