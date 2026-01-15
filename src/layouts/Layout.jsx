import DefaultLayout from './DefaultLayout'
import PropTypes from 'prop-types'
import NoFooter from './NoFooter'

const Layout = ({ element, layout }) => {
    if (layout === 'default') {
        return (<DefaultLayout>{element}</DefaultLayout>)
    }
    if (layout === 'noFooter') {
        return (<NoFooter>{element}</NoFooter>)
    }
    return element
}

export default Layout

Layout.propTypes = {
    layout: PropTypes.oneOf(['default', 'noFooter']),
    element: PropTypes.node,
}