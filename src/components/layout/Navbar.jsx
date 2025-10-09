import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
import { supabase } from '../../lib/supabaseClient'

export default function Navbar() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b bg-background">
      {/* Left Section */}
      <div className="flex items-center gap-6">
        <Link to="/dashboard" className="text-lg font-bold">
          CollabSuite
        </Link>
        <div className="hidden md:flex items-center gap-4 text-sm font-medium">
          <Link to="/docs" className="hover:text-primary">Docs</Link>
          <Link to="/tasks" className="hover:text-primary">Tasks</Link>
          <Link to="/chat" className="hover:text-primary">Chat</Link>
          <Link to="/video" className="hover:text-primary">Video</Link>
          <Link to="/whiteboard" className="hover:text-primary">Whiteboard</Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <ModeToggle /> {/* optional dark mode toggle */}
        <Avatar>
          <AvatarImage src="/default-avatar.png" alt="user" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </nav>
  )
}
