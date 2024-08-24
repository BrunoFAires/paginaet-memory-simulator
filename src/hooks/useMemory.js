import {useEffect, useState} from "react";

export const useMemory = () => {
    const [pageData, setPageData] = useState([
        {key: 0, page: '0000', quadro: '---', validade: 0, historico: '00000000'},
        {key: 1, page: '0001', quadro: '---', validade: 0, historico: '00000000'},
        {key: 2, page: '0010', quadro: '---', validade: 0, historico: '00000000'},
        {key: 3, page: '0011', quadro: '---', validade: 0, historico: '00000000'},
        {key: 4, page: '0100', quadro: '---', validade: 0, historico: '00000000'},
        {key: 5, page: '0101', quadro: '---', validade: 0, historico: '00000000'},
        {key: 6, page: '0110', quadro: '---', validade: 0, historico: '00000000'},
        {key: 7, page: '0111', quadro: '---', validade: 0, historico: '00000000'},
        {key: 8, page: '1000', quadro: '---', validade: 0, historico: '00000000'},
        {key: 9, page: '1001', quadro: '---', validade: 0, historico: '00000000'},
        {key: 10, page: '1010', quadro: '---', validade: 0, historico: '00000000'},
        {key: 11, page: '1011', quadro: '---', validade: 0, historico: '00000000'},
        {key: 12, page: '1100', quadro: '---', validade: 0, historico: '00000000'},
        {key: 13, page: '1101', quadro: '---', validade: 0, historico: '00000000'},
        {key: 14, page: '1110', quadro: '---', validade: 0, historico: '00000000'},
        {key: 15, page: '1111', quadro: '---', validade: 0, historico: '00000000'}
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
                historico: '0' + it.historico.substring(0, 7)
            }))

            if (quadroVitima) {
                newPageData = newPageData.filter(it => it.key !== quadroVitima.key)
                quadroVitima = {...quadroVitima, historico: '0' + quadroVitima.historico.substring(0, 7)}
            }

            const updatedRow = {
                ...selectedPage,
                quadro: selectedMemory?.quadro ?? selectedPage?.quadro,
                validade: 1,
                historico: '1' + selectedPage.historico.substring(0, 7)
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

    return {
        pageData,
        page,
        memoryData,
        memoryDataRow,
        handleUpdateLogicalAddres,
        shift,
        screenWidth,
        tablePageRow,
        updateMemory
    }
}