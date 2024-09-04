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

    const words = ['0000', '0001', '0010', '0011', '0100', '0101', '0110', '0111', '1000', '1001', '1010', '1011', '1100', '1101', '1110', '1111']

    const [page, setPage] = useState()
    const [shift, setShift] = useState()
    const [logicAdr, setLogicAdr] = useState('')
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [pageFault, setPageFault] = useState(false)
    const [steps, setSteps] = useState([])
    const [actualStep, setActualStep] = useState(0)
    const [pageToUpdate, setPageToUpdate] = useState()
    const [selectedMemory, setSelectedMemory] = useState()
    const [victimPage, setVictimPage] = useState()

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleUpdateLogicalAddres = (event) => {
        const logicAdr = event.target.value
        setLogicAdr(logicAdr)
        if (logicAdr.length === 8) {
            setPage(logicAdr.slice(0, 4))
            setShift(logicAdr.slice(4, 8))
        } else {
            setPage(null)
            setShift(null)
            setPageFault(false)
        }
    }

    const selectVictim = () => {
        const filteredPageData = pageData.filter(item => item.validade === 1);
        filteredPageData.sort((a, b) => parseInt(a.historico, 2) - parseInt(b.historico, 2));

        return filteredPageData[0]
    }

    const handleNextStep = () => {
        const step = steps[actualStep]
        const updateHistory = step?.updateHistory
        const updatePage = step?.updatePage
        const updateMemory = step?.updateMemory
        const updateVictim = step?.updateVictim
        const showPhysicAdr = step?.finalStep

        if (updateHistory) {
            const newPageData = pageData.map(it => ({
                ...it,
                historico: (it.key === pageToUpdate.key ? '1' : '0') + it.historico.substring(0, 7)
            }))

            setPageData(newPageData)
        } else if (updatePage) {
            const newPageData = pageData.filter(it => it.key !== pageToUpdate.key)
            newPageData.push({
                ...pageToUpdate,
                quadro: selectedMemory.quadro,
                validade: 1
            })
            setPageData(newPageData.sort((a, b) => a.key - b.key))
        } else if (updateVictim) {
            const updatedVictim = {...victimPage, validade: 0}
            const newPageData = pageData.filter(it => it.key !== victimPage.key)
            newPageData.push(updatedVictim)
            setPageData(newPageData.sort((a, b) => a.key - b.key))
        } else if (selectedMemory && updateMemory) {
            let newMemoryData = memoryData.filter(it => it.key !== selectedMemory.key);
            newMemoryData.push({...selectedMemory, livre: false})
            newMemoryData = newMemoryData.sort((a, b) => a.key - b.key)
            setMemoryData([...newMemoryData])
        }

        if (showPhysicAdr) {
            setLogicAdr('')
            setSteps([])
            setActualStep(0)
            setVictimPage(null)
            setPageToUpdate(null)
            setSelectedMemory(null)
        } else {
            setActualStep(actualStep + 1)
        }
    }

    const handlePreviousStep = () => {
        const step = steps[actualStep]
        const updatePage = step?.updatePage
        const updateMemory = step?.updateMemory
        const updateVictim = step?.updateVictim

        if (updatePage) {
            const newPageData = pageData.filter(it => it.key !== pageToUpdate.key)
            newPageData.push(pageToUpdate)
            setPageData(newPageData.sort((a, b) => a.key - b.key))
        } else if (updateVictim) {
            const newPageData = pageData.filter(it => it.key !== victimPage.key)
            newPageData.push(victimPage)
            setPageData(newPageData.sort((a, b) => a.key - b.key))
        } else if (selectedMemory && updateMemory) {
            let newMemoryData = memoryData.filter(it => it.key !== selectedMemory.key);
            newMemoryData.push(selectedMemory)
            newMemoryData = newMemoryData.sort((a, b) => a.key - b.key)
            setMemoryData([...newMemoryData])
        }

        setActualStep(actualStep - 1)
    }

    useEffect(() => {
        setActualStep(0)
        const steps = []
        if (page) {
            const selectedPage = pageData.find(it => it.page === page)
            const freeMemoryCell = memoryData.find(it => it.livre)
            const victimPage = selectVictim()

            steps.push({
                text: 'A partir do endereço lógico realiza-se a busca na tabela de páginas para verificar se ela está na memória principal.',
                arrows: {page: true},
            })

            if (selectedPage?.quadro === '---' && freeMemoryCell) {
                setSelectedMemory(freeMemoryCell)
                steps.push(...[{
                    text: 'A página não se encontra na memoria, visto que o bit de validade do registro na tabela de páginas é 0',
                    arrows: {page: true},
                }, {
                    text: 'Dessa forma, é necessário busca-lá na memória principal.',
                    arrows: {page: true},
                    pageFault: true,
                }
                ])
            } else if (!selectedPage.validade) {
                setVictimPage(victimPage)
                const memoryToUpdate = memoryData.find(it => it.quadro === victimPage.quadro)
                setSelectedMemory(memoryToUpdate)

                steps.push(...[{
                    text: 'Como todas as células da memória principal encontram-se ocupadas, deve-se encontrar um quadro vítima para alocar a nova página na memória.',
                    arrows: {page: true},
                    pageFault: true,
                }, {
                    text: 'Para isso, deve-se selecionar a página menos utilizada recentemente com base no histórico dela.',
                    arrows: {page: true},
                    pageFault: true,
                }, {
                    text: `Nesse caso, a página ${victimPage.page} foi a escolhida, com histórico ${victimPage.historico}`,
                    arrows: {page: true},
                    pageFault: true,
                }, {
                    text: `Com a página vítima definida, atualiza-se o bit de validade dela.`,
                    arrows: {page: true},
                    pageFault: true,
                    updateVictim: true
                }])
            } else {
                const selectedMemory = memoryData.find(it => it.quadro === selectedPage.quadro)
                setSelectedMemory(selectedMemory)
            }
            if (!selectedPage.validade) {
                steps.push(...[{
                    text: 'Após isso, deve-se atualiza a página indicando em qual quadro ela está localizada, bem como o seu bit de validade.',
                    arrows: {page: true},
                    pageFault: true,
                    updatePage: true,
                }, {
                    text: 'Deve-se atualizar também a memória secundária.',
                    arrows: {page: true},
                    pageFault: true,
                    updateMemory: true,
                }])
            } else {
                steps.push({
                    text: 'Como a página encontra-se na tabela de páginas basta busca-la, de maneira direta, na memória principal a partir do quadro indicado.',
                    arrows: {page: true, history: true, physic: true},
                    pageFault: !selectedPage.validade,
                    showPhysicAdr: true
                })
            }

            steps.push({
                text: 'Após isso, deve-se atualizar o histórico de cada página, registrando o quão frequente o seu uso tem sido.',
                arrows: {page: true, history: Boolean(selectedPage.validade), physic: Boolean(selectedPage.validade)},
                pageFault: !selectedPage.validade,
                updateHistory: true,
                showPhysicAdr: Boolean(selectedPage.validade)
            })

            steps.push({
                text: 'Por fim, torna-se possível montar o endereço físico final.',
                arrows: {page: true, history: true, physic: true},
                pageFault: !selectedPage.validade,
                showPhysicAdr: true,
                finalStep: true
            })

            setPageToUpdate(selectedPage)
        }
        setSteps(steps)

    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById('stepControl');
            const offset = window.pageYOffset;
            element.style.transform = `translateY(${offset}px)`;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const showPhysicAdr = steps[actualStep]?.showPhysicAdr && selectedMemory
    const physicAdr = showPhysicAdr ? `${selectedMemory?.quadro}${shift}` : ''


    return {
        pageData,
        page,
        logicAdr,
        memoryData,
        memoryToUpdate: selectedMemory,
        handleUpdateLogicalAddres,
        shift,
        screenWidth,
        pageToUpdate,
        pageFault,
        steps,
        actualStep,
        handleNextStep,
        handlePreviousStep,
        physicAdr,
        words,
    }
}