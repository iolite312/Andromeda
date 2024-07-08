<template>
    <div>

    </div>
</template>

<script setup lang="ts">
// This logic will need to be moved eventually to the correct component/composable
const config = useRuntimeConfig();
function clearUrl() {
    window.location.assign("http://localhost:3000");
}

onMounted(async () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if ((localStorage.getItem("accessToken") == null || localStorage.getItem("accessToken") == undefined) && code == null) {
        await redirectToAuthCodeFlow(config.public.clientId);
    } else {
        if (localStorage.getItem("accessToken") == null || localStorage.getItem("accessToken") == undefined) {
            const { access_token, refresh_token } = await getAccessToken(config.public.clientId, code!);
            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("refreshToken", refresh_token);
        }
    }
});

async function redirectToAuthCodeFlow(clientId: string) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", `${config.public.url}`); // Adjust to your callback URL
    params.append("scope", "user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing streaming app-remote-control playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-modify user-follow-read user-read-playback-position user-top-read user-read-recently-played user-library-modify user-library-read ugc-image-upload");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

async function getAccessToken(clientId: string, code: string) {
    const verifier = localStorage.getItem("verifier");
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", `${config.public.url}`); // Adjust to your callback URL
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const data = await result.json();
    return data;
}

function generateCodeVerifier(length: number) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}
</script>

<style></style>