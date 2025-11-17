"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [role, setRole] = useState<"donor" | "medical_staff" | "admin">("donor")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    
    try {
      if (!email || !password) {
        throw new Error('Por favor completa todos los campos')
      }

      await login(email, password, role)
      
      if (role === "medical_staff") {
        router.push("/medical/dashboard")
      } else if (role === "admin") {
        router.push("/admin/dashboard")
      } else {
        router.push("/donor/dashboard")
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Error al iniciar sesión'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/[0.02] to-background flex flex-col relative overflow-hidden">
      <svg className="absolute top-0 right-0 w-1/2 h-1/2 opacity-20" viewBox="0 0 500 500">
        <path
          d="M 0,100 Q 150,50 300,100 T 500,150"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray="8,8"
          fill="none"
          className="text-primary"
        />
        <path
          d="M 0,200 Q 200,150 400,200 T 500,250"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray="8,8"
          fill="none"
          className="text-primary"
        />
      </svg>

      <header className="border-b bg-card/50 backdrop-blur-sm relative z-10">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            <Heart className="h-6 w-6 fill-primary" />
            <span>BloodFlow</span>
          </Link>
          <Button asChild variant="ghost">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
          <div className="hidden md:block space-y-6">
            <div className="space-y-3">
              <h2 className="text-4xl font-bold text-foreground">
                Bienvenido de vuelta
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Accede a tu cuenta para gestionar tus donaciones y salvar vidas.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Agenda fácilmente</h3>
                  <p className="text-sm text-muted-foreground">
                    Reserva tu cita en minutos y elige el horario que mejor te convenga
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Seguimiento completo</h3>
                  <p className="text-sm text-muted-foreground">
                    Consulta tu historial y el impacto de tus donaciones
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Recordatorios automáticos</h3>
                  <p className="text-sm text-muted-foreground">
                    Te avisaremos cuando puedas donar nuevamente
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Card className="w-full shadow-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold text-center">Iniciar sesión</CardTitle>
              <CardDescription className="text-center text-base">
                Ingresa con cualquier correo electrónico
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    placeholder="tu@email.com" 
                    required 
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Contraseña</Label>
                    <Link href="#" className="text-sm text-primary hover:underline">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    name="password"
                    type="password" 
                    placeholder="••••••••" 
                    required 
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tipo de usuario</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      type="button"
                      variant={role === "donor" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setRole("donor")}
                      disabled={loading}
                    >
                      Donante
                    </Button>
                    <Button
                      type="button"
                      variant={role === "medical_staff" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setRole("medical_staff")}
                      disabled={loading}
                    >
                      Médico
                    </Button>
                    <Button
                      type="button"
                      variant={role === "admin" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setRole("admin")}
                      disabled={loading}
                    >
                      Admin
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? "Iniciando sesión..." : "Iniciar sesión"}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  ¿No tienes una cuenta?{" "}
                  <Link href="/register" className="text-primary hover:underline font-medium">
                    Regístrate aquí
                  </Link>
                </p>

              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
