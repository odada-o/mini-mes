import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Equipment, EquipmentCardProps} from "@/features/equipment/types/equipment.types.ts";
import {getStatusColor} from "@/features/equipment/utils/statusUtils.ts";

function EquipmentCard({equipment, onStatusChange, onDelete}: EquipmentCardProps) {
    const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);

    const handleStatusChange = (newStatus: Equipment['status']) => {
        onStatusChange(equipment.id, newStatus);
        setIsStatusMenuOpen(false);
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
            {/* 헤더 영역 */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{equipment.name}</h3>
                <span className={`${getStatusColor(equipment.status)} px-3 py-1 rounded-full text-white text-sm`}>
                    {equipment.status}
                </span>
            </div>

            {/* 상세 정보 */}
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-500">위치</span>
                    <span>{equipment.location}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">모델</span>
                    <span>{equipment.specifications.model}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">온도</span>
                    <span>{equipment.metrics.temperature}°C</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">습도</span>
                    <span>{equipment.metrics.humidity}%</span>
                </div>
            </div>

            {/* 작업 버튼 */}
            <div className="mt-4 pt-4 border-t flex justify-end space-x-2">
                <Link to={`/equipment/${equipment.id}`} className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800">
                    상세보기
                </Link>
                <div className="relative">
                    <button
                        className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                        onClick={() => setIsStatusMenuOpen(!isStatusMenuOpen)}
                    >
                        상태변경
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

                <button onClick={onDelete} className={`px-4 py-2 bg-red-500 text-white rounded`}>삭제</button>
            </div>

        </div>
    );
}

export default EquipmentCard;