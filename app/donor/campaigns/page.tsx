"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Heart, Calendar, MapPin, Clock, Users, Search, ArrowLeft, Bell, LogOut } from 'lucide-react'
import { api } from '@/lib/api'
import type { Campaign } from '@/types'
import { useAuth } from '@/lib/auth-context'

export default function CampaignsPage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }
    
    const fetchCampaigns = async () => {
      try {
        const response: any = await api.campaigns.list()
        setCampaigns(response.data || [])
      } catch (error) {
        console.error('[v0] Error fetching campaigns:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchCampaigns()
  }, [router, user])

  if (!user) return null

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-primary">
              <Heart className="h-5 w-5 sm:h-6 sm:w-6 fill-primary" />
              <span className="hidden sm:inline">BloodFlow</span>
            </Link>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" onClick={logout} size="sm">
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Cerrar sesión</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8">
        {/* Back button and header */}
        <div className="mb-6 sm:mb-8">
          <Button asChild variant="ghost" className="mb-4" size="sm">
            <Link href="/donor/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al dashboard
            </Link>
          </Button>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Campañas de donación
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Encuentra una campaña cercana y agenda tu cita
          </p>
        </div>

        {/* Search */}
        <div className="mb-6 sm:mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por nombre o ubicación..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">Cargando campañas...</p>
          </div>
        ) : (
          <>
            {/* Campaigns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {filteredCampaigns.map((campaign) => (
                <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-lg sm:text-xl mb-2">{campaign.title}</CardTitle>
                        <CardDescription className="text-sm sm:text-base">
                          {campaign.description}
                        </CardDescription>
                      </div>
                      {campaign.capacity_available > 0 ? (
                        <Badge className="flex-shrink-0 self-start">
                          {campaign.capacity_available} cupos
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="flex-shrink-0 self-start">
                          Sin cupos
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{campaign.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{campaign.start_date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">
                          {campaign.capacity_available} de {campaign.capacity_total} disponibles
                        </span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button 
                        asChild 
                        className="w-full" 
                        disabled={campaign.capacity_available === 0}
                        size="sm"
                      >
                        <Link href={`/donor/campaigns/${campaign.id}/book`}>
                          {campaign.capacity_available > 0 ? "Agendar cita" : "Sin disponibilidad"}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCampaigns.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-base sm:text-lg text-muted-foreground">
                  No se encontraron campañas con ese criterio de búsqueda
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
