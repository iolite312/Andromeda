export declare namespace SpotifyApi {
    interface Track {
        album: Album
        artists: Artist[]
        available_markets: string[]
        disc_number: number
        duration_ms: number
        explicit: boolean
        external_ids: {
            isrc: string
        }
        external_urls: {
            spotify: string
        }
        href: string
        id: string
        name: string
        popularity: number
        preview_url: string
        track_number: number
        type: "track"
        uri: string
        is_local: boolean
    }

    interface Album {
        album_type: string
        total_tracks: number
        available_markets: string[]
        external_urls: {
            spotify: string
        }
        href: string
        id: string
        images: Image[]
        name: string
        release_date: string
        release_date_precision: string
        type: "album"
        uri: string
        artists: Artist[]
        tracks: {
            href: string
            limit: number
            next: string
            offset: number
            previous: string
            total: number
            items: Track[]
        }
        copyrights: string[]
        external_ids: {
            upc: string
        }
        genres: string[]
        label: string
        popularity: number
    }
    
    interface Image {
        url: string
        height: number
        width: number
    }

    interface Artist {
        external_urls: {
            spotify: string
        }
        followers: {
            href: string
            total: number
        }
        genres: string[]
        href: string
        id: string
        images: Image[]
        name: string
        popularity: number
        type: "artist"
        uri: string
    }

    interface Playlist {
        collaborative: boolean
        description: string
        external_urls: {
            spotify: string
        }
        followers: {
            href: string
            total: number
        }
        href: string
        id: string
        images: Image[]
        name: string
        owner: {
            external_urls: {
                spotify: string
            }
            followers: {
                href: string
                total: number
            }
            href: string
            id: string
            type: "user"
            uri: string
            display_name: string
        }
        public: boolean
        snapshot_id: string
        tracks: {
            href: string
            limit: number
            next: string
            offset: number
            previous: string
            total: number
            items: PlaylistItem[]
        }
        type: "playlist"
        uri: string
    }

    interface PlaylistItem {
        added_at: string
        added_by: {
            external_urls: {
                spotify: string
            }
            followers: {
                href: string
                total: number
            }
            href: string
            id: string
            type: "user"
            uri: string
        }
        is_local: boolean
        track: Track
    }
    interface Queue {
        currently_playing: Track
        queue: Track[]
    }
    interface PlaylistRequest extends Playlist {
        href: string
        limit: number
        next: string
        offset: number
        previous: string
        total: number
        items: Playlist[]
    }
    interface AlbumRequest extends Album {
        href: string
        limit: number
        next: string
        offset: number
        previous: string
        total: number
        items: [{
            added_at: string
            album: Album
        }]
    }
    interface ArtistRequest extends Artist {
        artists: {
            href: string
            limit: number
            next: string
            cursors: {
                after: string
                before: string
            }
            total: number
            items: Artist[]
        }
    }
}
