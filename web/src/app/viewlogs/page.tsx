'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IconReload } from '@tabler/icons-react';
import { cn } from '../lib/utils';
import { Pagination } from '../components/ui/pagination';

interface LOG {
    drone_id: string;
    drone_name: string;
    country: string;
    celsius: number;
    created: string;
}

export default function ViewLogsPage(): JSX.Element {

    const [logsData, setLogsData] = useState<LOG[]>([]);
    const [reload, setReload] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const get_logs_data = async () => {
        try {
            // const logs = await axios.get(`http://localhost:8000/logs/${page}`, { headers: { 'Content-Type': 'application/json' } });
            const logs = await axios.get(`https://65010673-drone-website-server.vercel.app/logs/${page}`, { headers: { 'Content-Type': 'application/json' } });
            if (logs) {
                // console.log(logs.data);
                setLogsData(logs.data.drone_logs);
                setReload(false);
                setTotalPages(logs.data.total_pages);
            }
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
    }

    useEffect(() => {
        get_logs_data();
    }, [reload, page])


    return (
        <>
            <div className="flex flex-row gap-10 justify-start items-center" id="view-logs-top">
                <div className="font-extrabold text-3xl text-white">View Logs</div>
                <IconReload className={cn("mt-[6px] cursor-pointer", reload && "animate-spin")} onClick={() => { setReload(true); setLogsData([]); }} />
            </div>
            <table className="table-auto w-full mt-12 border border-slate-300 rounded-lg">
                <thead>
                    <tr className="border border-slate-300">
                        <th className="text-start p-3 bg-neutral-800 text-white">Drone ID</th>
                        <th className="text-start p-3 bg-neutral-800 text-white">Drone Name</th>
                        <th className="text-start p-3 bg-neutral-800 text-white">Country</th>
                        <th className="text-start p-3 bg-neutral-800 text-white">Celsius</th>
                        <th className="text-start p-3 bg-neutral-800 text-white">Created</th>
                    </tr>
                </thead>
                <tbody>
                    {(logsData && logsData.length > 0) ? logsData.map((log, index) => (
                        <tr key={index}>
                            <td className="p-2 text-white">{log.drone_id}</td>
                            <td className="p-2 text-white">{log.drone_name}</td>
                            <td className="p-2 text-white">{log.country}</td>
                            <td className="p-2 text-white">{log.celsius}</td>
                            <td className="p-2 text-white">{new Date(log.created).toLocaleString()}</td>
                        </tr>
                    )) : (
                        [...new Array(1)].map((_, index) => (
                            <tr
                                key={index}
                                className="h-[50px]"
                            >
                                <td className="bg-neutral-800 animate-pulse"></td>
                                <td className="bg-neutral-800 animate-pulse"></td>
                                <td className="bg-neutral-800 animate-pulse"></td>
                                <td className="bg-neutral-800 animate-pulse"></td>
                                <td className="bg-neutral-800 animate-pulse"></td>
                            </tr>
                        )
                        ))}
                </tbody>
            </table>
            <div className="w-full flex flex-row justify-center items-center">
                <Pagination totalPages={totalPages} setPage={setPage} />
            </div>
        </>
    )
}
