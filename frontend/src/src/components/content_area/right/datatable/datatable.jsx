import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { HoverShowdata } from "@/components/hover/hover_showdata";

const initialInvoices = [
    {
        invoice: "2025.2.5",
        paymentStatus: "5公里",
        totalAmount: "00:32:10",
        paymentMethod: "00:06:25",
    },
    {
        invoice: "2025.2.6",
        paymentStatus: "10公里",
        totalAmount: "00:45:10",
        paymentMethod: "00:04:30",
    },
    {
        invoice: "2025.2.7",
        paymentStatus: "15公里",
        totalAmount: "01:00:10",
        paymentMethod: "00:04:00",
    },
    {
        invoice: "2025.2.8",
        paymentStatus: "20公里",
        totalAmount: "01:30:10",
        paymentMethod: "00:04:30",
    },
];

export function DataTable() {
    const [invoices, setInvoices] = useState(initialInvoices);

    const addNewData = () => {
        // 这里可以根据需求生成新的数据，这里简单示例
        const newInvoice = {
            invoice: "新日期",
            paymentStatus: "新里程",
            totalAmount: "新时间",
            paymentMethod: "新配速",
        };
        setInvoices([...invoices, newInvoice]);
    };

    return (
        <Table className=" opacity-75 bg-green-300 scrollbar overflow-auto">
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>操作</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                        <TableCell className="font-medium"><HoverShowdata data={invoice.invoice} /></TableCell>
                        <TableCell>{invoice.paymentStatus}</TableCell>
                        <TableCell>{invoice.paymentMethod}</TableCell>
                        <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                ))}
                <TableRow>
                    <TableCell colSpan={4}></TableCell>
                    <TableCell>
                        <button onClick={addNewData} className='bg-red-400 w-full h-full'>添加新数据</button>
                    </TableCell>
                </TableRow>
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>
                    <button onClick={addNewData} className='bg-red-400 w-full h-full'>添加新数据</button>
                    </TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                    
                </TableRow>
            </TableFooter>
        </Table>
    );
}