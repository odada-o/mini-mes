// WebSocket 미들웨어 설정

import { Middleware } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';
import { Equipment } from '../../features/equipment/types/equipment.types.ts';

let socket: Socket;

export const websocketMiddleware: Middleware = (store) => (next) => (action) => {
    if (!socket) {
        socket = io('ws://your-server-url');

        socket.on('equipment_update', (equipment: Equipment) => {
            store.dispatch({
                type: 'equipment/updateMetrics',
                payload: equipment,
            });
        });
    }

    return next(action);
};