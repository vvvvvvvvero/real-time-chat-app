import {Dispatch, SetStateAction, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatPage from './components/ChatPage.tsx';
import UsernamePage from './components/UsernamePage.tsx';

type SetUsernameType = Dispatch<SetStateAction<string | null>>;

function App() {
    const [username, setUsername] = useState(null);

    return (
        <div className="vh-100">
            {username ? (
                <ChatPage username={username}/>
            ) : (
                <UsernamePage setUsername={setUsername as SetUsernameType}/>
            )}
        </div>
    );

}

export default App;