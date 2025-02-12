import {useState} from "react";
import {EquipmentFormData, EquipmentFormProps} from "@/features/equipment/types/equipment.types.ts";

export const EquipmentForm = ({onSubmit, onCancel}: EquipmentFormProps) => {
    const [formData, setFormData] = useState<EquipmentFormData>({
        name: '',
        status: 'STOPPED',
        location: '',
        specifications: {
            model: '',
            manufacturer: '',
            installationDate: ''
        },
        metrics: {
            temperature: 0,
            humidity: 0,
            performance: 0,
            uptime: 0
        },
        lastMaintenance: new Date().toISOString().split('T')[0]
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 폼 데이터 전송
        onSubmit(formData);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">설비 정보 입력</h2>

                {/* 기본 정보 */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            설비명
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="mt-1 block w-full rounded-md border-gray-300 border shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            위치
                        </label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                            className="mt-1 block w-full rounded-md border-gray-300 border shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* 사양 정보 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            모델명
                        </label>
                        <input
                            type="text"
                            value={formData.specifications.model}
                            onChange={(e) => setFormData({
                                ...formData,
                                specifications: {...formData.specifications, model: e.target.value}
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 border shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            제조사
                        </label>
                        <input
                            type="text"
                            value={formData.specifications.manufacturer}
                            onChange={(e) => setFormData({
                                ...formData,
                                specifications: {...formData.specifications, manufacturer: e.target.value}
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 border shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            설치일
                        </label>
                        <input
                            type="date"
                            value={formData.specifications.installationDate}
                            onChange={(e) => setFormData({
                                ...formData,
                                specifications: {...formData.specifications, installationDate: e.target.value}
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 border shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>
            </div>

            {/* 버튼 */}
            <div className="flex justify-end space-x-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                >
                    취소
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
                >
                    저장
                </button>
            </div>
        </form>
    );
}