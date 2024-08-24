import {Col, Input, Row} from "antd";
import {twMerge} from "tailwind-merge";
import Xarrow from "react-xarrows";
import React from "react";
import {useMemory} from "../hooks/useMemory";

export const Memory = () => {
    const {pageData, page, memoryData, memoryDataRow, handleUpdateLogicalAddres, shift, screenWidth, updateMemory, tablePageRow} = useMemory()
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
}