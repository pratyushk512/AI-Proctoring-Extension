import { useState } from 'react'
import { Search } from 'lucide-react'
import CandidateCard from './CandidateCard'

import io from 'socket.io-client';

const socket = io('http://localhost:8000');

const candidates = [];

const updateFullScreen = (data) => {
    const { socketId, count } = data;
    const existingCandidate = candidates.find((candidate) => candidate.socketId === socketId);

    if (existingCandidate) {
        existingCandidate.fullScreen = count;
    } else {
        candidates.push({
            socketId,
            fullScreen: count,
        });
    }

    console.log('Updated Candidates:', candidates);
};
socket.on('fullscreenChanged', (data) => {
    console.log('Received fullscreen event:', data);
    updateFullScreen(data);
});

//tabwitch
const updateTabSwitch = (data) => {
  const { socketId, count } = data;
  const existingCandidate = candidates.find((candidate) => candidate.socketId === socketId);

  if (existingCandidate) {
      existingCandidate.tabSwitch = count;
  } else {
      candidates.push({
          socketId,
          tabSwitch: count,
      });
  }

  console.log('Updated Candidates:', candidates);
};
socket.on('tabVisibilityChanged', (data) => {
  console.log('Received fullscreen event:', data);
  updateTabSwitch(data);
});

//focusblur
const updateFocusChange = (data) => {
  const { socketId, count } = data;
  const existingCandidate = candidates.find((candidate) => candidate.socketId === socketId);

  if (existingCandidate) {
      existingCandidate.focus = count;
  } else {
      candidates.push({
          socketId,
          focus: count,
      });
  }

  console.log('Updated Candidates:', candidates);
};
socket.on('windowFocusChanged', (data) => {
  console.log('Received fullscreen event:', data);
  updateFocusChange(data);
});


//copy
const updateCopyEvents = (data) => {
  const { socketId, count } = data;
  const existingCandidate = candidates.find((candidate) => candidate.socketId === socketId);

  if (existingCandidate) {
      existingCandidate.copy = count;
  } else {
      candidates.push({
          socketId,
          copy: count,
      });
  }

  console.log('Updated Candidates:', candidates);
};
socket.on('copyEvent', (data) => {
  console.log('Received fullscreen event:', data);
  updateCopyEvents(data);
});

//paste
const updatePasteEvents = (data) => {
  const { socketId, count } = data;
  const existingCandidate = candidates.find((candidate) => candidate.socketId === socketId);

  if (existingCandidate) {
      existingCandidate.paste = count;
  } else {
      candidates.push({
          socketId,
          paste: count,
      });
  }

  console.log('Updated Candidates:', candidates);
};
socket.on('pasteEvent', (data) => {
  console.log('Received fullscreen event:', data);
  updatePasteEvents(data);
});

//cut
const updateCutEvents = (data) => {
  const { socketId, count } = data;
  const existingCandidate = candidates.find((candidate) => candidate.socketId === socketId);

  if (existingCandidate) {
      existingCandidate.cut = count;
  } else {
      candidates.push({
          socketId,
          cut: count,
      });
  }
  console.log('Updated Candidates:', candidates);
};
socket.on('cutEvent', (data) => {
  console.log('Received fullscreen event:', data);
  updateCutEvents(data);
});



// const candidates = [
//   {socketId:"12346",tabSwitch:"20",focus:"7",copy:"2",paste:"4",cut:"5",fullScreen:"6",score:"7"},
//   {socketId:"9997",tabSwitch:"7",focus:"2",copy:"3",paste:"4",cut:"5",fullScreen:"6",score:"7"},
//   {socketId:"12346",tabSwitch:"1",focus:"2",copy:"3",paste:"4",cut:"5",fullScreen:"6",score:"7"},
//   {socketId:"12346",tabSwitch:"1",focus:"2",copy:"3",paste:"4",cut:"5",fullScreen:"6",score:"7"},
//   {socketId:"12346",tabSwitch:"1",focus:"2",copy:"3",paste:"4",cut:"5",fullScreen:"6",score:"7"},
// ]

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCandidates = candidates.filter(candidate =>
    candidate.socketId.toLowerCase().includes(searchTerm.toLowerCase())
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
              <CandidateCard key={candidate.socketId} candidate={candidate} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

