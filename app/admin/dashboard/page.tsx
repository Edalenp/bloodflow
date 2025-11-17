"use client"

import { useEffect } from "react"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Calendar, Users, LogOut, Package, TrendingUp, Activity, Droplet } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

export default function AdminDashboard() {
  const router = useRouter()
  const { user, logout, loading } = useAuth()

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading || !user) return null

  const campaigns = [
    {
      id: 1,
      title: "Jornada de Donación UTB",
      date: "2025-11-20",
      registered: 27,
      capacity: 50
    },
    {
      id: 2,
      title: "Donación Hospital Universitario",
      date: "2025-11-22",
      registered: 25,
      capacity: 40
    },
    {
      id: 3,
      title: "Campaña Cruz Roja Manga",
      date: "2025-11-25",
      registered: 0,
      capacity: 30
    }
  ]

  const inventory = [
    { type: "O+", units: 12, status: "good" },
    { type: "O-", units: 5, status: "low" },
    { type: "A+", units: 9, status: "good" },
    { type: "A-", units: 3, status: "critical" },
    { type: "B+", units: 4, status: "low" },
    { type: "B-", units: 2, status: "critical" },
    { type: "AB+", units: 6, status: "good" },
    { type: "AB-", units: 2, status: "critical" }
  ]

  const getStatusColor = (status: string) => {
    if (status === "good") return "text-primary"
    if (status === "low") return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusBg = (status: string) => {
    if (status === "good") return "bg-primary/10"
    if (status === "low") return "bg-yellow-600/10"
    return "bg-red-600/10"
  }

  const totalInventory = inventory.reduce((acc, item) => acc + item.units, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/20 to-pink-50/10">
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
          <h1 className="text-6xl font-bold text-foreground mb-3">Panel de Administración</h1>
          <p className="text-lg text-muted-foreground">{user.full_name}</p>
        </div>

        <div className="grid grid-cols-12 gap-6 mb-6">
          {/* Giant inventory number with decorative elements */}
          <div className="col-span-5 glass-card rounded-3xl shadow-elevated p-12 relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-72 h-72 bg-gradient-to-br from-primary/20 to-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute -left-12 -top-12 w-48 h-48 bg-gradient-to-br from-pink-500/10 to-transparent rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-10">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-bold text-muted-foreground tracking-[0.2em] uppercase">
                  Inventario Total
                </span>
              </div>
              
              <div className="mb-12">
                <span className="text-[140px] leading-none font-black text-foreground tracking-tighter">{totalInventory}</span>
                <span className="text-4xl text-muted-foreground font-bold ml-4">unidades</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-24 text-sm text-muted-foreground font-semibold">Buenos</div>
                  <div className="flex-1 h-3 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm shadow-inner">
                    <div className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full shadow-lg" style={{ width: '65%' }} />
                  </div>
                  <div className="w-10 text-lg font-black text-foreground">27</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-sm text-muted-foreground font-semibold">Bajos</div>
                  <div className="flex-1 h-3 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm shadow-inner">
                    <div className="h-full bg-gradient-to-r from-yellow-600 to-yellow-600/80 rounded-full shadow-lg" style={{ width: '21%' }} />
                  </div>
                  <div className="w-10 text-lg font-black text-foreground">9</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-sm text-muted-foreground font-semibold">Críticos</div>
                  <div className="flex-1 h-3 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm shadow-inner">
                    <div className="h-full bg-gradient-to-r from-red-600 to-red-600/80 rounded-full shadow-lg" style={{ width: '16%' }} />
                  </div>
                  <div className="w-10 text-lg font-black text-foreground">7</div>
                </div>
              </div>
            </div>
          </div>

          {/* Metric cards with different glassmorphism treatments */}
          <div className="col-span-7 grid grid-cols-2 gap-6">
            <div className="glass-card rounded-3xl shadow-elevated p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-8 shadow-lg">
                  <Calendar className="h-7 w-7 text-primary" />
                </div>
                <div className="text-7xl font-black text-foreground mb-3">3</div>
                <div className="text-sm text-muted-foreground font-semibold">Campañas activas</div>
              </div>
            </div>

            <div className="glass-card rounded-3xl shadow-elevated p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/10 flex items-center justify-center mb-8 shadow-lg">
                  <Users className="h-7 w-7 text-blue-600" />
                </div>
                <div className="text-7xl font-black text-foreground mb-3">2.5k</div>
                <div className="text-sm text-muted-foreground font-semibold">Total donantes</div>
              </div>
            </div>

            <div className="glass-card rounded-3xl shadow-elevated p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-500/10 flex items-center justify-center mb-8 shadow-lg">
                  <TrendingUp className="h-7 w-7 text-green-600" />
                </div>
                <div className="text-7xl font-black text-foreground mb-3">156</div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600 font-bold">+12%</span>
                  <span className="text-muted-foreground font-medium">vs mes anterior</span>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-3xl shadow-elevated p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/10 flex items-center justify-center mb-8 shadow-lg">
                  <Activity className="h-7 w-7 text-purple-600" />
                </div>
                <div className="text-7xl font-black text-foreground mb-3">87%</div>
                <div className="text-sm text-muted-foreground font-semibold">Tasa de asistencia</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-7 glass-card rounded-3xl shadow-elevated p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-4xl font-bold text-foreground mb-2">Campañas activas</h2>
                  <p className="text-sm text-muted-foreground font-medium">Gestión de jornadas de donación</p>
                </div>
                <Button asChild size="lg" className="shadow-lg">
                  <Link href="/donor/campaigns">Ver todas</Link>
                </Button>
              </div>

              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="p-8 rounded-2xl glass-card hover:shadow-elevated transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground text-2xl mb-3">{campaign.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium">
                          <Calendar className="h-5 w-5 text-primary" />
                          {campaign.date}
                        </div>
                      </div>
                      <Badge className="bg-primary/10 text-primary border-0 px-5 py-2 text-sm font-bold glass-card">
                        Activa
                      </Badge>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-sm mb-4">
                          <span className="text-muted-foreground font-semibold">Inscritos</span>
                          <span className="font-black text-foreground text-2xl">
                            {campaign.registered} / {campaign.capacity}
                          </span>
                        </div>
                        <div className="h-4 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm shadow-inner">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all shadow-lg" 
                            style={{ width: `${(campaign.registered / campaign.capacity) * 100}%` }}
                          />
                        </div>
                        <div className="text-xs text-muted-foreground mt-3 font-semibold">
                          {Math.round((campaign.registered / campaign.capacity) * 100)}% ocupado
                        </div>
                      </div>
                      <Button asChild variant="outline" size="lg" className="glass-card border-0 shadow-soft">
                        <Link href={`/donor/campaigns/${campaign.id}/book`}>Ver</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-5 glass-card rounded-3xl shadow-elevated p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-lg">
                  <Droplet className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-foreground">Inventario</h2>
                  <p className="text-sm text-muted-foreground font-medium">Por tipo de sangre</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {inventory.map((item) => (
                  <div
                    key={item.type}
                    className={`p-6 rounded-2xl glass-card transition-all duration-300 hover:shadow-elevated hover:scale-105 relative overflow-hidden`}
                  >
                    <div className={`absolute inset-0 ${getStatusBg(item.status)} opacity-50`} />
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`text-3xl font-black ${getStatusColor(item.status)}`}>
                          {item.type}
                        </div>
                        <Activity className={`h-5 w-5 ${getStatusColor(item.status)}`} />
                      </div>
                      <div className={`text-6xl font-black ${getStatusColor(item.status)} mb-2 leading-none`}>
                        {item.units}
                      </div>
                      <div className="text-xs text-muted-foreground font-semibold">unidades</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-10 border-t border-border/50 space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <div className="w-5 h-5 rounded-full bg-primary shadow-sm" />
                  <span className="text-muted-foreground font-medium">Bueno (&gt; 8)</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="w-5 h-5 rounded-full bg-yellow-600 shadow-sm" />
                  <span className="text-muted-foreground font-medium">Bajo (4-8)</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="w-5 h-5 rounded-full bg-red-600 shadow-sm" />
                  <span className="text-muted-foreground font-medium">Crítico (&lt; 4)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
