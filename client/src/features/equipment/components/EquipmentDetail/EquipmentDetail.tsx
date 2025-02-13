// src/features/equipment/components/EquipmentDetail.tsx
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import {deleteEquipment, updateEquipment, updateStatus} from "@/store/slices/equipment.slice.ts";
import {useState} from "react";
import {getStatusColor, getStatusText} from "@/features/equipment/utils/statusUtils.ts";
import {EquipmentStatus} from "@/features/equipment/types/equipment.types.ts";
import {useGetEquipmentByIdQuery, useUpdateEquipmentStatusMutation} from "@/store/apis/equipmentApi.ts";

export const EquipmentDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);

    const dispatch = useAppDispatch();
    const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);

    // RTK Query hooks 사용
    const {data: equipment, isLoading, error} = useGetEquipmentByIdQuery(id);
    const [updateEquipmentStatus] = useUpdateEquipmentStatusMutation();

    // 로딩 상태 처리
    if (isLoading) return <div>로딩 중...</div>;
    // 에러 처리
    if (error) return <div>오류 발생: {error}</div>;
    // 데이터가 없는 경우
    if (!equipment) return <div>설비를 찾을 수 없습니다.</div>;

    // 임시로 목업 데이터 사용
    // const equipment = useAppSelector(state => state.equipment.items.find(item => item.id === id));

    // 삭제 핸들러
    const handleDelete = async () => {
        // 삭제 확인
        if (!window.confirm('정말로 삭제하시겠습니까?')) return;

        try {
            setIsDeleting(true);
            // 삭제 API 호출
            dispatch(deleteEquipment(equipment.id));
            alert('설비가 성공적으로 삭제되었습니다.');
        //     삭제 성공 시 경로 이동
            navigate('/equipment');
        } catch (error) {
            console.error('설비 삭제 중 오류 발생:', error);
            alert('설비 삭제 중 오류가 발생했습니다.');
        }
    }

    // 상태 변경 핸들러
    const handleStatusChange = async (status: EquipmentStatus) => {
        try {
            // 상태 변경 API 호출
            // dispatch(updateStatus({ id: equipment.id, status }));

            // RTK Query mutation 사용
            await updateEquipmentStatus({ id: equipment.id, status }).unwrap()
            setIsStatusMenuOpen(false);
        } catch (error) {
            console.error('상태 변경 중 오류 발생:', error);
            alert('상태 변경 중 오류가 발생했습니다.');
        }
    }

    return (
        <div className="container mx-auto p-6">
            {/* 헤더 */}
            <div>
                <h1 className="text-2xl font-bold">{equipment.name}</h1>
                <p className="text-gray-500 mt-1">ID: {equipment.id}</p>
            </div>
            <div className="flex justify-between items-center mb-6">
                <div className="relative inline-block">
                    <button
                        onClick={() => setIsStatusMenuOpen(!isStatusMenuOpen)}
                        className={`px-4 py-2 ${getStatusColor(equipment.status)} text-white rounded hover:opacity-90`}
                    >
                        {getStatusText(equipment.status)}
                    </button>
                    {isStatusMenuOpen && (
                        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-20 border">
                            <button
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => handleStatusChange('RUNNING')}
                            >
                                가동 중
                            </button>
                            <button
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => handleStatusChange('STOPPED')}
                            >
                                정지
                            </button>
                            <button
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => handleStatusChange('MAINTENANCE')}
                            >
                                유지보수
                            </button>
                        </div>
                    )}
                </div>
                <Link to={`/equipment/edit/${equipment.id}`}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    수정
                </Link>
                {/*삭제*/}
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className={`px-4 py-2 bg-red-500 text-white rounded 
                ${isDeleting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
                >
                    {isDeleting ? '삭제 중...' : '삭제'}
                </button>
                <Link to={'/equipment'} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                    목록으로
                </Link>
            </div>

            {/* 상세 정보 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 기본 정보 */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">기본 정보</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-500">ID</span>
                            <span>{equipment.id}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">상태</span>
                            <span className="px-2 py-1 bg-green-500 text-white rounded-full text-sm">
                                {equipment.status}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">위치</span>
                            <span>{equipment.location}</span>
                        </div>
                    </div>
                </div>

                {/* 사양 정보 */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">사양 정보</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-500">모델</span>
                            <span>{equipment.specifications.model}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">제조사</span>
                            <span>{equipment.specifications.manufacturer}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">설치일</span>
                            <span>{equipment.specifications.installationDate}</span>
                        </div>
                    </div>
                </div>

                {/* 현재 상태 */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">현재 상태</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-500">온도</span>
                            <span>{equipment.metrics.temperature}°C</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">습도</span>
                            <span>{equipment.metrics.humidity}%</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">성능</span>
                            <span>{equipment.metrics.performance}%</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">가동시간</span>
                            <span>{equipment.metrics.uptime}시간</span>
                        </div>
                    </div>
                </div>

                {/* 정비 정보 */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">정비 정보</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-500">마지막 정비일</span>
                            <span>{equipment.lastMaintenance}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};