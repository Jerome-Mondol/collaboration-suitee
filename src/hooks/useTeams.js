// src/hooks/useTeams.js
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

export function useTeams(user) {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(false)

  // Fetch teams
  const fetchTeams = async () => {
    if (!user) return
    setLoading(true)
    const { data, error } = await supabase
      .from("teams")
      .select("*")
      .eq("created_by", user.id)
      .order("created_at", { ascending: true })
    if (!error) setTeams(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchTeams()
  }, [user])

  // Create new team
  const createTeam = async (name) => {
    if (!name.trim() || !user) return
    const { data, error } = await supabase
      .from("teams")
      .insert([{ name, created_by: user.id }])
      .select()
    if (!error && data?.length) setTeams((prev) => [...prev, data[0]])
  }

  // Delete team
  const deleteTeam = async (id) => {
    const { error } = await supabase.from("teams").delete().eq("id", id)
    if (!error) setTeams((prev) => prev.filter((t) => t.id !== id))
  }

  // Rename team
  const renameTeam = async (id, newName) => {
    if (!newName.trim()) return
    const { error } = await supabase.from("teams").update({ name: newName }).eq("id", id)
    if (!error) {
      setTeams((prev) =>
        prev.map((t) => (t.id === id ? { ...t, name: newName } : t))
      )
    }
  }

  return { teams, loading, fetchTeams, createTeam, deleteTeam, renameTeam }
}
