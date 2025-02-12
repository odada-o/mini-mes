import {Device, MOCK_DEVICE} from "@/pages/about/about.type.ts";
import {createSlice} from "@reduxjs/toolkit";

interface DeviceState {
    devices: Device[];
}

const initialState: DeviceState = {
    devices: MOCK_DEVICE,
};

export const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
    // 상태 토글
        // payload로 id를 받아와서 해당 id의 device의 state를 변경
        toggleDeviceStatus: (state, action) => {
            // payload로 받아온 id
            const id = action.payload;
            // id로 devices 배열에서 해당 device를 찾음
            const device = state.devices.find((device) => device.id === id);
            // device가 있다면 state를 변경
            if (device) device.state = device.state === 'on' ? 'off' : 'on';
        },
        // 장치 추가
        // payload로 device를 받아와서 devices 배열에 추가
        addDevice: (state, action) => {
            // payload로 받아온 device
            const device = action.payload;
            // devices 배열에 추가
            state.devices.push(device);
        }
    }
})

export const { toggleDeviceStatus, addDevice } = deviceSlice.actions;
export default deviceSlice.reducer;