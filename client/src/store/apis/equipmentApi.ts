// RTK Query와 기본 fetch 함수를 불러옵니다
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// 설비 관련 타입 정의를 불러옵니다
import { Equipment, EquipmentStatus } from '@/features/equipment/types/equipment.types';

// API 정의를 생성합니다
export const equipmentApi = createApi({
    // Redux store에서 사용할 고유한 경로명
    reducerPath: 'equipmentApi',

    // 기본 API 설정 (기본 URL 등)
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),

    // 캐시 무효화에 사용할 태그 타입들
    tagTypes: ['Equipment'],

    // API 엔드포인트들을 정의합니다
    endpoints: (builder) => ({
        // builder.query, builder.mutation을 사용하여 엔드포인트를 정의합니다
        // 모든 설비 목록을 가져오는 쿼리
        getEquipments: builder.query<Equipment[], void>({
            // GET /api/equipments 호출
            query: () => 'equipments',
            // 이 데이터는 'Equipment' 태그로 캐시됨
            providesTags: ['Equipment']
        }),

        // 특정 설비의 상세 정보를 가져오는 쿼리
        getEquipmentById: builder.query<Equipment, string>({
            // GET /api/equipments/{id} 호출
            query: (id) => `equipments/${id}`,
            // 각 설비별로 고유한 캐시 태그 생성
            providesTags: (_result, _err, id) => [{ type: 'Equipment', id }]
        }),

        // 설비 상태를 업데이트하는 뮤테이션
        updateEquipmentStatus: builder.mutation<Equipment, { id: string; status: EquipmentStatus }>({
            // PATCH /api/equipments/{id}/status 호출
            query: ({ id, status }) => ({
                url: `equipments/${id}/status`,
                method: 'PATCH',
                body: { status }
            }),
            // 업데이트 후 해당 설비의 캐시를 무효화
            invalidatesTags: (_result, _err, { id }) => [{ type: 'Equipment', id }]
        }),

        // 설비의 실시간 메트릭스를 조회하는 쿼리
        getEquipmentMetrics: builder.query<Equipment['metrics'], string>({
            // GET /api/equipments/{id}/metrics 호출
            query: (id) => `equipments/${id}/metrics`,
            // 5초마다 자동으로 데이터 갱신
            pollingInterval: 5000
        })
    })
});

// 생성된 훅들을 내보냅니다
export const {
    // 설비 목록 조회 훅
    useGetEquipmentsQuery,
    // 설비 상세 조회 훅
    useGetEquipmentByIdQuery,
    // 설비 상태 업데이트 훅
    useUpdateEquipmentStatusMutation,
    // 설비 메트릭스 조회 훅
    useGetEquipmentMetricsQuery
} = equipmentApi;