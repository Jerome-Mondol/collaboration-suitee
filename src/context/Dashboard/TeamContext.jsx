// src/context/TeamContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '../Auth/AuthContext'

const TeamContext = createContext()

export const TeamProvider = ({ children }) => {
  const { user } = useAuth()
  const [teams, setTeams] = useState([])
  const [currentTeam, setCurrentTeam] = useState(null)

  const fetchTeams = async () => {
    if (!user) return
    const { data, error } = await supabase
      .from('team_members')
      .select('team_id, teams(name, id)')
      .eq('user_id', user.id)
      .order('joined_at', { ascending: true })

    if (!error) {
      const mappedTeams = data.map((t) => t.teams)
      setTeams(mappedTeams)
      if (!currentTeam && mappedTeams.length > 0) setCurrentTeam(mappedTeams[0])
    }
  }

  // Create a new team
  const createTeam = async (name) => {
    if (!user) return
    const { data, error } = await supabase
      .from('teams')
      .insert([{ name, owner: user.id }])
      .select()
      .single()

    if (error) throw error

    // Auto add creator as member
    await supabase.from('team_members').insert([{ team_id: data.id, user_id: user.id, role: 'owner' }])

    await fetchTeams()
    setCurrentTeam(data)
  }

  useEffect(() => {
    fetchTeams()
  }, [user])

  return (
    <TeamContext.Provider value={{ teams, currentTeam, setCurrentTeam, createTeam }}>
      {children}
    </TeamContext.Provider>
  )
}

export const useTeam = () => useContext(TeamContext)
