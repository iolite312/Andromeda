import { type Spotify } from "~/types"

export const useAuthStore = defineStore('auth', () => {
    let accessToken = localStorage.getItem('accessToken')
    let refreshToken = localStorage.getItem('refreshToken')
    let expireDate = localStorage.getItem('expireDate') as string

    const GetNewToken = async (client_id: string) => {
        if (refreshToken == null) {
            throw new Error("No refresh token found");
        }
    
        const { data } = await useFetch<Spotify.Token>("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                "client_id": client_id,
                "grant_type": "refresh_token",
                "refresh_token": refreshToken
            })
        });
    
        if (data.value == null) {
            throw new Error("No token found");
        }
    
        accessToken = data.value.access_token
        refreshToken = data.value.refresh_token
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        localStorage.setItem('expireDate', new Date(Date.now() + data.value.expires_in * 1000).toString())
    }

    return { accessToken, refreshToken, expireDate, GetNewToken }
})