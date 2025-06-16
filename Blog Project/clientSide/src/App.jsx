import {BrowserRouter as Routers, Routes, Route} from 'react-router-dom'
import Header from './layout/Header'
import BlogImg from './pages/BlogImg'


const App = () => {
  return (
    <>
      <Routers>
        <Header />
        <Routes>
          <Route path="/blogimg" element={<BlogImg />} />
        </Routes>
      </Routers>
    </>
  );
}

export default App