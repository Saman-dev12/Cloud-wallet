const Swap = () => {
  return (
    <div>
      <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      From
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-lg">
                      <option>SOL</option>
                      <option>USDC</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      To
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-lg">
                      <option>USDC</option>
                      <option>SOL</option>
                    </select>
                  </div>
                  <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                    Preview Swap
                  </button>
                </div>
    </div>
  )
}

export default Swap
