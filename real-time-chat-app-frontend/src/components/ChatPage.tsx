import {useState, useEffect, useRef, ChangeEvent} from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import ChatMessage from "./ChatMessage";
import { Container, Row, Form, Button, InputGroup, FormControl } from 'react-bootstrap';

interface ChatPageProps {
    username: string;
}

interface Message {
    sender: string;
    content: string;
    type: string;
    image?: string;
}
function ChatPage({ username }: ChatPageProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [client, setClient] = useState<Client | null>(null);
    const messageInputRef = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);


    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setSelectedImage(file);
        console.log(file ? "Selected file " + file.name : "No file selected");
    }


    useEffect(() => {
        const newClient = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8080/chat'),
            onConnect: () => {
                const joinMessage = {
                    sender: username,
                    type: 'JOIN',
                    content: `${username} has joined the chat!`
                };
                console.log("Join message " + joinMessage.content);
                newClient.publish({ destination: '/app/chat.addUser', body: JSON.stringify(joinMessage) });
                newClient.subscribe('/topic/public', message => {
                    const newMessage = JSON.parse(message.body);
                    setMessages(prevMessages => [...prevMessages, newMessage]);
                });
            },
        });

        newClient.activate();
        setClient(newClient);

        return () => {
            newClient.deactivate();
        };
    }, [username]);

    const sendTextMessage = (content: string) => {
        if (!client || !content) return;
        const chatMessage = {
            sender: username,
            content: content,
            type: 'CHAT'
        };
        client.publish({ destination: '/app/chat.sendMessage', body: JSON.stringify(chatMessage) });
    };

    const sendImageMessage = (imageFile: File) => {
        if (!client || !imageFile) return;
        const reader = new FileReader();
        reader.onload = () => {
            const base64Image = reader.result;
            const chatMessage = {
                sender: username,
                type: 'IMAGE',
                image: base64Image
            };
            client.publish({ destination: '/app/chat.sendMessage', body: JSON.stringify(chatMessage) });
            setSelectedImage(null);
        };
        reader.readAsDataURL(imageFile);
    };

    /*const handleSendTextMessage = (event:  React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const content = messageInputRef.current?.value || '';
        sendTextMessage(content);
        if (messageInputRef.current) {
            messageInputRef.current.value = '';
        }
    };
    const handleSendImageMessage = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (selectedImage) {
            sendImageMessage(selectedImage);
            if (imageInputRef.current) {
                imageInputRef.current.value = '';
            }
        }
    };*/

    const handleSendMessage = (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            if (selectedImage) {
                sendImageMessage(selectedImage);
                if (imageInputRef.current) {
                    imageInputRef.current.value = '';
                }
            } else if (messageInputRef.current) {
                const content = messageInputRef.current.value || '';
                sendTextMessage(content);
                if (messageInputRef.current) {
                    messageInputRef.current.value = '';
                }
            }
        };


    return (
        <Container fluid="md" className="d-flex flex-column vh-100">
            <div className="flex-grow-1 overflow-auto">
                {messages.map((message, index) => (
                    <ChatMessage key={index} message={message} username={username}/>
                ))}
            </div>
            <Row>
                <Form className="w-100 mb-3 mt-3">
                    <InputGroup>
                        <FormControl
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            ref={imageInputRef}
                        />
                        <FormControl
                            placeholder="Type a message..."
                            ref={messageInputRef}
                        />
                        <Button variant="primary" onClick={handleSendMessage}>Send</Button>
                    </InputGroup>
                </Form>
            </Row>
        </Container>
    );
}

export default ChatPage;
