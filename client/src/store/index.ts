import {configureStore} from "@reduxjs/toolkit";
import {deviceSlice} from "@/store/slices/device.slice.ts";
import {counterSlice} from "@/store/slices/counter.slice.ts";
import {authApi} from "@/store/apis/authApi.ts";
import authReducer from "@/store/slices/auth.slice.ts";
import {setupListeners} from "@reduxjs/toolkit/query";
// import equipmentReducer from './slices/equipmentSlice';

export const store = configureStore({
    reducer: {
        // 여기에 리듀서를 추가합니다.
        auth: authReducer,
        device: deviceSlice.reducer,
        counter: counterSlice.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false // JWT 토큰 때문에 직렬화 체크 비활성화
        }).concat(authApi.middleware)
})

setupListeners(store.dispatch);

// WebSocket 연결은 인증 후에만 시도
// store.subscribe(() => {
//     const state = store.getState();
//     if (state.auth.isAuthenticated && !state.equipment.wsConnected) {
//         store.dispatch({ type: 'ws/connect' });
//     }
// });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;