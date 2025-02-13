// src/features/auth/api/authApi.ts

import {RootState} from "../index.ts";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: '/api/auth', // 실제 서버 주소로 변경
    // baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/auth`, // 환경 변수로 변경
    credentials: 'include', // 쿠키 포함
    // 헤더에 토큰을 포함시키는 함수
    prepareHeaders: (headers, {getState}) => {
        // 토큰을 가져온다.
        const token = (getState() as RootState).auth.accessToken;
        // 토큰이 있다면 헤더에 포함시킨다.
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    }
})

export const authApi = createApi({
    reducerPath: 'authApi', // 리듀서의 이름
    baseQuery, // 기본 쿼리 설정
    // 엔드포인트 설정
    endpoints: (builder) => ({
        // 로그인
        login: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            })
        }),
        // 회원가입
        register: builder.mutation({
            query: (credentials) => ({
                url: '/register',
                method: 'POST',
                body: credentials,
            })
        }),
        // 로그아웃
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST'
            })
        }),
        // 로그인 상태 확인
        me: builder.query({
            query: () => ({
                url: '/me',
                method: 'GET'
            })
        }),
        // 토큰 갱신
        refresh: builder.mutation({
            query: () => ({
                url: '/refresh',
                method: 'POST'
            })
        })
    })
})

export const {useLoginMutation, useRegisterMutation, useLogoutMutation, useMeQuery, useRefreshMutation} = authApi;