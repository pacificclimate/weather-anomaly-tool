import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import '@/index.css';
import App from '@/components/main/App';
import registerServiceWorker from '@/registerServiceWorker';

let container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>);
registerServiceWorker();
