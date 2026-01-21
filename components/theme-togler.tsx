import { useEffect, useState } from 'react'
import { Switch } from './ui/switch'

const ThemeToggler = () => {
    const [theme, setTheme] = useState("light")
    const getTheme = () => {
        const localTheme = localStorage.getItem("theme")
        if (localTheme) {
            setTheme(localTheme)
        }
    }

    const setMode = () => {
        localStorage.setItem("theme", theme == "dark" ? "light" : "dark")
        window.location.reload()
    }

    useEffect(() => {
        getTheme()
    }, [])

    return (
        <Switch onClick={setMode} checked={theme == "dark"} id="airplane-mode" />
    )
}

export default ThemeToggler