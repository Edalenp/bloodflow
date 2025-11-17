import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, Calendar, Users, Activity, MapPin, Clock, Award, Droplet, TrendingUp } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/5">
        {/* Decorative curved lines */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path
            d="M 0,300 Q 250,200 500,300 T 1000,300"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="10,10"
            fill="none"
            className="text-primary/40"
          />
          <path
            d="M 0,500 Q 300,400 600,500 T 1000,500"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="10,10"
            fill="none"
            className="text-primary/40"
          />
        </svg>
        
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary border border-primary/20">
                <Heart className="h-4 w-4 fill-primary animate-pulse" />
                <span>Tu donación salva vidas</span>
              </div>
              
              <h1 className="text-balance text-5xl font-bold tracking-tight text-foreground lg:text-7xl">
                Cada gota cuenta
              </h1>
              
              <p className="text-pretty text-xl leading-relaxed text-muted-foreground max-w-xl">
                Únete a nuestra comunidad de donantes y sé parte del cambio. Tu sangre puede marcar la diferencia entre la vida y la muerte.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg h-14 px-8 shadow-lg shadow-primary/25">
                  <Link href="/register">
                    <Heart className="h-5 w-5 mr-2" />
                    Conviértete en donante
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg h-14 px-8">
                  <Link href="/login">Iniciar sesión</Link>
                </Button>
              </div>

              {/* Quick stats inline */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">2,500+</div>
                    <div className="text-sm text-muted-foreground">Donantes</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">8,320</div>
                    <div className="text-sm text-muted-foreground">Vidas salvadas</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/diverse-people-volunteering-blood-donation-happy-s.jpg"
                  alt="Donantes de sangre"
                  className="w-full h-[500px] object-cover"
                />
                {/* Overlay card */}
                <div className="absolute bottom-6 left-6 right-6 bg-card/95 backdrop-blur-sm rounded-2xl p-6 border shadow-xl">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Próxima campaña</p>
                      <h3 className="text-xl font-bold text-foreground mb-2">Jornada UTB 2025</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>20 Nov</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>Cartagena</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm">Ver más</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">Nuestro impacto</h2>
            <p className="text-lg text-muted-foreground">Juntos estamos salvando vidas cada día</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="relative overflow-hidden border-primary/20 p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
              <div className="relative">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="text-5xl font-bold text-foreground mb-2">2,500+</div>
                <div className="text-muted-foreground font-medium">Donantes activos</div>
              </div>
            </Card>
            
            <Card className="relative overflow-hidden border-primary/20 p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
              <div className="relative">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-primary fill-primary" />
                </div>
                <div className="text-5xl font-bold text-foreground mb-2">8,320</div>
                <div className="text-muted-foreground font-medium">Vidas salvadas</div>
              </div>
            </Card>
            
            <Card className="relative overflow-hidden border-primary/20 p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
              <div className="relative">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <Activity className="h-8 w-8 text-primary" />
                </div>
                <div className="text-5xl font-bold text-foreground mb-2">45</div>
                <div className="text-muted-foreground font-medium">Campañas activas</div>
              </div>
            </Card>

            <Card className="relative overflow-hidden border-primary/20 p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
              <div className="relative">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <Droplet className="h-8 w-8 text-primary fill-primary" />
                </div>
                <div className="text-5xl font-bold text-foreground mb-2">98.5%</div>
                <div className="text-muted-foreground font-medium">Satisfacción</div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <svg className="absolute bottom-0 right-0 w-1/3 h-1/3 opacity-20" viewBox="0 0 300 300">
          <circle cx="150" cy="150" r="100" stroke="currentColor" strokeWidth="2" strokeDasharray="8,8" fill="none" className="text-primary" />
          <circle cx="150" cy="150" r="70" stroke="currentColor" strokeWidth="2" strokeDasharray="8,8" fill="none" className="text-primary" />
        </svg>

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground mb-4">
              ¿Cómo funciona?
            </h2>
            <p className="text-pretty text-xl text-muted-foreground">
              Donar sangre es fácil, rápido y seguro. Sigue estos simples pasos para comenzar tu viaje como donante.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

            <div className="relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-lg z-10">
                1
              </div>
              <Card className="p-8 h-full pt-12 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-center">Regístrate y agenda</h3>
                <p className="text-muted-foreground leading-relaxed text-center">
                  Crea tu cuenta en minutos y agenda una cita en la campaña más cercana. Selecciona el horario que mejor te convenga.
                </p>
              </Card>
            </div>

            <div className="relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-lg z-10">
                2
              </div>
              <Card className="p-8 h-full pt-12 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                  <Activity className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-center">Evaluación médica</h3>
                <p className="text-muted-foreground leading-relaxed text-center">
                  Nuestro personal médico verificará tu estado de salud y aptitud para donar. Es rápido, seguro y profesional.
                </p>
              </Card>
            </div>

            <div className="relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-lg z-10">
                3
              </div>
              <Card className="p-8 h-full pt-12 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                  <Heart className="h-8 w-8 text-primary fill-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-center">Dona y salva vidas</h3>
                <p className="text-muted-foreground leading-relaxed text-center">
                  La donación toma aproximadamente 10 minutos. Tu sangre será procesada y estará lista para salvar vidas.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-primary/5 rounded-3xl -rotate-3" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl rotate-1">
                <img
                  src="/medical-professional-nurse-with-patient-hospital-c.jpg"
                  alt="Personal médico profesional"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <Award className="h-4 w-4" />
                <span>Confianza y seguridad</span>
              </div>

              <h2 className="text-4xl font-bold text-foreground">
                Profesionales certificados a tu servicio
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Nuestro equipo médico cuenta con años de experiencia y las certificaciones más altas. 
                Tu seguridad y bienestar son nuestra prioridad número uno.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Activity className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Equipamiento de última generación</h3>
                    <p className="text-sm text-muted-foreground">
                      Utilizamos tecnología moderna para garantizar procesos seguros y eficientes
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Atención personalizada</h3>
                    <p className="text-sm text-muted-foreground">
                      Cada donante recibe acompañamiento y seguimiento durante todo el proceso
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_50%)]" />
        <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 1000 1000">
          <path
            d="M 0,400 Q 250,300 500,400 T 1000,400"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="12,12"
            fill="none"
          />
          <path
            d="M 0,600 Q 300,500 600,600 T 1000,600"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="12,12"
            fill="none"
          />
        </svg>
        
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-5 py-2 text-sm font-medium mb-8">
            <Heart className="h-4 w-4 fill-current" />
            <span>Únete a la comunidad</span>
          </div>

          <h2 className="text-balance text-5xl font-bold tracking-tight mb-6">
            ¿Listo para hacer la diferencia?
          </h2>
          <p className="text-pretty text-xl leading-relaxed mb-10 text-primary-foreground/90 max-w-2xl mx-auto">
            Únete a miles de personas que ya están salvando vidas. Tu donación puede ayudar hasta a 3 personas diferentes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg h-14 px-8 shadow-xl hover:scale-105 transition-transform">
              <Link href="/register">
                <Heart className="h-5 w-5 mr-2" />
                Comienza ahora
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg h-14 px-8 bg-transparent border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link href="/donor/campaigns">Ver campañas</Link>
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t border-primary-foreground/20">
            <p className="text-sm text-primary-foreground/80">
              Cada 2 segundos, alguien en el mundo necesita sangre. Tú puedes ser la diferencia.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
