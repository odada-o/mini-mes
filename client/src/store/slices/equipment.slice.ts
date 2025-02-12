import {Equipment, EquipmentStatus} from "@/features/equipment/types/equipment.types.ts";
import {MOCK_EQUIPMENTS} from "@/features/equipment/components/mocks/equipment.data.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface EquipmentState {
    items: Equipment[];
    selectedId: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: EquipmentState = {
    items: MOCK_EQUIPMENTS,
    selectedId: null,
    loading: false,
    error: null,
};

export const equipmentSlice = createSlice({
    name: 'equipment',
    initialState,
    reducers: {
        // 설비 목록 전체 설정
        setItems: (state, action: PayloadAction<Equipment[]>) => {
            state.items = action.payload;
        },
        addEquipment: (state, action: PayloadAction<Equipment>) => {
            state.items.push(action.payload);
        },
        updateEquipment: (state, action: PayloadAction<Equipment>) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteEquipment: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        // 특정 설비의 상태 업데이트
        updateStatus: (state, action: PayloadAction<{ id: string; status: EquipmentStatus }>) => {
            const { id, status } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) item.status = status;
        },
    //     메트릭스 업데이트 (실시간 데이터)
        updateMetrics: (state, action: PayloadAction<{ id: string; metrics: Equipment['metrics'] }>) => {
            const { id, metrics } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) item.metrics = metrics;
        },

        // 선택된 설비 관리
        setSelectedEquipment: (state, action: PayloadAction<string | null>) => {
            state.selectedId = action.payload;
        },

        // 로딩/에러 상태 관리
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },

        // 정비 정보 업데이트
        updateMaintenance: (state, action: PayloadAction<{ id: string; date: string }>) => {
            const equipment = state.items.find(item => item.id === action.payload.id);
            if (equipment) {
                equipment.lastMaintenance = action.payload.date;
            }
        }

    }
})

export const {
    setItems,
    addEquipment,
    updateEquipment,
    deleteEquipment,
    updateStatus,
    updateMetrics,
    setSelectedEquipment,
    setLoading,
    setError,
    updateMaintenance
} = equipmentSlice.actions;

export default equipmentSlice.reducer;