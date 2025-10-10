import { useState, useEffect } from "react"
import {
  Home,
  Inbox,
  Plus,
  FileText,
  Presentation,
  Video,
  Users,
  MoreHorizontal,
  Edit,
  Trash,
} from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SideBar() {
  const [teams, setTeams] = useState([])
  const [open, setOpen] = useState(false)
  const [teamName, setTeamName] = useState("")
  const [editingTeam, setEditingTeam] = useState(null)

  // fetch teams
  const fetchTeams = async () => {
    const { data, error } = await supabase
      .from("teams")
      .select("*")
      .order("created_at", { ascending: true })
    if (!error) setTeams(data)
  }

  useEffect(() => {
    fetchTeams()
  }, [])

  // create team
  const handleCreateTeam = async () => {
    if (!teamName.trim()) return
    const { data, error } = await supabase
      .from("teams")
      .insert([{ name: teamName }])
      .select()
    if (!error && data?.length) {
      setTeams((prev) => [...prev, data[0]])
      setTeamName("")
      setOpen(false)
    } else console.error(error)
  }

  // delete team
  const handleDeleteTeam = async (id) => {
    const { error } = await supabase.from("teams").delete().eq("id", id)
    if (!error) setTeams((prev) => prev.filter((t) => t.id !== id))
  }

  // rename team
  const handleRenameTeam = async (id, newName) => {
    if (!newName.trim()) return
    const { error } = await supabase.from("teams").update({ name: newName }).eq("id", id)
    if (!error) {
      setTeams((prev) =>
        prev.map((t) => (t.id === id ? { ...t, name: newName } : t))
      )
      setEditingTeam(null)
    }
  }

  const items = [
    { title: "Home", url: "#", icon: Home },
    { title: "Inbox", url: "#", icon: Inbox },
    { title: "Docs", url: "#", icon: FileText },
    { title: "Whiteboard", url: "#", icon: Presentation },
    { title: "VideoConference", url: "#", icon: Video },
  ]

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Collaboration suite</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>

                {/* Create Team Button */}
                <SidebarMenuItem>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <SidebarMenuButton asChild>
                        <button className="w-full flex items-center gap-2">
                          <Plus />
                          <span>Create new Team</span>
                        </button>
                      </SidebarMenuButton>
                    </DialogTrigger>
                    <DialogContent className="bg-zinc-900 border border-zinc-700 text-white rounded-xl">
                      <DialogHeader>
                        <DialogTitle>Create a new Team</DialogTitle>
                        <DialogDescription className="text-zinc-400">
                          Give your team a name to start collaborating.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex flex-col gap-3">
                        <Input
                          value={teamName}
                          onChange={(e) => setTeamName(e.target.value)}
                          placeholder="Team name"
                          className="bg-zinc-800 text-white border-zinc-700"
                        />
                        <Button
                          onClick={handleCreateTeam}
                          className="bg-white text-black cursor-pointer hover:bg-white/80"
                        >
                          Create
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </SidebarMenuItem>

                {/* Teams List */}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <div className="flex items-center gap-2">
                      <Users />
                      <span>Teams</span>
                    </div>
                  </SidebarMenuButton>

                  {teams.length > 0 && (
                    <div className="pl-6 mt-2 space-y-1">
                      {teams.map((team) => (
                        <div
                          key={team.id}
                          className="flex items-center justify-between text-sm text-zinc-700 hover:text-zinc-600"
                        >
                          {editingTeam === team.id ? (
                            <Input
                              autoFocus
                              value={team.name}
                              onChange={(e) =>
                                setTeams((prev) =>
                                  prev.map((t) =>
                                    t.id === team.id ? { ...t, name: e.target.value } : t
                                  )
                                )
                              }
                              onBlur={() => handleRenameTeam(team.id, team.name)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleRenameTeam(team.id, team.name)
                              }}
                              className="bg-zinc-800 border-zinc-700 text-white h-7"
                            />
                          ) : (
                            <a href="#" className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              {team.name}
                            </a>
                          )}

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="p-1 rounded hover:bg-zinc-800">
                                <MoreHorizontal className="w-4 h-4 text-zinc-400" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="bg-zinc-900 border border-zinc-700 text-zinc-200"
                            >
                              <DropdownMenuItem
                                onClick={() => setEditingTeam(team.id)}
                                className="flex items-center gap-2 cursor-pointer"
                              >
                                <Edit className="w-4 h-4" /> Rename
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteTeam(team.id)}
                                className="flex items-center gap-2 text-red-400 cursor-pointer"
                              >
                                <Trash className="w-4 h-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      ))}
                    </div>
                  )}
                </SidebarMenuItem>

                {/* Other Menu Items */}
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
