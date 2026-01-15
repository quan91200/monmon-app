import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PropTypes from 'prop-types'

const NoFooter = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className='flex-grow mt-24'>{children}</main>
            <Footer mobileOnly={true} />
        </div>
    )
}

export default NoFooter

NoFooter.propTypes = {
    children: PropTypes.node.isRequired
}
