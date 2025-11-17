"use client"

import { useEffect } from "react"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Calendar, MapPin, Clock, LogOut, Droplet, Award, Activity } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

export default function DonorDashboard() {
  const router = useRouter()
  const { user, logout, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading || !user) return null

  const upcomingAppointments = [
    {
      id: 1,
      campaign: "Jornada de Donación UTB",
      location: "Universidad Tecnológica de Bolívar",
      date: "2025-11-20",
      time: "09:00 AM",
      status: "scheduled"
    }
  ]

  const donationHistory = [
    {
      id: 1,
      date: "2025-08-15",
      campaign: "Donación Hospital Universitario",
      volume: "450ml"
    },
    {
      id: 2,
      date: "2025-05-10",
      campaign: "Campaña Cruz Roja",
      volume: "450ml"
    }
  ]

  const donationsOverTime = [
    { month: "Ene", donations: 0 },
    { month: "Feb", donations: 0 },
    { month: "Mar", donations: 0 },
    { month: "Abr", donations: 0 },
    { month: "May", donations: 1 },
    { month: "Jun", donations: 1 },
    { month: "Jul", donations: 1 },
    { month: "Ago", donations: 2 },
    { month: "Sep", donations: 2 },
    { month: "Oct", donations: 2 },
    { month: "Nov", donations: 2 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-orange-50/20">
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
          <h1 className="text-6xl font-bold text-foreground mb-3">
            Hola, {user.full_name}
          </h1>
          <p className="text-lg text-muted-foreground">
            Dashboard de donante
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6 mb-6">
          {/* Giant number card with glassmorphism */}
          <div className="col-span-4 glass-card rounded-3xl shadow-elevated p-12 relative overflow-hidden">
            {/* Decorative gradient blob */}
            <div className="absolute -right-12 -bottom-12 w-56 h-56 bg-gradient-to-br from-primary/20 to-orange-500/10 rounded-full blur-3xl" />
            <div className="absolute -left-8 -top-8 w-40 h-40 bg-gradient-to-br from-red-500/10 to-primary/20 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-bold text-muted-foreground tracking-[0.2em] uppercase">
                  Total Donaciones
                </span>
              </div>
              
              <div className="mb-10">
                <span className="text-[140px] leading-none font-black text-foreground tracking-tight">2</span>
              </div>

              <div className="space-y-5">
                <div className="flex items-baseline gap-4">
                  <span className="text-sm text-muted-foreground">Este año</span>
                  <span className="text-4xl font-bold text-primary">+1</span>
                </div>
                <div className="h-px bg-gradient-to-r from-border to-transparent" />
                <div className="flex items-baseline gap-4">
                  <span className="text-sm text-muted-foreground">Vidas salvadas</span>
                  <span className="text-4xl font-bold text-foreground">6</span>
                </div>
              </div>
            </div>
          </div>

          {/* Next appointment card with gradient background */}
          <div className="col-span-5 glass-card rounded-3xl shadow-elevated p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-orange-500/5" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg flex items-center justify-center backdrop-blur-sm">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <Badge className="bg-primary/10 text-primary border-0 px-4 py-1.5 text-sm font-semibold backdrop-blur-sm">
                  Agendada
                </Badge>
              </div>
              
              <div className="mb-8">
                <div className="text-[10px] font-bold text-muted-foreground tracking-[0.2em] uppercase mb-3">
                  Próxima Cita
                </div>
                <div className="text-7xl font-black text-foreground mb-2">Nov</div>
                <div className="text-8xl font-black text-primary leading-none">20</div>
              </div>

              <div className="space-y-4 pt-6 border-t border-border/50">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm text-foreground leading-relaxed font-medium">
                    Universidad Tecnológica de Bolívar
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm text-foreground font-medium">09:00 AM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Blood type circular card */}
          <div className="col-span-3 glass-card rounded-3xl shadow-elevated p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
            
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-8">
                <Droplet className="h-5 w-5 text-primary" />
                <span className="text-[10px] font-bold text-muted-foreground tracking-[0.2em] uppercase">
                  Tipo Sangre
                </span>
              </div>
              
              <div className="flex-1 flex items-center justify-center">
                <div className="relative">
                  {/* Circular progress with glassmorphism */}
                  <svg className="w-44 h-44 -rotate-90" viewBox="0 0 100 100">
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
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
                      strokeWidth="4"
                      className="text-border/30"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="url(#progressGradient)"
                      strokeWidth="4"
                      strokeDasharray={`${(2/3) * 264} 264`}
                      strokeLinecap="round"
                      className="drop-shadow-lg"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-black text-primary mb-1">O+</span>
                    <span className="text-xs text-muted-foreground font-semibold">Universal</span>
                  </div>
                </div>
              </div>

              <div className="text-center pt-4 border-t border-border/50">
                <span className="text-2xl font-bold text-foreground">2/3</span>
                <span className="text-xs text-muted-foreground ml-2">a Bronce</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8 glass-card rounded-3xl shadow-elevated p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h3 className="text-3xl font-bold text-foreground mb-2">Historial de donaciones</h3>
                  <p className="text-sm text-muted-foreground">Actividad en el último año</p>
                </div>
                <Button asChild size="lg" className="shadow-lg">
                  <Link href="/donor/campaigns">Agendar cita</Link>
                </Button>
              </div>

              {/* Smooth area chart with gradient fill */}
              <div className="relative h-72 mb-10">
                <svg className="w-full h-full" viewBox="0 0 600 250" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.02" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Area with gradient */}
                  <path
                    d="M 0,250 L 0,220 Q 50,220 100,215 T 200,200 Q 250,200 300,175 T 400,150 Q 450,150 500,130 T 600,115 L 600,250 Z"
                    fill="url(#chartGradient)"
                  />
                  
                  {/* Smooth line with glow effect */}
                  <path
                    d="M 0,220 Q 50,220 100,215 T 200,200 Q 250,200 300,175 T 400,150 Q 450,150 500,130 T 600,115"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#glow)"
                  />
                  
                  {/* Data points with subtle animation potential */}
                  <circle cx="200" cy="200" r="6" fill="hsl(var(--primary))" className="drop-shadow-md" />
                  <circle cx="400" cy="150" r="6" fill="hsl(var(--primary))" className="drop-shadow-md" />
                </svg>

                <div className="flex justify-between text-xs text-muted-foreground mt-6 px-4">
                  {donationsOverTime.map((item, i) => (
                    <span key={i} className="font-medium">{item.month}</span>
                  ))}
                </div>
              </div>

              {/* History cards */}
              <div className="space-y-3">
                {donationHistory.map((donation) => (
                  <div
                    key={donation.id}
                    className="flex items-center justify-between p-6 rounded-2xl glass-card hover:shadow-elevated transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-all">
                        <Heart className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground mb-1 text-lg">{donation.campaign}</p>
                        <p className="text-sm text-muted-foreground font-medium">{donation.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{donation.volume}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats cards with glassmorphism */}
          <div className="col-span-4 space-y-6">
            <div className="glass-card rounded-3xl shadow-elevated p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <Award className="h-7 w-7 text-primary" />
                  </div>
                  <div className="text-xs px-3 py-1.5 rounded-full glass text-primary font-bold">
                    Activo
                  </div>
                </div>
                <div className="text-5xl font-black text-foreground mb-2">Bronce</div>
                <p className="text-sm text-muted-foreground font-medium">Nivel de donante</p>
                
                <div className="mt-8 pt-8 border-t border-border/50">
                  <div className="text-[10px] font-bold text-muted-foreground tracking-[0.2em] uppercase mb-4">
                    Progreso a Plata
                  </div>
                  <div className="h-3 bg-muted/50 rounded-full overflow-hidden backdrop-blur-sm mb-3">
                    <div className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full shadow-lg" style={{ width: '40%' }} />
                  </div>
                  <div className="text-sm text-muted-foreground font-semibold">
                    <span className="text-foreground">2</span> de <span className="text-foreground">5</span> donaciones
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-3xl shadow-elevated p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-500/10 flex items-center justify-center mb-6">
                  <Activity className="h-7 w-7 text-orange-600" />
                </div>
                <div className="text-5xl font-black text-foreground mb-2">56</div>
                <p className="text-sm text-muted-foreground mb-6 font-medium">Días desde última donación</p>
                
                <div className="pt-6 border-t border-border/50">
                  <p className="text-[10px] font-bold text-muted-foreground tracking-[0.2em] uppercase mb-2">
                    Próxima donación disponible
                  </p>
                  <p className="text-lg font-bold text-primary">En 4 días</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
