'use client'
// DonutChart.js
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, LabelList } from 'recharts';
import { Card } from '@tremor/react';
import ClientOnly from '@/hooks/clientOnly';
import axios, { AxiosError } from 'axios';


const COLORSData = ['#ba3369', '#098074', '#023047', '#880d1e', '#f36112'];
const COLORSSports = ['#ba3369', '#098074', '#023047', '#880d1e', '#f36112', '#593c8f', '#003d14', '#004e98', '#e63946', '#6a994e'];


const Charts = () => {

    const [data, setData] = useState([
        { name: 'Limón', value: 0 },
        { name: 'Pococí', value: 0 },
        { name: 'Siquirres', value: 0 },
        { name: 'Talamanca', value: 0 },
        { name: 'Guácimo', value: 0 },
    ])

    const [sports, setSports] = useState([
        { name: 'Voleibol', value: 0 },
        { name: 'Natación', value: 0 },
        { name: 'Baloncesto', value: 0 },
        { name: 'Fútbol', value: 0 },
        { name: 'Rugby', value: 0 },
        { name: 'Ciclismo', value: 0 },
        { name: 'Taekwondo', value: 0 },
        { name: 'Atletismo', value: 0 },
        { name: 'Judo', value: 0 },
        { name: 'Gimnasia', value: 0 },
    ])

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get("/api/auth/charts")

                const { limonCount, pocociCount, siquirresCount, talamancaCount, guacimoCount } = res.data

                setData([
                    { name: 'Limón', value: limonCount },
                    { name: 'Pococí', value: pocociCount },
                    { name: 'Siquirres', value: siquirresCount },
                    { name: 'Talamanca', value: talamancaCount },
                    { name: 'Guácimo', value: guacimoCount },
                ]);
                const { voleibolCount, natacionCount, baloncestoCount, futbolCount, rugbyCount,
                    ciclismoCount, taekwondoCount, atletismoCount, judoCount, gimnasiaCount } = res.data

                setSports([
                    { name: 'Voleibol', value: voleibolCount },
                    { name: 'Natación', value: natacionCount },
                    { name: 'Baloncesto', value: baloncestoCount },
                    { name: 'Fútbol', value: futbolCount },
                    { name: 'Rugby', value: rugbyCount },
                    { name: 'Ciclismo', value: ciclismoCount },
                    { name: 'Taekwondo', value: taekwondoCount },
                    { name: 'Atletismo', value: atletismoCount },
                    { name: 'Judo', value: judoCount },
                    { name: 'Gimnasia', value: gimnasiaCount },
                ])

            } catch (error) {
                if (error instanceof AxiosError) console.log(error)
            }
        }
        fetchData();

    }, [])

    return (
        <div className='grid grid-cols-2 gap-2'>
            <ClientOnly>
                <Card>
                    <h2 className="text-base font-semibold text-slate-800">Cantidad deportistas por cantón</h2>
                    <div className='flex justify-center'>
                        <PieChart width={500} height={400}>
                            <Pie
                                data={data.filter(entry => entry.value > 0)}
                                innerRadius={100}
                                outerRadius={150}
                                fill="#8884d8"
                                dataKey="value"
                                paddingAngle={1}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORSData[index % COLORSData.length]} />
                                ))}

                                <LabelList
                                    dataKey="value"
                                    position="insideTop"
                                    style={{ fontSize: '14px', fill: '#fff' }}
                                />
                            </Pie>
                            <Tooltip />
                            <Legend
                                layout="vertical"
                                verticalAlign="bottom"
                                align="right"
                                wrapperStyle={{
                                    marginLeft: '40px',
                                    fontSize: '8px',
                                }}
                                content={<CustomLegend />}
                            />

                        </PieChart>

                    </div>
                </Card>
            </ClientOnly>


            <ClientOnly>
                <Card>
                    <h2 className="text-base font-semibold  text-slate-800">Cantidad deportistas por deporte</h2>
                    <div className='flex justify-center'>
                        <PieChart width={500} height={400}>
                            <Pie
                                data={sports.filter(entry => entry.value > 0)}
                                innerRadius={1}
                                outerRadius={150}
                                fill="#ff6d00"
                                dataKey="value"
                                paddingAngle={1}
                            >
                                {sports.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORSSports[index % COLORSSports.length]} />
                                ))}
                                <LabelList
                                    dataKey="value"
                                    position="insideTop"
                                    style={{ fontSize: '14px', fill: '#fff' }}
                                />
                            </Pie>
                            <Tooltip />
                            <Legend
                                layout="vertical"
                                verticalAlign="bottom"
                                align="right"
                                wrapperStyle={{
                                    marginLeft: '40px',
                                    fontSize: '8px',
                                }}
                                content={<CustomLegend />}
                            />
                        </PieChart>
                    </div>
                </Card>
            </ClientOnly>
        </div>

    )
}

const CustomLegend = ({ payload }: any) => {
    return (
        <div className='text-xs'>
            {payload.map((entry: any, index: any) => (
                <div key={`item-${index}`} className="flex items-center gap-1">
                    <span className={`h-3 w-2`} style={{ backgroundColor: entry.color }}></span>
                    <span className="text-sm" style={{ color: entry.color }}>{entry.value}</span>
                </div>
            ))}
        </div>
    );
};
export default Charts
