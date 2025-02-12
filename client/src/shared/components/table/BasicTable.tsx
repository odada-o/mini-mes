import React from 'react';
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";

// 1. 데이터 타입 정의
type User = {
    id: number;
    name: string;
    email: string;
}

// 2. 테이블 헤더
const columns = [
    {
        accessorKey: 'name',
        header: '이름'
    },
    {
        accessorKey: 'email',
        header: '이메일'
    }
]

// 3. 샘플 데이터
const data = [
    { id: 1, name: '김철수', email: 'kim@test.com' },
    { id: 2, name: '이영희', email: 'lee@test.com' },
];

function BasicTable() {

    // 4. 테이블 렌더링
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <table>
            <thead>
            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                        <th key={header.id}>
                            {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                            {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                            )}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default BasicTable;