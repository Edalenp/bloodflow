"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from 'next/navigation'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, ArrowLeft, CheckCircle2, Bell, LogOut } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { api } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'

export default function AppointmentDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const { user, logout } = useAuth()
  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [medicalCheckData, setMedicalCheckData] = useState({
    pressure: '',
    weight: '',
    temperature: '',
    pulse: '',
    apto: 'yes',
    observations: '',
    answers: {
      has_cold: false,
      recent_surgery: false,
      medication: false,
      tattoo: false
    }
  })
  
  const [donationData, setDonationData] = useState({
    volume: '450',
    bag_id: '',
    result: 'success',
    observations: ''
  })

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }
    if (user.role !== "medical_staff") {
      router.push("/login")
      return
    }
  }, [router, user])

  if (!user) return null

  const appointment = {
    id: params.id,
    donor: "Juan Pérez",
    blood_type: "O+",
    document: "1029384756",
    phone: "3001234567",
    age: 35,
    last_donation: "2025-08-15"
  }

  const handleSubmitEvaluation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await api.medical.createMedicalCheck({
        appointment_id: params.id as string,
        vitals: {
          pressure: medicalCheckData.pressure,
          weight: parseFloat(medicalCheckData.weight)
        },
        answers: medicalCheckData.answers,
        apto: medicalCheckData.apto === 'yes',
        observations: medicalCheckData.observations
      })
      
      toast({
        title: "Evaluación registrada",
        description: "La evaluación médica ha sido registrada exitosamente"
      })
      
      setCompleted(true)
      setTimeout(() => {
        router.push("/medical/dashboard")
      }, 2000)
    } catch (error: any) {
      console.error('[v0] Medical check error:', error)
      toast({
        title: "Error",
        description: error.message || "No se pudo registrar la evaluación",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRegisterDonation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await api.medical.createDonation({
        appointment_id: params.id as string,
        donor_id: "donor_01", // This should come from appointment data
        campaign_id: "camp_001", // This should come from appointment data
        volume_ml: parseInt(donationData.volume),
        blood_type: appointment.blood_type,
        collector_id: user.id,
        observations: donationData.observations
      })
      
      toast({
        title: "Donación registrada",
        description: "La donación ha sido registrada y el inventario actualizado"
      })
      
      setTimeout(() => {
        router.push("/medical/dashboard")
      }, 2000)
    } catch (error: any) {
      console.error('[v0] Donation registration error:', error)
      toast({
        title: "Error",
        description: error.message || "No se pudo registrar la donación",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-12 pb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">¡Proceso completado!</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              Los datos han sido registrados exitosamente en el sistema.
            </p>
            <Button asChild className="w-full">
              <Link href="/medical/dashboard">Volver al dashboard</Link>
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

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-8">
        <Button asChild variant="ghost" className="mb-6" size="sm">
          <Link href="/medical/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al dashboard
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Donor Info Sidebar */}
          <div className="lg:col-span-1">
            <Card className="lg:sticky lg:top-6">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Información del donante</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center text-xl sm:text-2xl font-bold text-primary">
                    {appointment.donor.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm sm:text-base">{appointment.donor}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{appointment.age} años</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Documento:</span>
                    <span className="font-medium text-foreground">{appointment.document}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Teléfono:</span>
                    <span className="font-medium text-foreground">{appointment.phone}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Tipo de sangre:</span>
                    <span className="font-medium text-foreground">{appointment.blood_type}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Última donación:</span>
                    <span className="font-medium text-foreground">{appointment.last_donation}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Medical Evaluation Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Evaluación médica pre-donación</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Completa la evaluación para determinar la aptitud del donante
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitEvaluation} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pressure" className="text-sm">Presión arterial</Label>
                      <Input 
                        id="pressure" 
                        placeholder="120/80" 
                        required 
                        value={medicalCheckData.pressure}
                        onChange={(e) => setMedicalCheckData({...medicalCheckData, pressure: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight" className="text-sm">Peso (kg)</Label>
                      <Input 
                        id="weight" 
                        type="number" 
                        placeholder="68" 
                        required 
                        value={medicalCheckData.weight}
                        onChange={(e) => setMedicalCheckData({...medicalCheckData, weight: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="temperature" className="text-sm">Temperatura (°C)</Label>
                      <Input 
                        id="temperature" 
                        type="number" 
                        step="0.1" 
                        placeholder="36.5" 
                        required 
                        value={medicalCheckData.temperature}
                        onChange={(e) => setMedicalCheckData({...medicalCheckData, temperature: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pulse" className="text-sm">Pulso (lpm)</Label>
                      <Input 
                        id="pulse" 
                        type="number" 
                        placeholder="70" 
                        required 
                        value={medicalCheckData.pulse}
                        onChange={(e) => setMedicalCheckData({...medicalCheckData, pulse: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-sm">Cuestionario de salud</Label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="cold" 
                          checked={medicalCheckData.answers.has_cold}
                          onCheckedChange={(checked) => setMedicalCheckData({
                            ...medicalCheckData, 
                            answers: {...medicalCheckData.answers, has_cold: checked as boolean}
                          })}
                        />
                        <label htmlFor="cold" className="text-xs sm:text-sm text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          ¿Ha tenido resfriado o gripe recientemente?
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="surgery"
                          checked={medicalCheckData.answers.recent_surgery}
                          onCheckedChange={(checked) => setMedicalCheckData({
                            ...medicalCheckData, 
                            answers: {...medicalCheckData.answers, recent_surgery: checked as boolean}
                          })}
                        />
                        <label htmlFor="surgery" className="text-xs sm:text-sm text-foreground leading-none">
                          ¿Ha tenido cirugías en los últimos 6 meses?
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="medication"
                          checked={medicalCheckData.answers.medication}
                          onCheckedChange={(checked) => setMedicalCheckData({
                            ...medicalCheckData, 
                            answers: {...medicalCheckData.answers, medication: checked as boolean}
                          })}
                        />
                        <label htmlFor="medication" className="text-xs sm:text-sm text-foreground leading-none">
                          ¿Está tomando medicamentos actualmente?
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="tattoo"
                          checked={medicalCheckData.answers.tattoo}
                          onCheckedChange={(checked) => setMedicalCheckData({
                            ...medicalCheckData, 
                            answers: {...medicalCheckData.answers, tattoo: checked as boolean}
                          })}
                        />
                        <label htmlFor="tattoo" className="text-xs sm:text-sm text-foreground leading-none">
                          ¿Se ha hecho tatuajes o piercing en el último año?
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">¿Está apto para donar?</Label>
                    <RadioGroup 
                      value={medicalCheckData.apto} 
                      onValueChange={(value) => setMedicalCheckData({...medicalCheckData, apto: value})}
                      required
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="yes" />
                        <Label htmlFor="yes" className="font-normal text-sm">Sí, apto para donación</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="no" />
                        <Label htmlFor="no" className="font-normal text-sm">No apto</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="observations" className="text-sm">Observaciones</Label>
                    <Textarea 
                      id="observations" 
                      placeholder="Notas adicionales sobre la evaluación..."
                      rows={3}
                      className="text-sm"
                      value={medicalCheckData.observations}
                      onChange={(e) => setMedicalCheckData({...medicalCheckData, observations: e.target.value})}
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? "Registrando..." : "Registrar evaluación"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Donation Registration Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Registro de donación</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Completa después de la extracción de sangre
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegisterDonation} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="volume" className="text-sm">Volumen (ml)</Label>
                      <Input 
                        id="volume" 
                        type="number" 
                        placeholder="450" 
                        required 
                        value={donationData.volume}
                        onChange={(e) => setDonationData({...donationData, volume: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bag_id" className="text-sm">ID de bolsa</Label>
                      <Input 
                        id="bag_id" 
                        placeholder="BAG-2025-001" 
                        required 
                        value={donationData.bag_id}
                        onChange={(e) => setDonationData({...donationData, bag_id: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Resultado de la extracción</Label>
                    <RadioGroup 
                      value={donationData.result}
                      onValueChange={(value) => setDonationData({...donationData, result: value})}
                      required
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="success" id="success" />
                        <Label htmlFor="success" className="font-normal text-sm">Exitosa</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="adverse_event" id="adverse" />
                        <Label htmlFor="adverse" className="font-normal text-sm">Evento adverso</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="donation_observations" className="text-sm">Observaciones</Label>
                    <Textarea 
                      id="donation_observations" 
                      placeholder="Detalles sobre la donación..."
                      rows={3}
                      className="text-sm"
                      value={donationData.observations}
                      onChange={(e) => setDonationData({...donationData, observations: e.target.value})}
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? "Registrando..." : "Registrar donación y actualizar inventario"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
