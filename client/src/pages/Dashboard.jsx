import { useState } from 'react'
import { Search } from 'lucide-react'
import CandidateCard from './CandidateCard'

const mockCandidates = [
  { id: 1, name: 'John Doe', email: 'john@example.com', score: 85 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', score: 92 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', score: 78 },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', score: 88 },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', score: 95 },
]

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCandidates = mockCandidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Candidate Dashboard</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search candidates..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCandidates.map(candidate => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

