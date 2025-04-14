"use client"

import { useThemeConfig } from "@/components/active-theme"
import { useTheme } from "next-themes"

export function useThemeWithConfig() {
    const { activeTheme, setActiveTheme, isLoading: isConfigLoading } = useThemeConfig()
    const { theme, setTheme, resolvedTheme, systemTheme } = useTheme()

    const isLoading = isConfigLoading

    // Kết hợp theme từ next-themes và activeTheme
    const currentTheme = activeTheme || theme || "default"
    const isDark = resolvedTheme === "dark" || systemTheme === "dark"

    // Hàm để thay đổi theme
    const changeTheme = (newTheme: string) => {
        setActiveTheme(newTheme)

        // Nếu theme mới kết thúc bằng -scaled, thêm class theme-scaled
        if (newTheme.endsWith("-scaled")) {
            document.body.classList.add("theme-scaled")
        } else {
            document.body.classList.remove("theme-scaled")
        }

        // Nếu theme mới là dark hoặc light, cập nhật next-themes
        if (newTheme === "dark" || newTheme === "light") {
            setTheme(newTheme)
        }
    }

    return {
        activeTheme: currentTheme,
        setActiveTheme: changeTheme,
        isDark,
        isLoading,
        theme,
        resolvedTheme,
        systemTheme
    }
} 