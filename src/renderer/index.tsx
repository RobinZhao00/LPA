import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import App from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
    <App />
  </ConfigProvider>,
);

// calling IPC exposed from preload script
window?.electron?.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window?.electron?.ipcRenderer.sendMessage('ipc-example', ['ping']);
