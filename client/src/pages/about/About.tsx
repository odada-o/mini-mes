import {useState} from "react";
import {Device} from "@/pages/about/about.type.ts";
import {addDevice, toggleDeviceStatus} from "@/store/slices/device.slice.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";


export default function About() {

    const dispatch = useDispatch();
    const devices = useSelector((state: RootState) => state.device.devices);
    const [newDeviceName, setNewDeviceName] = useState<string>('');

    const handleToggleStatus = (id: string) => {
        dispatch(toggleDeviceStatus(id));
    };

    const handleAddDevice = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (newDeviceName.trim() === '') {
            alert('장치 이름을 입력해주세요.');
            return;
        }

        const newDevice: Device = {
            id: String(Date.now()),
            name: newDeviceName,
            state: 'off',
        }

        dispatch(addDevice(newDevice));
        setNewDeviceName('');
    }

  return (
    <div className="py-8">
        <h1 className="text-2xl font-bold">About</h1>

        {/*새로운 장치 추가 폼*/}
        <div className="flex justify-between items-center mb-6">
            <form className="flex items-center" onSubmit={handleAddDevice}>
                <input
                    type="text"
                    className="px-4 py-2 border border-gray-300 rounded-l"
                    placeholder="장치 이름"
                    value={newDeviceName}
                    onChange={(e) => setNewDeviceName(e.target.value)}
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-r"
                >
                    추가
                </button>
            </form>
        </div>

        <p className="mt-4">
            {devices.map((device) => (
                <div key={device.id} className="flex items-center justify-between p-4 border-b">
                    <span>{device.name}</span>
                    <span className={`text-${device.state === 'on' ? 'green' : 'red'}-500`}>
                        {device.state}
                    </span>
                    <button
                        onClick={() => handleToggleStatus(device.id)}
                        className={`px-4 py-2 rounded
                ${device.status === 'on'
                            ? 'bg-red-500 hover:bg-red-600 text-white'
                            : 'bg-green-500 hover:bg-green-600 text-white'
                        }`}
                    >
                        {device.status === 'on' ? '끄기' : '켜기'}
                    </button>
                </div>
            ))}
        </p>
    </div>
  );
}