import {
    Grid,
    TextField,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Grid2
} from "@mui/material";
import {twMerge} from "tailwind-merge";
import Xarrow from "react-xarrows";
import React from "react";
import {useMemory} from "../hooks/useMemory";

const rightArrow = {
    svgElem: <path d="M 0 0 L 1 0.5 L 0 1 L 0.25 0.5 z" transform="rotate(180 0.65 0.5)"/>,
    offsetForward: 0.50
}
export const Memory = () => {
    const {
        pageData,
        page,
        memoryData,
        memoryDataRow,
        handleUpdateLogicalAddres,
        shift,
        screenWidth,
        updateMemory,
        tablePageRow
    } = useMemory();

    return (
        <Grid2 container className='mx-10'>
            <Grid2 item className="space-y-3">
                <Grid2 item size={6} display="flex" justifyContent="center" alignItems="center">
                    <div className="w-full">
                        <Typography className='pr-2'>Endereço lógico:</Typography>
                        <TextField
                            onKeyPress={(event) => {
                                if (!/[01]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            onChange={handleUpdateLogicalAddres}
                            inputProps={{maxLength: 8}}
                            id='logic-adr'
                            className='w-full'
                        />
                    </div>
                </Grid2>
                <Grid2 item>
                    <Paper elevation={3}>
                        <Table id='p1tb'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Página</TableCell>
                                    <TableCell>Quadro</TableCell>
                                    <TableCell>Validade</TableCell>
                                    <TableCell>Histórico</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pageData.map(it => (
                                    <TableRow id={`page-${it.key}`} key={it.key}>
                                        <TableCell className='text-center'>{it.page}</TableCell>
                                        <TableCell className='text-center'>{it.quadro}</TableCell>
                                        <TableCell id={`valid-${it.key}`}
                                                   className='text-center'>{it.validade}</TableCell>
                                        <TableCell id={`historico-${it.key}`}
                                                   className='text-center'>{it.historico}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid2>
            </Grid2>
            <Grid item container direction="column" alignItems="center">
                {/*

<Grid2 item display="flex"  justifyContent="center" size={6}>
                    <div>
                        <Typography className='pr-2' id='physic-adr-label'>Endereço físico:</Typography>
                        <TextField
                            disabled
                            value={shift ? `${memoryDataRow?.quadro}${shift}` : ''}
                            id='physic-adr'
                            className='w-[250px]'
                        />
                    </div>
                </Grid2>
                <Grid item>
                    <Paper elevation={3}>
                        <Table id='memory'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Decimal</TableCell>
                                    <TableCell>Quadro</TableCell>
                                    <TableCell>Livre</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {memoryData.map(it => (
                                    <TableRow key={it.key}>
                                        <TableCell id={`memory-${it.key}`} className='text-center'>{it.key}</TableCell>
                                        <TableCell id={`quadro-${it.key}`} className='text-center'>{it.quadro}</TableCell>
                                        <TableCell id={`free-${it.key}`} className={twMerge(it.livre ? 'text-green-700' : 'text-red-700', 'text-center')}>{it.livre ? 'Sim' : 'Não'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>

                <Grid item className='mt-20'>
                    <Paper elevation={3}>
                        <Table id='disc'>
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={2}>Disco</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {memoryData.map(it => (
                                    <TableRow key={it.key}>
                                        <TableCell className='text-center'>--</TableCell>
                                        <TableCell id={`disc-${it.key}`} className='text-center'>---</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>*/}
            </Grid>

            {page && <>
                {/*<Xarrow start={'logic-adr'} end="physic-adr" />
                */}<Xarrow start={'logic-adr'} end={`page-${tablePageRow?.key}`} startAnchor={'left'} endAnchor={"left"}
                           path={"grid"} gridBreak='10%30' headShape={rightArrow}/>
                {/*<Xarrow start={`historico-${tablePageRow?.key}`} end={screenWidth <= 1044 ? 'physic-adr' : 'physic-adr-label'} endAnchor={screenWidth <= 1044 ? 'right' : 'bottom'} path={screenWidth <= 1044 ? "grid" : 'smooth'} gridBreak='-10' startAnchor='right' />
                <Xarrow start={screenWidth <= 1044 ? 'physic-adr-label' : 'physic-adr'} end={screenWidth <= 1044 ? `memory-${memoryDataRow?.key}` : `free-${memoryDataRow?.key}`} endAnchor={screenWidth <= 1044 ? 'left' : 'right'} startAnchor={screenWidth <= 1044 ? 'bottom' : 'right'} gridBreak='10%40' />
            */}</>}
            {updateMemory && <>
                <Xarrow start={'disc'} end="memory" startAnchor={'top'} color='red'/>
                <Xarrow start={'disc'} end="p1tb" startAnchor={screenWidth <= 1044 ? 'right' : "left"} path={"grid"}
                        endAnchor={screenWidth <= 1044 ? 'bottom' : 'right'} color='red'/>
            </>}
        </Grid2>
    );
}
