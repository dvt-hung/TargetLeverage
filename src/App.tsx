import Calculator from './components/Calculator'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <div className="flex flex-col items-center mb-16">
          <div className="relative animate-float-group">
            {/* BTC Icon - Top Right */}
            <div className="absolute -top-12 -right-16 w-16 h-16 z-10 rounded-full shadow-[0_0_15px_rgba(247,147,26,0.5)]">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg"
                alt="BTC"
                className="w-full h-full rounded-full"
              />
            </div>

            {/* ETH Icon - Bottom Left */}
            <div className="absolute -bottom-8 -left-16 w-14 h-14 z-10 bg-white rounded-full p-1 shadow-[0_0_15px_rgba(98,126,234,0.5)]">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg"
                alt="ETH"
                className="w-full h-full rounded-full"
              />
            </div>

            <h1 className="text-7xl md:text-9xl text-[#eef2f6] drop-shadow-[6px_6px_0_#00f0ff] inline-block relative font-['Press_Start_2P'] tracking-tighter select-none" style={{ fontFamily: '"Press Start 2P", cursive' }}>
              H-IT
            </h1>
          </div>
          <div className="mt-6 relative inline-block">
            {/* Ghost element for fixed width */}
            <p className="text-[#8b9bb4] tracking-[0.2em] text-sm md:text-base uppercase font-bold opacity-0 pr-1">
              LEVERAGE & RISK CALCULATOR
            </p>
            {/* Animated element */}
            <p className="absolute top-0 left-0 text-[#8b9bb4] tracking-[0.2em] text-sm md:text-base uppercase font-bold typing-effect pr-1">
              LEVERAGE & RISK CALCULATOR
            </p>
          </div>
        </div>
        <Calculator />
      </div>
    </div>
  )
}

export default App
