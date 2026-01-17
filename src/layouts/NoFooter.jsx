import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PropTypes from 'prop-types'

/**
 * NoFooter Layout - Page structure for focused screens without desktop footer
 */
const NoFooter = ({ children }) => {
    return (
        <div className="unit-layout-no-footer">
            <Navbar />
            <main>{children}</main>
            <Footer mobileOnly={true} />
        </div>
    )
}

export default NoFooter

NoFooter.propTypes = {
    children: PropTypes.node.isRequired
}
