import { useTranslation } from "react-i18next"
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const useLanguage = () => {
    const { i18n, t } = useTranslation("global")
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language)
    const location = useLocation()
    const navigate = useNavigate()

    // Helper: 'vn' -> 'vi', 'en' -> 'en'
    const getHashFromLang = (lang) => lang === 'vn' ? 'vi' : lang

    // Helper: 'vi' -> 'vn', 'en' -> 'en'
    const getLangFromHash = (hash) => {
        const clean = hash.replace('#', '')
        return clean === 'vi' ? 'vn' : clean
    }

    const updateUrlHash = (lang) => {
        const hashLang = getHashFromLang(lang)
        const currentHash = location.hash.replace('#', '')

        if (currentHash !== hashLang) {
            // Use replace to update hash without pushing new history entry for just hash sync
            navigate(`${location.pathname}${location.search}#${hashLang}`, { replace: true })
        }
    }

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
        setCurrentLanguage(lang)
        updateUrlHash(lang)
    }

    useEffect(() => {
        const langFromHash = getLangFromHash(location.hash)
        const validLangs = ['vn', 'en', 'cn']

        if (validLangs.includes(langFromHash)) {
            // URL has valid language, sync state if needed
            if (langFromHash !== i18n.language) {
                i18n.changeLanguage(langFromHash)
                setCurrentLanguage(langFromHash)
            }
        } else {
            // URL has no language (or invalid), set it to current language
            updateUrlHash(i18n.language)
        }
    }, [location.pathname, location.hash, i18n.language])

    return { currentLanguage, changeLanguage, t }
}

export default useLanguage
