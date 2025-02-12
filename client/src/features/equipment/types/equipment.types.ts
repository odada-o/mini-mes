// 설비 상태 타입
export type EquipmentStatus = "RUNNING" | "STOPPED" | "MAINTENANCE";

// 설비 사양 정보 타입
export interface EquipmentSpecifications {
    model: string;
    manufacturer: string;
    installationDate: string;
}

// 설비 성능 지표 타입
export interface EquipmentMetrics {
    temperature: number;
    humidity: number;
    performance: number;
    uptime: number;
}

// 설비 기본 타입
export interface Equipment {
    id: string;
    name: string;
    status: EquipmentStatus;
    location: string;
    specifications: EquipmentSpecifications;
    metrics: EquipmentMetrics;
    lastMaintenance: string;
}

// 설비 폼 데이터 타입
export type EquipmentFormData = Omit<Equipment, "id">;

// 설비 리스트 컴포넌트 프롭스
export interface EquipmentListProps {
    equipments: Equipment[];
    onStatusChange: (id: string, newStatus: Equipment["status"]) => void;
}

// 설비 카드 컴포넌트 프롭스
export interface EquipmentCardProps {
    equipment: Equipment;
    onStatusChange: (id: string, newStatus: Equipment["status"]) => void;
}

// 설비 폼 컴포넌트 프롭스
export interface EquipmentFormProps {
    onSubmit: (data: EquipmentFormData) => void;
    onCancel: () => void;
}

// 설비 상세 페이지 컴포넌트 프롭스
export interface EquipmentDetailProps {
    equipment: Equipment;
}

// 모니터링 데시보드 통계 타입
export interface MonitoringStats {
    totalEquipments: number;
    runningEquipments: number;
    stoppedEquipments: number;
    maintenanceEquipments: number;
}
