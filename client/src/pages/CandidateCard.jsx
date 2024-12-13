import { User, Mail, Star } from 'lucide-react'


export default function CandidateCard({ candidate }) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
            <User className="h-6 w-6 text-white" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {candidate.name}
              </dt>
              <dd className="flex items-center text-sm text-gray-900">
                <Mail className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                {candidate.email}
              </dd>
            </dl>
          </div>
        </div>
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-500">Score</div>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="ml-1 text-xl font-semibold text-gray-900">{candidate.score}</span>
            </div>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${candidate.score}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

