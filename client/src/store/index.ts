import {configureStore} from "@reduxjs/toolkit";
import {equipmentSlice} from "@/store/slices/equipment.slice.ts";
import {deviceSlice} from "@/store/slices/device.slice.ts";
import {counterSlice} from "@/store/slices/counter.slice.ts";

export const store = configureStore({
    reducer: {
        // 여기에 리듀서를 추가합니다.
        equipment: equipmentSlice.reducer,
        device: deviceSlice.reducer,
        counter: counterSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;