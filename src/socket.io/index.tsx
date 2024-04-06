// https://dev.to/novu/building-a-chat-app-with-socketio-and-react-2edj
// https://socket.io/how-to/use-with-react

import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:8888';

export const socket = io(URL);