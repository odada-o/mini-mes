// src/features/equipment/utils/statusUtils.ts
import { EquipmentStatus } from '../types/equipment.types';

export const getStatusColor = (status: EquipmentStatus): string => {
    const colors = {
        'RUNNING': 'bg-green-500',
        'STOPPED': 'bg-red-500',
        'MAINTENANCE': 'bg-yellow-500'
    };
    return colors[status] || 'bg-gray-500';
};

export const getStatusText = (status: EquipmentStatus): string => {
    const texts = {
        'RUNNING': '가동 중',
        'STOPPED': '정지',
        'MAINTENANCE': '유지보수'
    };
    return texts[status] || status;
};