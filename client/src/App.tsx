import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import enUS from 'antd/lib/locale/en_US';
import RenderRouter from './routes';
import './assets/styles/index.less';

function App() {
  return (
    <ConfigProvider locale={enUS} componentSize="middle">
      <BrowserRouter>
        <RenderRouter />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
