import {useState} from "react";
import {EquipmentFormData, EquipmentStatus} from "@/features/equipment/types/equipment.types.ts";
import {EquipmentForm} from "@/features/equipment/components/EquipmentForm";
import {EquipmentCard} from "@/features/equipment/components/EquipmentList";
import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import {addEquipment, deleteEquipment, updateStatus} from "@/store/slices/equipment.slice.ts";
import {useNavigate} from "react-router-dom";

const EquipmentList = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [showForm, setShowForm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const equipments = useAppSelector(state => state.equipment.items);
    const loading = useAppSelector(state => state.equipment.loading);
    const error = useAppSelector(state => state.equipment.error);

    const handleStatusChange = async (id: string, newStatus: EquipmentStatus) => {
        try {
            // await dispatch(updateStatus({ id, status: newStatus })).unwrap();
            dispatch(updateStatus({ id, status: newStatus }));
            setShowForm(false);
        } catch (error) {
            console.error('상태 변경 중 오류 발생:', error);
            alert('상태 변경 중 오류가 발생했습니다.');
        }
    };

    const handleAddEquipment = async (data: EquipmentFormData) => {

        const newEquipment = {
            ...data,
            id: `eq-${Date.now()}` // 임시 ID 생성
        };

        try {
            // await dispatch(addEquipment(newEquipment)).unwrap();
            dispatch(addEquipment(newEquipment));
            setShowForm(false);
        } catch (error) {
            console.error('설비 추가 중 오류 발생:', error);
            alert('설비 추가 중 오류가 발생했습니다.');
        }
    };

    const handleDeleteEquipment = async (id: string) => {
        // 삭제 확인
        if (!window.confirm('정말로 삭제하시겠습니까?')) return;

        try {
            setIsDeleting(true);
            // await dispatch(deleteEquipment(id)).unwrap();
            dispatch(deleteEquipment(id));
        } catch (error) {
            console.error('설비 삭제 중 오류 발생:', error);
            alert('설비 삭제 중 오류가 발생했습니다.');
        }
    };

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>에러 발생: {error}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">설비 목록</h1>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => setShowForm(true)}>
                    설비 추가
                </button>
            </div>

            {/* 설비 추가 폼 모달 */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-100 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <EquipmentForm
                                onSubmit={handleAddEquipment}
                                onCancel={() => setShowForm(false)}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* 설비 목록 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {equipments.map(equipment => (
                    <EquipmentCard
                        key={equipment.id}
                        equipment={equipment}
                        onStatusChange={handleStatusChange}
                        onDelete={() => handleDeleteEquipment(equipment.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default EquipmentList;