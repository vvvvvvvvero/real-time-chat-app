import {FormEvent, useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Form, Button, Alert} from 'react-bootstrap';

interface UsernamePageProps {
    setUsername: (username: string) => void;
}

function UsernamePage({setUsername}: UsernamePageProps) {
    const [inputUsername, setInputUsername] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const handleUsernameSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);
        if (inputUsername.trim()) {
            setUsername(inputUsername.trim());
            setIsVisible(false)
        } else {
            setIsVisible(true);
        }
    };

    useEffect(() => {
        if (isVisible) {
            const timeout = setTimeout(() => {
                setIsVisible(false);
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [isVisible]);

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <div className="w-100" style={{maxWidth: '320px'}}>
                <h1 className="text-center mb-5">Type your username</h1>
                {submitted && !inputUsername.trim() && isVisible && (
                    <Alert variant="danger">
                        Please enter a valid username.
                    </Alert>
                )}
                <Form onSubmit={handleUsernameSubmit} className="d-flex flex-column">
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            value={inputUsername}
                            onChange={(e) => setInputUsername(e.target.value)}
                            style={{borderRadius: '36px', height: '42px'}}
                        />
                    </Form.Group>
                    <Button
                        type="submit"
                        className="btn-primary"
                        style={{borderRadius: '36px', height: '42px'}}>
                        Enter
                    </Button>
                </Form>
            </div>
        </Container>
    );
}

export default UsernamePage;
