import { useState, useEffect } from 'react';

const Calculator = () => {
    const [balance, setBalance] = useState<string>('20');
    const [riskAmount, setRiskAmount] = useState<string>('1');
    const [entryPrice, setEntryPrice] = useState<string>('2');
    const [stopLossPrice, setStopLossPrice] = useState<string>('1');
    const [result, setResult] = useState<{
        leverage: number;
        roundedLeverage: number;
        positionSize: number;
        riskPercent: number;
    } | null>(null);

    const calculate = () => {
        const bal = parseFloat(balance);
        const risk = parseFloat(riskAmount);
        const entry = parseFloat(entryPrice);
        const sl = parseFloat(stopLossPrice);

        if (!bal || !risk || !entry || !sl) return;

        const priceDiff = Math.abs(entry - sl);
        const priceDiffPercent = priceDiff / entry;

        const positionSize = risk / priceDiffPercent;
        const leverage = positionSize / bal;

        setResult({
            leverage: leverage,
            roundedLeverage: Math.ceil(leverage),
            positionSize: positionSize,
            riskPercent: (risk / bal) * 100
        });
    };

    useEffect(() => {
        calculate();
    }, [balance, riskAmount, entryPrice, stopLossPrice]);

    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8">

                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 flex flex-col gap-8">

                    {/* Section 1: Capital */}
                    <div className="tech-border p-6 relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="group">
                                <label className="flex items-center gap-2 text-[#00f0ff] text-xs font-bold font-['Press_Start_2P'] uppercase mb-3">
                                    <span className="w-2 h-2 bg-[#00f0ff]"></span>
                                    Balance
                                </label>
                                <div className="tech-input-container flex items-center">
                                    <span className="pl-4 text-[#232d4b] font-bold">$</span>
                                    <input
                                        type="number"
                                        value={balance}
                                        onChange={(e) => setBalance(e.target.value)}
                                        className="w-full bg-transparent text-[#eef2f6] p-3 focus:outline-none font-mono text-xl"
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="flex items-center gap-2 text-[#ff4d00] text-xs font-bold font-['Press_Start_2P'] uppercase mb-3">
                                    <span className="w-2 h-2 bg-[#ff4d00]"></span>
                                    Risk (1R)
                                </label>
                                <div className="tech-input-container flex items-center">
                                    <span className="pl-4 text-[#232d4b] font-bold">R</span>
                                    <input
                                        type="number"
                                        value={riskAmount}
                                        onChange={(e) => setRiskAmount(e.target.value)}
                                        className="w-full bg-transparent text-[#eef2f6] p-3 focus:outline-none font-mono text-xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Strategy */}
                    <div className="tech-border p-6 relative flex-grow flex flex-col justify-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="group">
                                <label className="flex items-center gap-2 text-[#00f0ff] text-xs font-bold font-['Press_Start_2P'] uppercase mb-3">
                                    <span className="w-2 h-2 bg-[#00f0ff]"></span>
                                    Entry
                                </label>
                                <div className="tech-input-container">
                                    <input
                                        type="number"
                                        value={entryPrice}
                                        onChange={(e) => setEntryPrice(e.target.value)}
                                        className="w-full bg-transparent text-[#eef2f6] p-3 focus:outline-none font-mono text-xl"
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="flex items-center gap-2 text-[#ff4d00] text-xs font-bold font-['Press_Start_2P'] uppercase mb-3">
                                    <span className="w-2 h-2 bg-[#ff4d00]"></span>
                                    Stop Loss
                                </label>
                                <div className="tech-input-container">
                                    <input
                                        type="number"
                                        value={stopLossPrice}
                                        onChange={(e) => setStopLossPrice(e.target.value)}
                                        className="w-full bg-transparent text-[#eef2f6] p-3 focus:outline-none font-mono text-xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 flex">
                    <div className="tech-border p-8 w-full flex flex-col justify-between items-center relative min-h-[300px] bg-[#0b1026]/50">
                        {/* Decorative Lines */}
                        <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[#00f0ff] opacity-20"></div>
                        <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-[#ff4d00] opacity-20"></div>

                        {result ? (
                            <div className="text-center w-full z-10 flex flex-col h-full justify-between">
                                <div className="flex-grow flex flex-col justify-center">
                                    <span className="block text-[#8b9bb4] text-xs uppercase tracking-[0.3em] mb-4">Target Leverage</span>
                                    <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#00f0ff] to-[#0080ff] font-['Press_Start_2P'] drop-shadow-[0_0_15px_rgba(0,240,255,0.3)] break-all">
                                        {result.roundedLeverage}x
                                    </div>
                                </div>

                                <div className="space-y-4 w-full border-t border-[#232d4b] pt-8 mt-8">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#8b9bb4] text-sm uppercase">Position Size</span>
                                        <span className="text-[#eef2f6] text-xl font-mono">${result.positionSize.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#8b9bb4] text-sm uppercase">Risk Exposure</span>
                                        <span className="text-[#ff4d00] text-xl font-mono">{result.riskPercent.toFixed(2)}%</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-[#232d4b] text-center font-['Press_Start_2P'] text-sm animate-pulse m-auto">
                                SYSTEM READY
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Calculator;
