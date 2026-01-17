import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PropTypes from 'prop-types'

/**
 * DefaultLayout - Standard application structure with Navbar and Footer
 */
const DefaultLayout = ({ children }) => {
    return (
        <div className="unit-layout-default">
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default DefaultLayout

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired
}
