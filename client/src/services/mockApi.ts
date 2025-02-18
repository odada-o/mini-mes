// src/services/mockApi.ts (수정)
import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'
// import { equipmentsMock, allEquipmentMetrics, latestMetrics } from '../equipment/mocks/equipmentMockData';

// 목업 사용자 데이터
const users = [
    {
        id: 'user-1',
        username: 'admin',
        password: 'admin123',
        name: '관리자',
        email: 'admin@company.com',
        role: 'admin',
        department: 'IT'
    },
    {
        id: 'user-2',
        username: 'operator',
        password: 'operator123',
        name: '운영자',
        email: 'operator@company.com',
        role: 'operator',
        department: '생산관리'
    },
    {
        id: 'user-3',
        username: 'viewer',
        password: 'viewer123',
        name: '모니터링',
        email: 'viewer@company.com',
        role: 'viewer',
        department: '품질관리'
    }
];



// 인증 확인 미들웨어
const withAuth = (req, res, ctx, handler) => {
    const authHeader = req.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res(
            ctx.status(401),
            ctx.json({ error: '인증이 필요합니다' })
        );
    }

    const token = authHeader.split(' ')[1];
    // 간단한 토큰 검증 (실제로는 더 복잡한 JWT 검증이 필요)
    const validTokens = users.map(user => `mock-token-${user.id}`);

    if (!validTokens.includes(token)) {
        return res(
            ctx.status(401),
            ctx.json({ error: '유효하지 않은 토큰입니다' })
        );
    }

    return handler(req, res, ctx);
};

// 모든 핸들러에 인증 적용
export const handlers = [
    // 로그인 엔드포인트
    rest.post('/api/auth/login', async (req, res, ctx) => {
        const { username, password } = await req.json();
        const user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            return res(
                ctx.status(401),
                ctx.json({ error: '잘못된 사용자 이름 또는 비밀번호입니다' })
            );
        }

        const { password: _, ...userWithoutPassword } = user;
        const token = `mock-token-${user.id}`;

        return res(
            ctx.status(200),
            ctx.json({
                user: userWithoutPassword,
                token
            })
        );
    }),

    // 로그아웃 엔드포인트
    rest.post('/api/auth/logout', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({ message: '로그아웃 성공' })
        );
    }),

    // 현재 사용자 정보 엔드포인트
    rest.get('/api/auth/me', (req, res, ctx) => {
        return withAuth(req, res, ctx, (req, res, ctx) => {
            const authHeader = req.headers.get('authorization');
            const token = authHeader.split(' ')[1];
            const userId = token.replace('mock-token-', '');
            const user = users.find(u => u.id === userId);

            if (!user) {
                return res(
                    ctx.status(404),
                    ctx.json({ error: '사용자를 찾을 수 없습니다' })
                );
            }

            const { password: _, ...userWithoutPassword } = user;

            return res(
                ctx.status(200),
                ctx.json(userWithoutPassword)
            );
        });
    }),

    // 모든 설비 목록 조회 (인증 필요)
    // rest.get('/api/equipments', (req, res, ctx) => {
    //     return withAuth(req, res, ctx, (req, res, ctx) => {
    //         return res(
    //             ctx.status(200),
    //             ctx.json(equipmentsMock)
    //         );
    //     });
    // }),

    // 다른 API 엔드포인트들에도 인증 적용...
    // rest.get('/api/equipments/:id', (req, res, ctx) => {
    //     return withAuth(req, res, ctx, (req, res, ctx) => {
    //         const { id } = req.params;
    //         const equipment = equipmentsMock.find(item => item.id === id);
    //
    //         if (!equipment) {
    //             return res(
    //                 ctx.status(404),
    //                 ctx.json({ error: 'Equipment not found' })
    //             );
    //         }
    //
    //         return res(
    //             ctx.status(200),
    //             ctx.json(equipment)
    //         );
    //     });
    // }),

    // 나머지 엔드포인트도 동일하게 withAuth로 감싸기
    // ...
];

export const worker = setupWorker(...handlers);