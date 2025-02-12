// src/features/equipment/components/EquipmentMonitor/MonitoringDashboard.tsx
import { useMemo } from 'react';
import {MOCK_EQUIPMENTS} from "@/features/equipment/components/mocks/equipment.data.ts";

export const MonitoringDashboard = () => {

    const equipments = MOCK_EQUIPMENTS;

    // 통계 계산
    const stats = useMemo(() => {
        const total = equipments.length;
        const running = equipments.filter(eq => eq.status === 'RUNNING').length;
        const maintenance = equipments.filter(eq => eq.status === 'MAINTENANCE').length;
        const stopped = equipments.filter(eq => eq.status === 'STOPPED').length;

        const avgPerformance = equipments.reduce((acc, eq) =>
            acc + eq.metrics.performance, 0) / total;

        const avgTemperature = equipments.reduce((acc, eq) =>
            acc + eq.metrics.temperature, 0) / total;

        return {
            total,
            running,
            maintenance,
            stopped,
            avgPerformance,
            avgTemperature
        };
    }, [equipments]);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">설비 모니터링 대시보드</h1>

            {/* 상태 요약 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-gray-500 text-sm">전체 설비</h3>
                    <p className="text-2xl font-bold mt-2">{stats.total}대</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-gray-500 text-sm">가동 중</h3>
                    <p className="text-2xl font-bold mt-2 text-green-500">{stats.running}대</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-gray-500 text-sm">정비 중</h3>
                    <p className="text-2xl font-bold mt-2 text-yellow-500">{stats.maintenance}대</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-gray-500 text-sm">정지</h3>
                    <p className="text-2xl font-bold mt-2 text-red-500">{stats.stopped}대</p>
                </div>
            </div>

            {/* 성능 지표 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-gray-500 text-sm mb-4">평균 성능</h3>
                    <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                            <div>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                    성능
                                </span>
                            </div>
                            <div className="text-right">
                                <span className="text-xs font-semibold inline-block text-blue-600">
                                    {stats.avgPerformance.toFixed(1)}%
                                </span>
                            </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                            <div
                                style={{ width: `${stats.avgPerformance}%` }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-gray-500 text-sm mb-4">평균 온도</h3>
                    <div className="flex items-center">
                        <div className="text-3xl font-bold">
                            {stats.avgTemperature.toFixed(1)}°C
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};