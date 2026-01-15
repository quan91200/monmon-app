import Layout from './layouts/Layout'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import routes from './routes/routes'
import SnowfallEffect from './components/SnowfallEffect'
import BackToTop from './components/BackToTop'
import MusicPlayer from './components/MusicPlayer'

const App = () => {
  return (
    <Router future={{
      v7_relativeSplatPath: true, v7_startTransition: true,
    }}>
      <SnowfallEffect />
      <BackToTop />
      <MusicPlayer />
      <Routes>
        {routes.map(({ path, element, layout }, index) => {
          return (
            <Route
              key={index}
              path={path}
              element={layout ? <Layout element={element} layout={layout} /> : element}
            />
          )
        })}
      </Routes>
    </Router>
  )
}

export default App
