import Home from '../pages/Home'
import Inlove from '../pages/Inlove'
import CountDown from '../pages/CountDown'
import Settings from '../pages/Settings'
import Gallery from '../pages/Gallery'

const routes = [
    { path: "/", element: <Home />, layout: 'default' },
    { path: '/musics', element: <Home />, layout: 'default' },
    { path: '/inlove', element: <Inlove />, layout: 'noFooter' },
    { path: '/countdown', element: <CountDown />, layout: 'noFooter' },
    { path: '/settings', element: <Settings />, layout: 'noFooter' },
    { path: '/gallery', element: <Gallery />, layout: 'noFooter' },
    { path: '/gallery/view', element: <Gallery />, layout: 'noFooter' },
]

export default routes
