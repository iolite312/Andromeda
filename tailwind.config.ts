import type { Config } from 'tailwindcss/types'
import colors from 'tailwindcss/colors'

export default <Partial<Config>>{
    theme: {
        extend: {
            colors: {
                spotify: {
                    primary: "#1ED760",
                    fg: {
                        primary: "#E0E0E0",
                        secondary: "#898989",
                        tertiary: "#323232",
                        light: {
                            primary: "#1A1A1A",
                            secondary: "#6E6E6E"
                        }
                    },
                    bg: {
                        main: "#060606",
                        primary: "#111111",
                        secondary: "#202020",
                        light: {
                            primary: "#F0F0F0",
                        }
                    }
                }
            }
        }
    }
}