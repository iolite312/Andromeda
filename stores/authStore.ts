import { type SpotifySDK } from "~/types"

export const useAuthStore = defineStore('auth', () => {
    let accessToken = ref(localStorage.getItem('accessToken'))
    let refreshToken = ref(localStorage.getItem('refreshToken'))
    let expireDate = ref(localStorage.getItem('expireDate') as string)

    const GetNewToken = async (client_id: string) => {
        if (refreshToken.value == null) {
            throw new Error("No refresh token found");
        }
    
        const data = await $fetch<SpotifySDK.Spotify.Token>("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                "client_id": client_id,
                "grant_type": "refresh_token",
                "refresh_token": refreshToken.value
            })
        });
    
        if (data == null) {
            throw new Error("No token found");
        }
    
        accessToken.value = data.access_token
        refreshToken.value = data.refresh_token
        expireDate.value = new Date(Date.now() + 20 * 1000).toString()
        console.log(expireDate);
        
        localStorage.setItem('accessToken', accessToken.value)
        localStorage.setItem('refreshToken', refreshToken.value)
        localStorage.setItem('expireDate', expireDate.value)
    }

    return { accessToken, refreshToken, expireDate, GetNewToken }
})