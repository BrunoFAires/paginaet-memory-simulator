import './App.css';
import Xarrow from "react-xarrows";
import React, {useEffect, useState} from "react";
import {Col, Input, Row} from "antd";
import {twMerge} from "tailwind-merge";


function App() {
    const [pageData, setPageData] = useState([
        {key: 0, page: '0000', quadro: '---', validade: 0, historico: '0000'},
        {key: 1, page: '0001', quadro: '---', validade: 0, historico: '0000'},
        {key: 2, page: '0010', quadro: '---', validade: 0, historico: '0000'},
        {key: 3, page: '0011', quadro: '---', validade: 0, historico: '0000'},
        {key: 4, page: '0100', quadro: '---', validade: 0, historico: '0000'},
        {key: 5, page: '0101', quadro: '---', validade: 0, historico: '0000'},
        {key: 6, page: '0110', quadro: '---', validade: 0, historico: '0000'},
        {key: 7, page: '0111', quadro: '---', validade: 0, historico: '0000'},
        {key: 8, page: '1000', quadro: '---', validade: 0, historico: '0000'},
        {key: 9, page: '1001', quadro: '---', validade: 0, historico: '0000'},
        {key: 10, page: '1010', quadro: '---', validade: 0, historico: '0000'},
        {key: 11, page: '1011', quadro: '---', validade: 0, historico: '0000'},
        {key: 12, page: '1100', quadro: '---', validade: 0, historico: '0000'},
        {key: 13, page: '1101', quadro: '---', validade: 0, historico: '0000'},
        {key: 14, page: '1110', quadro: '---', validade: 0, historico: '0000'},
        {key: 15, page: '1111', quadro: '---', validade: 0, historico: '0000'}
    ])

    const [memoryData, setMemoryData] = useState([
        {key: '0', quadro: '000', livre: true},
        {key: '1', quadro: '001', livre: true},
        {key: '2', quadro: '010', livre: true},
        {key: '3', quadro: '011', livre: true},
        {key: '4', quadro: '100', livre: true},
        {key: '5', quadro: '101', livre: true},
        {key: '6', quadro: '110', livre: true},
        {key: '7', quadro: '111', livre: true},
    ])

    const [page, setPage] = useState()
    const [tablePageRow, setTablePageRow] = useState()
    const [memoryDataRow, setMemoryDataRow] = useState()
    const [shift, setShift] = useState()
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [updateMemory, setUpdateMemory] = useState(false)

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleUpdateLogicalAddres = (event) => {
        const logicAdr = event.target.value
        if (logicAdr.length === 8) {
            setPage(logicAdr.slice(0, 4))
            setShift(logicAdr.slice(4, 8))
        } else {
            setPage(null)
            setShift(null)
            setUpdateMemory(false)
        }
    }

    const selectVictim = () => {
        const filteredPageData = pageData.filter(item => item.validade === 1);
        filteredPageData.sort((a, b) => parseInt(a.historico, 2) - parseInt(b.historico, 2));

        return filteredPageData[0]
    }

    useEffect(() => {
        if (page) {
            const selectedPage = pageData.find(it => it.page === page)
            let selectedMemory;
            let quadroVitima;

            if (selectedPage?.quadro === '---' || selectedPage.validade === 0) {
                setUpdateMemory(true)
                const mem = memoryData.find(it => it.livre)
                selectedMemory = {...mem, livre: false}

                if (!mem) {
                    const victim = selectVictim()
                    quadroVitima = {...victim, validade: 0}
                    selectedMemory = memoryData.find(it => it.quadro === victim.quadro);
                }

                const updatedMemory = memoryData.filter(it => it.key !== selectedMemory.key)
                const newMemory = [...updatedMemory, selectedMemory].sort((a, b) => a.key - b.key);
                setMemoryData(newMemory)
            } else {
                setUpdateMemory(false)
            }

            let newPageData = pageData.filter(it => it.key !== selectedPage.key).map(it => ({
                ...it,
                historico: '0' + it.historico.substring(0, 3)
            }))

            if (quadroVitima) {
                newPageData = newPageData.filter(it => it.key !== quadroVitima.key)
                quadroVitima = {...quadroVitima, historico: '0' + quadroVitima.historico.substring(0, 3)}
            }

            const updatedRow = {
                ...selectedPage,
                quadro: selectedMemory?.quadro ?? selectedPage?.quadro,
                validade: 1,
                historico: '1' + selectedPage.historico.substring(0, 3)
            }

            setMemoryDataRow(memoryData.find(it => (it.quadro === selectedPage?.quadro) || it.quadro === selectedMemory?.quadro))
            let a = [];
            if (quadroVitima) {
                a = [...newPageData, updatedRow, quadroVitima].sort((a, b) => a.key - b.key);
            } else {
                a = [...newPageData, updatedRow].sort((a, b) => a.key - b.key);
            }
            setPageData(a)
            setTablePageRow(selectedPage)
        }
    }, [page]);


    return (
        <Col className='m-3'>
            <Row justify=''>
                <Col className='flex flex-col items-end'>
                    <Row className='items-center mb-5'>
                        <p className='pr-2'>Endereço lógico:</p>
                        <Input onKeyPress={(event) => {
                            if (!/[01]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }} onChange={handleUpdateLogicalAddres} maxLength={8} id='logic-adr'
                               rootClassName='w-[250px]'/>
                        <div className='w-[300px]'></div>
                    </Row>
                    <Col className='space-y-3'>
                        <table id='p1tb' className='w-full border-collapse border border-slate-500'>
                            <thead>
                            <tr>
                                <th>
                                    <div className="border border-slate-600 cell-content">Decimal</div>
                                </th>
                                <th>
                                    <div className="border border-slate-600 cell-content">Página</div>
                                </th>
                                <th>
                                    <div className="border border-slate-600 cell-content">Quadro</div>
                                </th>
                                <th>
                                    <div className="border border-slate-600 cell-content">Validade</div>
                                </th>
                                <th>
                                    <div className="border border-slate-600 cell-content">Histórico</div>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {pageData.map(it => (
                                <tr key={it.key}>
                                    <td>
                                        <div className='border border-slate-600 cell-content text-center'
                                             id={`page-${it.key}`}>{it.key}</div>
                                    </td>
                                    <td>
                                        <div
                                            className='border border-slate-600 cell-content text-center'>{it.page}</div>
                                    </td>
                                    <td>
                                        <div
                                            className='border border-slate-600 cell-content text-center'>{it.quadro}</div>
                                    </td>
                                    <td>
                                        <div className='border border-slate-600 cell-content text-center'
                                             id={`valid-${it.key}`}>{it.validade}</div>
                                    </td>
                                    <td>
                                        <div className='border border-slate-600 cell-content text-center'
                                             id={`historico-${it.key}`}>{it.historico}</div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </Col>
                </Col>
                <Col className='flex flex-col items-center'>
                    <Row className='items-center mb-5'>
                        <p className='pr-2' id='physic-adr-label'>Endereço físico:</p>
                        <Input disabled value={shift ? `${memoryDataRow?.quadro}${shift}` : ''} id='physic-adr'
                               rootClassName='w-[250px]'/>
                    </Row>
                    <Col className='space-y-3 pl-10'>
                        <table id='memory' className='w-full border-collapse border border-slate-500'>
                            <thead>
                            <tr>
                                <th>
                                    <div className="border border-slate-600 cell-content">Decimal</div>
                                </th>
                                <th>
                                    <div className="border border-slate-600 cell-content">Quadro</div>
                                </th>
                                <th>
                                    <div className="border border-slate-600 cell-content">Livre</div>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {memoryData.map(it => (
                                <tr key={it.key}>
                                    <td>
                                        <div className='border border-slate-600 text-center'
                                             id={`memory-${it.key}`}>{it.key}</div>
                                    </td>
                                    <td>
                                        <div id={`quadro-${it.key}`}
                                             className='border border-slate-600 text-center'>{it.quadro}</div>
                                    </td>
                                    <td>
                                        <div id={`free-${it.key}`}
                                             className={twMerge(it.livre ? 'text-green-700' : 'text-red-700', 'border border-slate-600 text-center')}>{it.livre ? 'Sim' : 'Não'}</div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </Col>
                    <Col className='space-y-3 pl-10 mt-20'>
                        <table id='disc' className='w-full border-collapse border border-slate-500'>
                            <thead>
                            <tr>
                                <th colSpan={2}>
                                    <div className="border border-slate-600 cell-content">Disco</div>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {memoryData.map(it => (
                                <tr key={it.key}>
                                    <td>
                                        <div className='border border-slate-600 text-center'
                                             id={`memory-${it.key}`}>--
                                        </div>
                                    </td>
                                    <td>
                                        <div id={`disc-${it.key}`} className='border border-slate-600 text-center'>---
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {memoryData.map(it => (
                                <tr key={it.key}>
                                    <td>
                                        <div className='border border-slate-600 text-center'
                                             id={`memory-${it.key}`}>--
                                        </div>
                                    </td>
                                    <td>
                                        <div id={`disc-${it.key}`} className='border border-slate-600 text-center'>---
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {memoryData.map(it => (
                                <tr key={it.key}>
                                    <td>
                                        <div className='border border-slate-600 text-center'
                                             id={`memory-${it.key}`}>--
                                        </div>
                                    </td>
                                    <td>
                                        <div id={`disc-${it.key}`} className='border border-slate-600 text-center'>---
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </Col>
                </Col>

            </Row>
            {page && <><Xarrow start={'logic-adr'} end="physic-adr-label"/>
                <Xarrow start={'logic-adr'} end={`page-${tablePageRow?.key}`} startAnchor={'bottom'}/>
                <Xarrow start={`historico-${tablePageRow?.key}`}
                        end={screenWidth <= 1044 ? 'physic-adr' : 'physic-adr-label'}
                        endAnchor={screenWidth <= 1044 ? 'right' : 'bottom'}
                        path={screenWidth <= 1044 ? "grid" : 'smooth'}
                        gridBreak='-10' startAnchor='right'/>
                <Xarrow start={screenWidth <= 1044 ? 'physic-adr-label' : 'physic-adr'}
                        end={screenWidth <= 1044 ? `memory-${memoryDataRow?.key}` : `free-${memoryDataRow?.key}`}
                        endAnchor={screenWidth <= 1044 ? 'left' : 'right'}
                        startAnchor={screenWidth <= 1044 ? 'bottom' : 'right'} gridBreak='10%40'/></>
            }
            {updateMemory && <Xarrow start={'disc'} end="memory" startAnchor={'top'} color='red'/>}
            {updateMemory &&
                <Xarrow start={'disc'} end="p1tb" startAnchor={screenWidth <= 1044 ? 'right' : "left"} path={"grid"}
                        endAnchor={screenWidth <= 1044 ? 'bottom' : 'right'} color='red'/>}
        </Col>
    )
        ;
}

export default App;
