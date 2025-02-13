import {AuthState} from "@/features/auth/types/auth.types.ts";
import {createSlice} from "@reduxjs/toolkit";

const initialState: AuthState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // 로그인 성공 시 크리덴셜 설정
        setCredentails: (state, action) => {
            const {user, accessToken, refreshToken} = action.payload;
            state.user = user;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.error = null;
        },
        // 로그아웃
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
        },
        // 로딩 상태 설정
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        // 에러 설정
        setError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
})

// 액션 생성자 함수 내보내기
export const { setCredentails, logout, setLoading, setError } = authSlice.actions;

// 선택자(Selector) 함수 내보내기
export const selectCurrentUser = (state: {auth: AuthState}) => state.auth.user;
export const selectIsAuthenticated = (state: {auth: AuthState}) => state.auth.isAuthenticated;
export const selectAccessToken = (state: {auth: AuthState}) => state.auth.accessToken;

// 리듀서 내보내기
export default authSlice.reducer;