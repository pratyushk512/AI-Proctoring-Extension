import { getRooms } from '@/app/actions/roomActions'
import { CreateRoomForm } from '@/app/components/CreateRoomForm'
import { RoomList } from '@/app/components/RoomList'

export default function AdminDashboard() {
  const rooms = getRooms()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Create New Room</h2>
          <CreateRoomForm />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Existing Rooms</h2>
          <RoomList rooms={rooms} />
        </div>
      </div>
    </div>
  )
}

