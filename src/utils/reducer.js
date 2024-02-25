import { reducerCases } from "./Constants";

export const initialState = {
    token: null,
    playlists: [],
    userInfo: null,
    recentlyPlayed: [],
    currentlyPlaying: '',
    playerState: false,
    ViewPlaylist: null,
    category: null,
};


const reducer = (state, action) => {
    switch (action.type) {
        case reducerCases.SET_TOKEN: {
            return {
                ...state,
                token: action.token,
            };
        }
        case reducerCases.SET_PLAYLISTS: {
            return {
                ...state,
                playlists: action.playlists,
            }
        }
        case reducerCases.SET_USER: {
            return {
                ...state,
                userInfo: action.userInfo,
            }
        }
        case reducerCases.SET_RECENTLY_PLAYED: {
            return {
                ...state,
                recentlyPlayed: action.recentlyPlayed,
            }
        }
        case reducerCases.SET_PLAYING: {
            return {
                ...state,
                currentlyPlaying: action.currentlyPlaying,
            }
        }
        case reducerCases.SET_PLAYER_STATE:
            return {
                ...state,
                playerState: action.playerState,
            };
        case reducerCases.SET_VIEW_PLAYLISTS:
            return {
                ...state,
                ViewPlaylist: action.ViewPlaylist,
            };
            case reducerCases.SET_CAT:
                return {
                    ...state,
                    category: action.category,
                };
        default: return state
    }
}

export default reducer