import React, {useState} from 'react';
import {
    ColumnDef, flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable
} from "@tanstack/react-table";
import {EquipmentTypes, EquipmentStatus} from "../types/equipment.types.ts";

const columns: ColumnDef<EquipmentTypes>[] = [
    {
        accessorKey: 'code',
        header: '설비 코드',
    },
    {
        accessorKey: 'name',
        header: '설비명',
    },
    {
        accessorKey: 'status',
        header: '설비 상태',
        cell: ({row}) => {
            const status = row.getValue('status') as EquipmentStatus;
            return (
                <div className={`
                  inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                  ${status === EquipmentStatus.RUNNING ? 'bg-green-100 text-green-800' : ''}
                  ${status === EquipmentStatus.IDLE ? 'bg-gray-100 text-gray-800' : ''}
                  ${status === EquipmentStatus.MAINTENANCE ? 'bg-yellow-100 text-yellow-800' : ''}
                  ${status === EquipmentStatus.ERROR ? 'bg-red-100 text-red-800' : ''}
                `}>
                    {status}
                </div>
            )
        }
    },
    {
        accessorKey: 'type',
        header: '설비 유형',
    },
    {
        accessorKey: 'location',
        header: '설치 위치',
    },
    {
        accessorKey: 'lastMaintenance',
        header: '최근 점검일',
    },
    {
        accessorKey: 'nextMaintenance',
        header: '다음 점검 예정일',
    }
];

// 임시 데이터
const defaultData: EquipmentTypes[] = [
    {
        id: '1',
        name: '설비1',
        code: 'EQUIP1',
        status: EquipmentStatus.RUNNING,
        type: '유형1',
        location: '위치1',
        lastMaintenance: new Date(),
        nextMaintenance: new Date(),
    },
    {
        id: '2',
        name: '설비2',
        code: 'EQUIP2',
        status: EquipmentStatus.IDLE,
        type: '유형2',
        location: '위치2',
        lastMaintenance: new Date(),
        nextMaintenance: new Date(),
    },
    {
        id: '3',
        name: '설비3',
        code: 'EQUIP3',
        status: EquipmentStatus.MAINTENANCE,
        type: '유형3',
        location: '위치3',
        lastMaintenance: new Date(),
        nextMaintenance: new Date(),
    },
    {
        id: '4',
        name: '설비4',
        code: 'EQUIP4',
        status: EquipmentStatus.ERROR,
        type: '유형4',
        location: '위치4',
        lastMaintenance: new Date(),
        nextMaintenance: new Date(),
    },
];

function EquipmentTable(props) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [data] = useState(() => [...defaultData])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
        },
        onSortingChange: setSorting,
    })

    return (
        <div>
            <table>
                <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    // headerGroup은? ColumnDef의 배열을 가지고 있음
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                    {props.equipmentList.map((equipment) => (
                        <tr key={equipment.id}>
                            <td>{equipment.name}</td>
                            <td>{equipment.quantity}</td>
                            <td>{equipment.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button>이전</button>
                <button>다음</button>
            </div>
        </div>
    );
}

export default EquipmentTable;