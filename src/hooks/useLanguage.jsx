import { useTranslation } from "react-i18next"
import { useState, useEffect } from "react"

const useLanguage = () => {
    const { i18n, t } = useTranslation("global")
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language)

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
        setCurrentLanguage(lang)
    }

    useEffect(() => {
        setCurrentLanguage(i18n.language)
    }, [i18n.language])

    return { currentLanguage, changeLanguage, t }
}

export default useLanguage