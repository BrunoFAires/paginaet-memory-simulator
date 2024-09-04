import {
    Button,
    Grid2,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography
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
        memoryToUpdate,
        handleUpdateLogicalAddres,
        screenWidth,
        logicAdr,
        pageToUpdate,
        steps,
        actualStep,
        handleNextStep,
        handlePreviousStep,
        physicAdr,
        words,
        shift
    } = useMemory();

    return (
        <Grid2 justifyContent='center' container className='mx-10 space-y-3' spacing={10}>
            <Grid2 id='stepControl' size={{xs: 12, md: 4}} item
                   className="space-y-3 z-10 bg-[#fff] w-[200px] h-[20px] mt-1">
                <Grid2 item>
                    <div className="w-full bg-[#fff]">
                        <Typography className='pr-2' id='physic-adr-label'>Status:</Typography>
                        {steps.length > 0 && steps[actualStep]?.text}
                    </div>
                    <div className='flex flex-row justify-between bg-[#fff]'>
                        <Button disabled={actualStep === 0} onClick={handlePreviousStep} variant="contained"
                                size='smaill'
                                sx={{textTransform: "none"}}>Voltar</Button>
                        <Button disabled={steps.length === 0 || actualStep === steps.length} onClick={handleNextStep}
                                variant="contained" size='smaill'
                                sx={{textTransform: "none"}}>Avançar</Button>
                    </div>
                </Grid2>
            </Grid2>
            <Grid2 item className="space-y-3">
                <Grid2 item size={6} display="flex" justifyContent="center" alignItems="center">
                    <div className="w-full z-0">
                        <Typography className='pr-2'>Endereço lógico:</Typography>
                        <TextField
                            disabled={steps.length > 0}
                            onKeyPress={(event) => {
                                if (!/[01]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            onChange={handleUpdateLogicalAddres}
                            value={logicAdr}
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
                                        <TableCell align='center'>{it.page}</TableCell>
                                        <TableCell align='center'>{it.quadro}</TableCell>
                                        <TableCell id={`valid-${it.key}`}
                                                   align='center'>{it.validade}</TableCell>
                                        <TableCell id={`historico-${it.key}`}
                                                   align='center'>{it.historico}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid2>
            </Grid2>
            <Grid2 item className="space-y-3">
                <Grid2 item size={6} display="flex" justifyContent="center" alignItems="center">
                    <div className="w-full">
                        <Typography className='pr-2' id='physic-adr-label'>Endereço físico:</Typography>
                        <TextField
                            disabled
                            value={physicAdr}
                            id='physic-adr'
                            className='w-[250px]'
                        />
                    </div>
                </Grid2>
                <Grid2 item>
                    <Paper elevation={3}>
                        <Table id='memory'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Decimal</TableCell>
                                    <TableCell>Quadro</TableCell>
                                    <TableCell>Livre</TableCell>
                                    <TableCell>Delocamento</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {memoryData.map(it => (
                                    <TableRow key={it.key}>
                                        <TableCell  id={`memory-${it.key}`} align='center'>{it.key}</TableCell>
                                        <TableCell  id={`quadro-${it.key}`} align='center'>{it.quadro}</TableCell>
                                        <TableCell  id={`free-${it.key}`}
                                        >
                                            <p className={twMerge(it.livre ? 'text-green-700' : 'text-red-700', 'text-center')}>{it.livre ? 'Sim' : 'Não'}</p>
                                        </TableCell>
                                        <TableCell>
                                            {words.map(it => <p  id={`word-${it}`} className='text-xs text-center'>{it}</p>)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid2>
                <Grid2 item>
                    <Paper elevation={3}>
                        <Table id='disc'>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center' colSpan={2}>Disco</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {memoryData.map(it => (
                                    <TableRow key={it.key}>
                                        <TableCell align='center'>--</TableCell>
                                        <TableCell id={`disc-${it.key}`} align='center'>---</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid2>
            </Grid2>


            {page && <>
                {steps.length > 0 && steps[actualStep].arrows?.logicAdr &&
                    <Xarrow start={'logic-adr'} end="physic-adr" endAnchor={{position: "left", offset: {y: -10}}}
                            path={"grid"}/>}
                {steps.length > 0 && steps[actualStep].arrows?.page &&
                    <Xarrow start={'logic-adr'} end={`page-${pageToUpdate?.key}`} startAnchor={'left'}
                            endAnchor={"left"}
                            path={"grid"} gridBreak='10%25' headShape={rightArrow}/>}
                {steps.length > 0 && steps[actualStep].arrows?.history &&
                    <Xarrow start={`historico-${pageToUpdate?.key}`} end='physic-adr'
                            endAnchor={{position: "left", offset: {y: 15}}}
                            path={screenWidth <= 1044 ? "grid" : 'smooth'} gridBreak='-10' startAnchor='right'/>}
                {steps.length > 0 && steps[actualStep].arrows?.physic &&
                    <Xarrow start='physic-adr' end={`word-${shift}`} path={"grid"} gridBreak='50%70'
                            endAnchor={{position: "right", offset: {x: 0}}}  headShape={rightArrow}/>}
            </>}
            {steps.length > 0 && steps[actualStep].pageFault && <>
                <Xarrow start={'disc'} end="memory" startAnchor={'top'} color='red'/>
                <Xarrow start={'disc'} end={`page-${pageToUpdate?.key}`}
                        startAnchor={screenWidth <= 1044 ? 'right' : "left"} path={"grid"}
                        endAnchor={{position: "right", offset: {y: 10}}} color='red'/>
            </>}
        </Grid2>
    );
}
