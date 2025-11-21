import { useState, useEffect } from 'react';

const Calculator = () => {
    // Load balance and risk from localStorage, default to empty string
    const [balance, setBalance] = useState<string>(() => {
        return localStorage.getItem('balance') || '';
    });
    const [riskAmount, setRiskAmount] = useState<string>(() => {
        return localStorage.getItem('riskAmount') || '';
    });
    const [entryPrice, setEntryPrice] = useState<string>('');
    const [stopLossPrice, setStopLossPrice] = useState<string>('');
    const [result, setResult] = useState<{
        leverage: number;
        roundedLeverage: number;
        positionSize: number;
        riskPercent: number;
        adjustedBalance: number;
        adjustedPositionSize: number;
        positionType: 'LONG' | 'SHORT';
    } | null>(null);

    // Save balance to localStorage when it changes
    useEffect(() => {
        if (balance) {
            localStorage.setItem('balance', balance);
        }
    }, [balance]);

    // Save risk to localStorage when it changes
    useEffect(() => {
        if (riskAmount) {
            localStorage.setItem('riskAmount', riskAmount);
        }
    }, [riskAmount]);

    const calculate = () => {
        const bal = parseFloat(balance);
        const risk = parseFloat(riskAmount);
        const entry = parseFloat(entryPrice);
        const sl = parseFloat(stopLossPrice);

        // Check if all values are valid numbers
        if (!bal || !risk || !entry || !sl) {
            setResult(null);
            return;
        }

        // Check if entry and stop loss are different
        if (entry === sl) {
            setResult(null);
            return;
        }

        const priceDiff = Math.abs(entry - sl);
        const priceDiffPercent = priceDiff / entry;

        const positionSize = risk / priceDiffPercent;
        const leverage = positionSize / bal;

        // Check for invalid results (Infinity, NaN)
        if (!isFinite(leverage) || !isFinite(positionSize)) {
            setResult(null);
            return;
        }

        // Calculate adjusted balance for rounded leverage
        const roundedLeverage = Math.ceil(leverage);
        const adjustedBalance = positionSize / roundedLeverage;
        const adjustedPositionSize = adjustedBalance * roundedLeverage;

        // Determine position type: LONG if entry > stop loss, SHORT if entry < stop loss
        const positionType = entry > sl ? 'LONG' : 'SHORT';

        setResult({
            leverage: leverage,
            roundedLeverage: roundedLeverage,
            positionSize: positionSize,
            riskPercent: (risk / bal) * 100,
            adjustedBalance: adjustedBalance,
            adjustedPositionSize: adjustedPositionSize,
            positionType: positionType
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
                                    <div className="flex items-center justify-center gap-3 mb-4">
                                        <span className="block text-[#8b9bb4] text-xs uppercase tracking-[0.3em]">Target Leverage</span>
                                        <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider ${result.positionType === 'LONG'
                                            ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/50'
                                            : 'bg-[#ff4d00]/20 text-[#ff4d00] border border-[#ff4d00]/50'
                                            }`}>
                                            {result.positionType}
                                        </span>
                                    </div>
                                    <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#00f0ff] to-[#0080ff] font-['Press_Start_2P'] drop-shadow-[0_0_15px_rgba(0,240,255,0.3)] break-all">
                                        {result.roundedLeverage}x
                                    </div>
                                    <div className="text-sm text-[#8b9bb4] mt-4 font-mono">
                                        Exact: {result.leverage.toFixed(2)}x
                                    </div>
                                </div>

                                <div className="space-y-4 w-full border-t border-[#232d4b] pt-8 mt-8">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#8b9bb4] text-base">Position size</span>
                                        <span className="text-[#eef2f6] text-lg font-mono">${result.positionSize.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#8b9bb4] text-base">Risk exposure</span>
                                        <span className="text-[#ff4d00] text-lg font-mono">{result.riskPercent.toFixed(2)}%</span>
                                    </div>

                                    {/* Show adjustment suggestion only if rounded leverage differs from exact */}
                                    {result.roundedLeverage !== Math.floor(result.leverage) && (
                                        <div className="pt-4 mt-4 border-t border-[#232d4b]/50">
                                            <div className="text-[#00f0ff] text-sm uppercase mb-3 flex items-center gap-2 tracking-wider font-bold">
                                                <span className="w-1.5 h-1.5 bg-[#00f0ff] animate-pulse"></span>
                                                Suggestion for {result.roundedLeverage}x
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-[#8b9bb4] text-base">Adjusted Balance</span>
                                                <span className="text-[#00f0ff] font-mono text-lg">${result.adjustedBalance.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between items-center mt-3">
                                                <span className="text-[#8b9bb4] text-base">Position Size</span>
                                                <span className="text-[#eef2f6] font-mono text-lg">${result.adjustedPositionSize.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center w-full z-10 flex flex-col h-full justify-center">
                                <div className="flex-grow flex flex-col justify-center">
                                    <span className="block text-[#8b9bb4] text-xs uppercase tracking-[0.3em] mb-4">Target Leverage</span>
                                    <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#232d4b] to-[#1a2238] font-['Press_Start_2P'] break-all">
                                        0x
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Calculator;
