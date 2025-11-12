import React from 'react'
import Link from 'next/link'
import { Radar, ShieldCheck, Workflow } from 'lucide-react'

export default function Home() {
  const stats = [
    { label: 'Threats blocked this week', value: '1,248' },
    { label: 'Average response time', value: '3.2 min' },
    { label: 'Endpoints monitored', value: '862' },
  ]

  const features = [
    {
      title: 'Unified Threat Monitoring',
      description:
        'Aggregate telemetry from cloud, network, and endpoint sources into a single command center with live correlation.',
      icon: Radar,
    },
    {
      title: 'Automated Incident Response',
      description:
        'Trigger playbooks that isolate assets, notify stakeholders, and assign remediation tasks in seconds.',
      icon: Workflow,
    },
    {
      title: 'Continuous Compliance',
      description:
        'Map controls to frameworks like SOC 2, ISO 27001, and NIST and stay audit-ready with real-time drift detection.',
      icon: ShieldCheck,
    },
  ]

  const testimonials = [
    {
      quote:
        'Since adopting SentinelSphere, we reduced mean time to contain by 67% and finally have visibility across every workload.',
      name: 'Alex Cardenas',
      role: 'CISO, Horizon BioLabs',
    },
    {
      quote:
        'The automation library freed our analysts from repetitive tasks so they can focus on proactive threat hunting.',
      name: 'Priya Desai',
      role: 'Director of Security Operations, FinUnity',
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
              SP
            </span>
            <div>
            <span className="font-sans text-lg font-semibold text-foreground">Seagera Security</span>
              <p className="text-sm text-muted-foreground">Security Operations Center</p>
            </div>
          </div>
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#features" className="transition-colors hover:text-foreground">
              Platform
            </a>
            <a href="#testimonials" className="transition-colors hover:text-foreground">
              Customers
            </a>
            <a href="#cta" className="transition-colors hover:text-foreground">
              Request Access
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="#features"
              className="hidden rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-foreground md:inline-flex"
            >
              View Demo
            </Link>
            <Link
              href="/login"
              className="inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              Launch Portal
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 -z-10 bg-primary/5" />
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-24 lg:flex-row lg:items-center">
            <div className="flex-1 space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground backdrop-blur">
                Real-time security posture
              </span>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
                See every signal. Automate every response. Stay ahead of every threat.
              </h1>
              <p className="text-base text-muted-foreground sm:text-lg">
                SentinelSphere unifies detection, orchestration, and compliance into a single console so your security
                teams can move from firefighting to foresight.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
                >
                  Schedule a briefing
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary"
                >
                  Explore capabilities
                </Link>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-4 rounded-3xl border border-border bg-card/70 p-6 shadow-sm backdrop-blur">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-border bg-background/80 p-4 text-center">
                    <div className="text-2xl font-semibold text-foreground">{stat.value}</div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-dashed border-primary/40 bg-background/90 p-6 text-sm text-muted-foreground">
                AI-assisted correlation reveals suspicious lateral movement between finance cloud workloads and on-prem
                identity servers. Recommended action: quarantine affected endpoints and enforce step-up authentication
                for privileged roles.
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-success" />
                Live telemetry is synchronized with your SIEM, SOAR, and endpoint detection platforms.
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mb-12">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">Build a resilient security posture</h2>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground">
              SentinelSphere stitches together intelligence across your entire attack surface, empowering analysts with
              curated insights and automated enforcement.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col gap-4 rounded-3xl border border-border bg-card/80 p-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6" aria-hidden />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>
                <a className="mt-auto text-sm font-semibold text-primary hover:underline" href="#">
                  Learn more →
                </a>
              </div>
            ))}
          </div>
        </section>

        <section id="testimonials" className="border-y border-border bg-secondary/30">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-20 lg:flex-row lg:items-center">
            <div className="flex-1">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">Trusted by modern SOC teams</h2>
              <p className="mt-3 text-base text-muted-foreground">
                Enterprises across finance, healthcare, and critical infrastructure rely on SentinelSphere to deliver
                resilient, audit-ready security operations.
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                  <p className="text-sm italic leading-relaxed text-foreground">“{testimonial.quote}”</p>
                  <div className="mt-4 text-sm font-medium text-muted-foreground">
                    {testimonial.name} · {testimonial.role}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="cta" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="rounded-3xl border border-border bg-primary p-10 text-primary-foreground shadow-lg">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <h2 className="text-3xl font-semibold tracking-tight">Make every security decision grounded in data.</h2>
                <p className="text-sm text-primary-foreground/90">
                  Start a 30-day guided evaluation with our solution architects to tailor SentinelSphere to your mission
                  requirements.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-full bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary transition-transform hover:scale-[1.02]"
                >
                  Talk to sales
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center justify-center rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                >
                  Download overview
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card/50">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SentinelSphere Security. All rights reserved.
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Compliance
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Status
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

