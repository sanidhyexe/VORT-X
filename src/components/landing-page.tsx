
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Zap, Trophy } from 'lucide-react';
import LandingHeader from './layout/landing-header';
import LandingFooter from './layout/landing-footer';
import InteractiveBackgroundElement from './layout/interactive-background-element';

const features = [
    {
      icon: <Users className="h-6 w-6 text-accent" />,
      title: "Connect & Network",
      description: "Find teammates, build squads, and connect with gamers who share your passion.",
    },
    {
      icon: <Zap className="h-6 w-6 text-accent" />,
      title: "AI-Powered Matching",
      description: "Our smart algorithm connects you with compatible players and relevant communities.",
    },
    {
      icon: <Trophy className="h-6 w-6 text-accent" />,
      title: "Showcase Skills",
      description: "Display your achievements, stats, and gaming portfolio to stand out.",
    },
  ];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-white">
      <div className="relative flex min-h-[100vh] flex-col items-center justify-center overflow-hidden">
        <InteractiveBackgroundElement />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-10"></div>
            
        <LandingHeader />
        <main className="relative z-20 container flex flex-1 flex-col items-center justify-center py-28 md:py-40">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <div className="flex flex-col justify-center space-y-4 text-center lg:text-left items-center lg:items-start">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  VORT-X
                </h1>
                <h2 className="text-lg font-bold tracking-tighter sm:text-xl xl:text-2xl/none text-gray-400">
                  The LinkedIn for Gamers
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-lg">
                  Connect with fellow gamers, showcase your skills, and build your gaming network. Where your passion
                  meets opportunity.
                </p>
              </div>
              <div className="flex w-full flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
                <Link href="/games">
                  <Button size="lg" variant="gradient">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/games">
                  <Button variant="outline" size="lg">
                    Explore Platform
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid gap-4">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start space-y-2 rounded-lg bg-secondary/80 p-4 transition-all hover:bg-secondary hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mr-4">
                    {feature.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      <LandingFooter />
    </div>
  );
}
