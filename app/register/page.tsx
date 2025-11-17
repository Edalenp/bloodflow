"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, ArrowLeft, AlertCircle } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { useToast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    document_type: 'CC',
    document_number: '',
    birth_date: '',
    phone: '',
    blood_type: ''
  })

  const validateForm = (): boolean => {
    if (!formData.email || !formData.password || !formData.full_name) {
      setError('Email, contraseña y nombre son requeridos')
      return false
    }
    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres')
      return false
    }
    if (!formData.document_number || !formData.birth_date || !formData.phone || !formData.blood_type) {
      setError('Por favor completa todos los campos')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    
    try {
      console.log("[v0] Registration attempt:", { email: formData.email })
      
      await register(formData)
      
      toast({
        title: "¡Cuenta creada!",
        description: "Tu cuenta ha sido creada exitosamente."
      })
      
      router.push("/donor/dashboard")
    } catch (err: any) {
      const errorMessage = err.message || 'Error al registrar'
      setError(errorMessage)
      console.error('[v0] Registration error:', errorMessage)
      
      toast({
        title: "Error al registrar",
        description: errorMessage,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-primary">
            <Heart className="h-5 w-5 sm:h-6 sm:w-6 fill-primary" />
            <span>BloodFlow</span>
          </Link>
          <Button asChild variant="ghost" size="sm">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <Card className="w-full max-w-2xl">
          <CardHeader className="space-y-1 px-4 sm:px-6">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-center">Únete como donante</CardTitle>
            <CardDescription className="text-center text-sm sm:text-base">
              Completa tu información para crear tu cuenta de donante
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Nombre completo</Label>
                  <Input 
                    id="full_name" 
                    placeholder="Juan Pérez" 
                    required 
                    disabled={loading}
                    value={formData.full_name}
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="juan@example.com" 
                    required 
                    disabled={loading}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="document_type">Tipo de documento</Label>
                  <Select 
                    value={formData.document_type}
                    onValueChange={(value) => setFormData({...formData, document_type: value})}
                    disabled={loading}
                  >
                    <SelectTrigger id="document_type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CC">Cédula de ciudadanía</SelectItem>
                      <SelectItem value="CE">Cédula de extranjería</SelectItem>
                      <SelectItem value="PA">Pasaporte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="document_number">Número de documento</Label>
                  <Input 
                    id="document_number" 
                    placeholder="1029384756" 
                    required 
                    disabled={loading}
                    value={formData.document_number}
                    onChange={(e) => setFormData({...formData, document_number: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birth_date">Fecha de nacimiento</Label>
                  <Input 
                    id="birth_date" 
                    type="date" 
                    required 
                    disabled={loading}
                    value={formData.birth_date}
                    onChange={(e) => setFormData({...formData, birth_date: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="3001234567" 
                    required 
                    disabled={loading}
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="blood_type">Tipo de sangre</Label>
                  <Select 
                    value={formData.blood_type}
                    onValueChange={(value) => setFormData({...formData, blood_type: value})}
                    disabled={loading}
                  >
                    <SelectTrigger id="blood_type">
                      <SelectValue placeholder="Selecciona..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    required 
                    disabled={loading}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground">Mínimo 8 caracteres</p>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? "Creando cuenta..." : "Crear cuenta"}
              </Button>

              <p className="text-center text-xs sm:text-sm text-muted-foreground">
                ¿Ya tienes una cuenta?{" "}
                <Link href="/login" className="text-primary hover:underline font-medium">
                  Inicia sesión
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
