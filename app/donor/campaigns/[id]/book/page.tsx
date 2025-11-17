"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from 'next/navigation'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Heart, Calendar, MapPin, Clock, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { api } from '@/lib/api'
import type { Campaign, CampaignSlot } from '@/types'
import { useAuth } from '@/lib/auth-context'

export default function BookAppointmentPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const { user } = useAuth()
  const [selectedSlot, setSelectedSlot] = useState("")
  const [loading, setLoading] = useState(false)
  const [booked, setBooked] = useState(false)
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [fetchingCampaign, setFetchingCampaign] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }
    
    const fetchCampaign = async () => {
      try {
        const response: any = await api.campaigns.getById(params.id as string)
        setCampaign(response.data)
      } catch (error) {
        console.error('[v0] Error fetching campaign:', error)
        toast({
          title: "Error",
          description: "No se pudo cargar la campaña",
          variant: "destructive"
        })
      } finally {
        setFetchingCampaign(false)
      }
    }
    
    fetchCampaign()
  }, [router, user, params.id, toast])

  const handleBooking = async () => {
    if (!selectedSlot) {
      toast({
        title: "Selecciona un horario",
        description: "Por favor selecciona un horario disponible",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    try {
      await api.appointments.create({
        campaign_id: params.id as string,
        slot_datetime: selectedSlot
      })
      
      setBooked(true)
      toast({
        title: "¡Cita agendada!",
        description: "Recibirás un recordatorio antes de tu cita"
      })
      
      setTimeout(() => {
        router.push("/donor/dashboard")
      }, 2000)
    } catch (error: any) {
      console.error('[v0] Booking error:', error)
      toast({
        title: "Error al agendar",
        description: error.message || "No se pudo agendar la cita",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  if (!user || fetchingCampaign) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Cargando...</p>
      </div>
    )
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-12 pb-8">
            <p className="text-lg text-muted-foreground mb-6">No se encontró la campaña</p>
            <Button asChild>
              <Link href="/donor/campaigns">Volver a campañas</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (booked) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-12 pb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">¡Cita confirmada!</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              Tu cita ha sido agendada exitosamente. Te enviaremos un recordatorio por email.
            </p>
            <Button asChild className="w-full">
              <Link href="/donor/dashboard">Volver al dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4">
          <Link href="/" className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-primary">
            <Heart className="h-5 w-5 sm:h-6 sm:w-6 fill-primary" />
            <span>BloodFlow</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 sm:px-6 py-6 sm:py-8">
        <Button asChild variant="ghost" className="mb-6" size="sm">
          <Link href="/donor/campaigns">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a campañas
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">Selecciona tu horario</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Elige el horario que mejor se ajuste a tu disponibilidad
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedSlot} onValueChange={setSelectedSlot}>
                  <div className="grid grid-cols-2 gap-3">
                    {campaign.slots && campaign.slots.length > 0 ? (
                      campaign.slots.map((slot, index) => (
                        <div key={index}>
                          <RadioGroupItem
                            value={slot.slot_datetime}
                            id={`slot-${index}`}
                            disabled={!slot.available}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={`slot-${index}`}
                            className={`flex items-center justify-center p-3 sm:p-4 rounded-lg border-2 cursor-pointer transition-all text-sm
                              ${!slot.available 
                                ? 'opacity-50 cursor-not-allowed bg-muted' 
                                : 'hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5'
                              }`}
                          >
                            <Clock className="h-4 w-4 mr-2" />
                            <span className="font-medium">{new Date(slot.slot_datetime).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>
                          </Label>
                        </div>
                      ))
                    ) : (
                      <p className="col-span-2 text-center text-muted-foreground py-4">No hay horarios disponibles</p>
                    )}
                  </div>
                </RadioGroup>

                <div className="mt-6 pt-6 border-t">
                  <Button 
                    onClick={handleBooking} 
                    className="w-full" 
                    size="lg"
                    disabled={loading || !selectedSlot}
                  >
                    {loading ? "Agendando..." : "Confirmar cita"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Detalles de la campaña</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">{campaign.title}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {campaign.description}
                  </p>
                </div>

                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{campaign.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4 flex-shrink-0" />
                    <span>{campaign.start_date}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h5 className="font-semibold text-xs sm:text-sm text-foreground mb-2">Recomendaciones:</h5>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Desayuna bien antes de donar</li>
                    <li>Bebe abundante agua</li>
                    <li>Descansa adecuadamente</li>
                    <li>Trae tu documento de identidad</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
