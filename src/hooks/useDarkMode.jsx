import { useState, useEffect } from "react"

const useDarkMode = (initialState = false) => {
    const [darkMode, setDarkMode] = useState(initialState)

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark")
        } else {
            document.body.classList.remove("dark")
        }
    }, [darkMode])

    const enableDarkMode = () => setDarkMode(true)
    const disableDarkMode = () => setDarkMode(false)

    return { darkMode, enableDarkMode, disableDarkMode }
}

export default useDarkMode