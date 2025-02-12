export type DeviceState = 'on' | 'off';

export interface Device {
    id: string;
    name: string;
    state: DeviceState;
    status?: string;
}

// mock data
export const MOCK_DEVICE: Device[] = [
    { id: '1', name: '설비 1', state: 'on' },
    { id: '2', name: '설비 2', state: 'off' },
    { id: '3', name: '설비 3', state: 'on' },
    { id: '4', name: '설비 4', state: 'off' },
    { id: '5', name: '설비 5', state: 'on' },
    { id: '6', name: '설비 6', state: 'off' },
    { id: '7', name: '설비 7', state: 'on' },
    { id: '8', name: '설비 8', state: 'off' },
    { id: '9', name: '설비 9', state: 'on' },
    { id: '10', name: '설비 10', state: 'off' },
];