import {configureStore} from "@reduxjs/toolkit";
import {equipmentSlice} from "@/store/slices/equipment.slice.ts";
import {deviceSlice} from "@/store/slices/device.slice.ts";
import {counterSlice} from "@/store/slices/counter.slice.ts";
import {authSlice} from "@/store/slices/auth.slice.ts";
import {authApi} from "@/store/apis/authApi.ts";

export const store = configureStore({
    reducer: {
        // 여기에 리듀서를 추가합니다.
        equipment: equipmentSlice.reducer,
        device: deviceSlice.reducer,
        counter: counterSlice.reducer,
        auth: authSlice.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false // JWT 토큰 때문에 직렬화 체크 비활성화
        }).concat(authApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;