export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0B1B3A] text-white p-8">
      <h1 className="text-4xl font-bold mb-2">ETHINX Central Hub</h1>
      <p className="text-xl text-gray-400 mb-12">Control center for the entire ETHINX ecosystem</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1e2a47] p-6 rounded-2xl">
          <h2 className="text-yellow-400 text-sm font-semibold">ACTIVE SERVICES</h2>
          <p className="text-5xl font-bold mt-2">14</p>
        </div>
        <div className="bg-[#1e2a47] p-6 rounded-2xl">
          <h2 className="text-yellow-400 text-sm font-semibold">TOTAL USERS</h2>
          <p className="text-5xl font-bold mt-2">8,247</p>
        </div>
        <div className="bg-[#1e2a47] p-6 rounded-2xl">
          <h2 className="text-yellow-400 text-sm font-semibold">REVENUE TODAY</h2>
          <p className="text-5xl font-bold mt-2">$12,459</p>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-gray-400">Dashboard coming online — Greg will take it from here</p>
      </div>
    </div>
  )
}
