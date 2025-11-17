"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Heart, Search, LogOut, ClipboardCheck, Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

export default function MedicalDashboard() {
  const router = useRouter()
  const { user, logout, loading } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (!loading && (!user || user.role !== "medical_staff")) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading || !user) return null

  const todayAppointments = [
    {
      id: 1,
      donor: "Juan Pérez",
      blood_type: "O+",
      time: "09:00 AM",
      status: "scheduled",
      document: "1029384756"
    },
    {
      id: 2,
      donor: "María García",
      blood_type: "A+",
      time: "10:00 AM",
      status: "checked",
      document: "1034567890"
    },
    {
      id: 3,
      donor: "Carlos Rodríguez",
      blood_type: "B-",
      time: "11:00 AM",
      status: "scheduled",
      document: "1045678901"
    },
    {
      id: 4,
      donor: "Ana Martínez",
      blood_type: "AB+",
      time: "12:00 PM",
      status: "completed",
      document: "1056789012"
    }
  ]

  const filteredAppointments = todayAppointments.filter(appointment =>
    appointment.donor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    appointment.document.includes(searchQuery)
  )

  const statusLabels: Record<string, string> = {
    scheduled: "Agendada",
    checked: "Evaluada",
    completed: "Completada"
  }

  const hourlyActivity = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    appointments: i >= 9 && i <= 12 ? Math.floor(Math.random() * 3) + 1 : 0
  }))

  const completedCount = todayAppointments.filter(a => a.status === "completed").length
  const checkedCount = todayAppointments.filter(a => a.status === "checked").length
  const pendingCount = todayAppointments.filter(a => a.status === "scheduled").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/10">
      <header className="glass sticky top-0 z-50 shadow-soft">
        <div className="mx-auto max-w-[1800px] px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            <Heart className="h-6 w-6 fill-primary" />
            <span>BloodFlow</span>
          </Link>
          <Button variant="ghost" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar sesión
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-[1800px] px-8 py-12">
        <div className="mb-12">
          <h1 className="text-6xl font-bold text-foreground mb-3">Panel Médico</h1>
          <p className="text-lg text-muted-foreground">{user.full_name}</p>
        </div>

        <div className="grid grid-cols-12 gap-6 mb-6">
          {/* Giant number with decorative elements */}
          <div className="col-span-5 glass-card rounded-3xl shadow-elevated p-12 relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-gradient-to-br from-primary/15 to-primary/5 rounded-full blur-3xl" />
            <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-10">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-bold text-muted-foreground tracking-[0.2em] uppercase">
                  Citas Programadas Hoy
                </span>
              </div>
              
              <div className="mb-12">
                <span className="text-[160px] leading-none font-black text-foreground tracking-tighter">4</span>
              </div>

              <div className="flex items-center gap-3 text-sm pt-6 border-t border-border/50">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground font-medium">Última actualización: hace 2 min</span>
              </div>
            </div>
          </div>

          {/* Circular progress indicators with glassmorphism */}
          <div className="col-span-7 grid grid-cols-3 gap-6">
            {/* Completed */}
            <div className="glass-card rounded-3xl shadow-elevated p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              
              <div className="relative z-10 flex flex-col items-center h-full justify-between">
                <div className="relative w-36 h-36">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <defs>
                      <linearGradient id="completedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="6"
                      className="text-border/20"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="url(#completedGradient)"
                      strokeWidth="6"
                      strokeDasharray={`${(completedCount/4) * 264} 264`}
                      strokeLinecap="round"
                      className="drop-shadow-lg"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl font-black text-foreground">{completedCount}</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-foreground mb-1">Completadas</div>
                  <div className="text-xs text-muted-foreground font-semibold">
                    {Math.round((completedCount/4)*100)}% del total
                  </div>
                </div>
              </div>
            </div>

            {/* Checked */}
            <div className="glass-card rounded-3xl shadow-elevated p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
              
              <div className="relative z-10 flex flex-col items-center h-full justify-between">
                <div className="relative w-36 h-36">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <defs>
                      <linearGradient id="checkedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="6"
                      className="text-primary/10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="url(#checkedGradient)"
                      strokeWidth="6"
                      strokeDasharray={`${(checkedCount/4) * 264} 264`}
                      strokeLinecap="round"
                      className="drop-shadow-lg"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl font-black text-primary">{checkedCount}</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-foreground mb-1">Evaluadas</div>
                  <div className="text-xs text-muted-foreground font-semibold">
                    {Math.round((checkedCount/4)*100)}% del total
                  </div>
                </div>
              </div>
            </div>

            {/* Pending */}
            <div className="glass-card rounded-3xl shadow-elevated p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent" />
              
              <div className="relative z-10 flex flex-col items-center h-full justify-between">
                <div className="relative w-36 h-36">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="6"
                      className="text-border/20"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="6"
                      strokeDasharray={`${(pendingCount/4) * 264} 264`}
                      className="text-orange-600 drop-shadow-lg"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl font-black text-foreground">{pendingCount}</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-foreground mb-1">Pendientes</div>
                  <div className="text-xs text-muted-foreground font-semibold">
                    {Math.round((pendingCount/4)*100)}% del total
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-3xl shadow-elevated">
          <div className="p-10">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-lg">
                  <ClipboardCheck className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-foreground">Citas del día</h2>
                  <p className="text-sm text-muted-foreground mt-2 font-medium">Gestiona las evaluaciones médicas</p>
                </div>
              </div>
              <div className="relative w-96">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar por nombre o documento..."
                  className="pl-14 h-14 text-base glass-card border-0 shadow-soft"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredAppointments.map((appointment, index) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-8 rounded-2xl glass-card hover:shadow-elevated transition-all duration-300 group"
                >
                  <div className="flex items-center gap-6 flex-1">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center font-black text-primary text-3xl group-hover:from-primary/30 group-hover:to-primary/20 transition-all shadow-lg">
                      {appointment.donor.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-2xl mb-2">{appointment.donor}</p>
                      <p className="text-sm text-muted-foreground font-medium">Doc: {appointment.document}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-10">
                    <div className="text-center">
                      <Badge variant="outline" className="mb-3 border-primary/30 text-primary font-bold text-lg px-4 py-2 glass-card">
                        {appointment.blood_type}
                      </Badge>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
                        <Clock className="h-4 w-4 text-primary" />
                        {appointment.time}
                      </div>
                    </div>

                    <div className="w-40">
                      {appointment.status === "completed" && (
                        <Badge className="w-full justify-center bg-primary/10 text-primary border-0 py-3 glass-card font-bold">
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          {statusLabels[appointment.status]}
                        </Badge>
                      )}
                      {appointment.status === "checked" && (
                        <Badge className="w-full justify-center bg-primary/10 text-primary border-0 py-3 glass-card font-bold">
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          {statusLabels[appointment.status]}
                        </Badge>
                      )}
                      {appointment.status === "scheduled" && (
                        <Badge variant="secondary" className="w-full justify-center py-3 glass-card font-bold">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          {statusLabels[appointment.status]}
                        </Badge>
                      )}
                    </div>

                    <Button asChild size="lg" className="min-w-[140px] shadow-lg">
                      <Link href={`/medical/appointments/${appointment.id}`}>
                        {appointment.status === "scheduled" ? "Evaluar" : "Ver"}
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
