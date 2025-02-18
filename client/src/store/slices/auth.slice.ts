import {AuthState, User} from "@/features/auth/types/auth.types.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authApi} from "@/store/apis/authApi.ts";

// 로컬 스토리지에서 토큰과 사용자 정보 가져오기
const token = localStorage.getItem('accessToken');
const userString = localStorage.getItem('user');
const user = userString ? JSON.parse(userString) : null;

const initialState: AuthState = {
    user: user,
    accessToken: token,
    refreshToken: null,
    isAuthenticated: !!token,
    isLoading: false,
    error: null,
}

// 보안을 위한 도우미 함수들
const secureStorage = {
    // 메모리에 민감한 데이터 저장 (세션 한정)
    setSessionData: (key: string, value: string) => {
        try {
            sessionStorage.setItem(key, value);
        } catch (e) {
            console.error('세션 스토리지 접근 오류:', e);
        }
    },

    // 액세스 토큰 저장 (보안 강화)
    setAccessToken: (token: string) => {
        try {
            localStorage.setItem('accessToken', token);
        } catch (e) {
            console.error('로컬 스토리지 접근 오류:', e);
        }
    },

    // 사용자 정보 저장 (중요 정보 제외)
    setUserInfo: (user: User) => {
        try {
            // 민감한 정보 제외 (필요에 따라 조정)
            const safeUserInfo = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.department
            };
            localStorage.setItem('user', JSON.stringify(safeUserInfo));
        } catch (e) {
            console.error('사용자 정보 저장 오류:', e);
        }
    },

    // 인증 관련 데이터 모두 제거
    clearAuthData: () => {
        try {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            sessionStorage.removeItem('auth_state');
        } catch (e) {
            console.error('스토리지 데이터 삭제 오류:', e);
        }
    }
};

// 중복 로직을 함수로 추출
const updateAuthState = (
    state: AuthState,
    user: User | null,
    accessToken: string | null,
    refreshToken: string | null,
    authenticated: boolean = true
) => {
    // 상태 업데이트
    state.user = user;
    state.accessToken = accessToken;
    state.refreshToken = refreshToken;
    state.isAuthenticated = authenticated;
    state.isLoading = false;
    state.error = null;

    // 스토리지 업데이트
    if (authenticated && accessToken) {
        secureStorage.setAccessToken(accessToken);
    }

    if (authenticated && user) {
        secureStorage.setUserInfo(user);
    }

    if (!authenticated) {
        secureStorage.clearAuthData();
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // 로그인 성공 시 크리덴셜 설정
        setCredentials: (state, action: PayloadAction<AuthState>) => {
            const {user, accessToken, refreshToken} = action.payload;
            updateAuthState(state, user, accessToken, refreshToken, true);
        },
        // 로그아웃
        logout: (state) => {
            updateAuthState(state, null, null, null, false);
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
    },
    // authApi의 결과를 통합적으로 처리하는 extraReducers
    extraReducers: (builder) => {
        builder
            .addMatcher(
                // 로그인 성공 시
                authApi.endpoints.login.matchFulfilled,
                (state, action) => {
                    const {user, accessToken, refreshToken} = action.payload;
                    updateAuthState(state, user, accessToken, refreshToken);
                }
            )
            .addMatcher(
                // 로그인 실패 시
                authApi.endpoints.login.matchRejected,
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.error.message ?? '로그인에 실패했습니다.';
                }
            )
            .addMatcher(
                // 로그아웃 성공 시
                authApi.endpoints.logout.matchFulfilled,
                (state) => {
                    updateAuthState(state, null, null, null, false);
                }
            )
            .addMatcher(
                // 로그아웃 실패 시
                authApi.endpoints.logout.matchRejected,
                (state, action) => {
                    state.error = action.error.message ?? '로그아웃에 실패했습니다.';
                }
            )
            .addMatcher(
                // 사용자 정보 요청 성공 시
                authApi.endpoints.me.matchFulfilled,
                (state, action) => {
                    // 기존 토큰은 유지하고 사용자 정보만 업데이트
                    updateAuthState(
                        state,
                        action.payload,
                        state.accessToken,
                        state.refreshToken
                    );
                }
            )
            .addMatcher(
                // 사용자 정보 요청 실패 시
                authApi.endpoints.me.matchRejected,
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.error.message ?? '사용자 정보를 가져오는데 실패했습니다.';
                }
            )
            .addMatcher(
                // 토큰 갱신 성공 시
                authApi.endpoints.refresh.matchFulfilled,
                (state, action) => {
                    if (action.payload?.accessToken) {
                        // 토큰만 업데이트, 사용자 정보는 유지
                        const newRefreshToken = action.payload.refreshToken || state.refreshToken;
                        updateAuthState(
                            state,
                            state.user,
                            action.payload.accessToken,
                            newRefreshToken
                        );
                    }
                }
            );
    }
})

// 액션 생성자 함수 내보내기
export const { setCredentials, logout, setLoading, setError } = authSlice.actions;

// 선택자(Selector) 함수 내보내기
export const selectCurrentUser = (state: {auth: AuthState}) => state.auth.user;
export const selectIsAuthenticated = (state: {auth: AuthState}) => state.auth.isAuthenticated;
export const selectAccessToken = (state: {auth: AuthState}) => state.auth.accessToken;

// 리듀서 내보내기
export default authSlice.reducer;