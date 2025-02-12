import {Equipment} from "@/features/equipment/types/equipment.types.ts";

export const MOCK_EQUIPMENTS: Equipment[] = [
    {
        id: '1',
        name: 'Equipment-A',
        status: 'RUNNING',
        location: '1층 생산라인',
        specifications: {
            model: 'XJ-2000',
            manufacturer: 'SK하이닉스',
            installationDate: '2024-01-15',
        },
        metrics: {
            temperature: 25.5,
            humidity: 60,
            performance: 85,
            uptime: 1234
        },
        lastMaintenance: '2024-02-01'
    },
    {
        id: '2',
        name: 'Equipment-B',
        status: 'MAINTENANCE',
        location: '2층 생산라인',
        specifications: {
            model: 'YJ-1000',
            manufacturer: '삼성전자',
            installationDate: '2024-02-01',
        },
        metrics: {
            temperature: 30.5,
            humidity: 70,
            performance: 80,
            uptime: 2000
        },
        lastMaintenance: '2024-02-15'
    },
    {
        id: '3',
        name: 'Equipment-C',
        status: 'STOPPED',
        location: '3층 생산라인',
        specifications: {
            model: 'ZJ-3000',
            manufacturer: 'LG전자',
            installationDate: '2024-03-01',
        },
        metrics: {
            temperature: 20.5,
            humidity: 50,
            performance: 90,
            uptime: 3000
        },
        lastMaintenance: '2024-03-15'
    },
    {
        id: '4',
        name: 'Equipment-D',
        status: 'RUNNING',
        location: '4층 생산라인',
        specifications: {
            model: 'XJ-2000',
            manufacturer: 'SK하이닉스',
            installationDate: '2024-04-01',
        },
        metrics: {
            temperature: 25.5,
            humidity: 60,
            performance: 85,
            uptime: 1234
        },
        lastMaintenance: '2024-04-15'
    }
];