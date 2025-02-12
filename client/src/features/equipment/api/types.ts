import { EquipmentTypes, EquipmentMonitoringData } from '../types/equipment.types.ts';

export interface GetEquipmentListParams {
    page?: number;
    limit?: number;
    status?: string;
    type?: string;
}

export interface GetEquipmentListResponse {
    items: EquipmentTypes[];
    total: number;
    page: number;
    limit: number;
}

export interface CreateEquipmentRequest {
    name: string;
    code: string;
    type: string;
    location: string;
}

export interface UpdateEquipmentRequest {
    id: string;
    name?: string;
    status?: string;
    type?: string;
    location?: string;
}