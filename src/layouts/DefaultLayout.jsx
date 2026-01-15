import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PropTypes from 'prop-types'

const DefaultLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-950 transition-colors duration-500">
            <Navbar />
            <main className="flex-grow mt-20 sm:mt-24">
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
