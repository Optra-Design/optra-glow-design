
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { Progress } from '../components/ui/progress';
import { Activity, TrendingUp, Zap, BarChart3 } from 'lucide-react';

const Pulse = () => {
  const [metrics, setMetrics] = useState({
    projects: 0,
    clients: 0,
    satisfaction: 0,
    growth: 0
  });

  const [progressValues, setProgressValues] = useState({
    projectCompletion: 0,
    clientRetention: 0,
    skillDevelopment: 0,
    marketPresence: 0,
    teamProductivity: 0,
    qualityScore: 0
  });

  useEffect(() => {
    // Animate counters
    const animateValue = (key: keyof typeof metrics, end: number, duration: number = 2000) => {
      const start = 0;
      const increment = end / (duration / 16);
      let current = start;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          current = end;
          clearInterval(timer);
        }
        setMetrics(prev => ({ ...prev, [key]: Math.round(current) }));
      }, 16);
    };

    // Animate progress bars
    const animateProgress = (key: keyof typeof progressValues, end: number, delay: number = 0) => {
      setTimeout(() => {
        const start = 0;
        const increment = end / (2000 / 16);
        let current = start;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= end) {
            current = end;
            clearInterval(timer);
          }
          setProgressValues(prev => ({ ...prev, [key]: Math.round(current) }));
        }, 16);
      }, delay);
    };

    setTimeout(() => animateValue('projects', 47), 200);
    setTimeout(() => animateValue('clients', 23), 400);
    setTimeout(() => animateValue('satisfaction', 100), 600);
    setTimeout(() => animateValue('growth', 250), 800);

    // Animate progress bars with staggered delays
    setTimeout(() => animateProgress('projectCompletion', 87, 1000), 0);
    setTimeout(() => animateProgress('clientRetention', 95, 1200), 0);
    setTimeout(() => animateProgress('skillDevelopment', 78, 1400), 0);
    setTimeout(() => animateProgress('marketPresence', 82, 1600), 0);
    setTimeout(() => animateProgress('teamProductivity', 91, 1800), 0);
    setTimeout(() => animateProgress('qualityScore', 96, 2000), 0);
  }, []);

  const pulseData = [
    {
      icon: <Activity className="w-8 h-8" />,
      label: "Active Projects",
      value: metrics.projects,
      suffix: "+",
      color: "text-blue-400"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      label: "Happy Clients",
      value: metrics.clients,
      suffix: "+",
      color: "text-green-400"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      label: "Satisfaction Rate",
      value: metrics.satisfaction,
      suffix: "%",
      color: "text-yellow-400"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      label: "Growth Rate",
      value: metrics.growth,
      suffix: "%",
      color: "text-purple-400"
    }
  ];

  const progressData = [
    {
      label: "Project Completion Rate",
      value: progressValues.projectCompletion,
      color: "from-blue-400 to-blue-600",
      description: "On-time delivery performance"
    },
    {
      label: "Client Retention",
      value: progressValues.clientRetention,
      color: "from-green-400 to-green-600",
      description: "Long-term client relationships"
    },
    {
      label: "Skill Development",
      value: progressValues.skillDevelopment,
      color: "from-purple-400 to-purple-600",
      description: "Continuous learning and growth"
    },
    {
      label: "Market Presence",
      value: progressValues.marketPresence,
      color: "from-orange-400 to-orange-600",
      description: "Industry recognition and reach"
    },
    {
      label: "Team Productivity",
      value: progressValues.teamProductivity,
      color: "from-pink-400 to-pink-600",
      description: "Efficiency and output quality"
    },
    {
      label: "Quality Score",
      value: progressValues.qualityScore,
      color: "from-yellow-400 to-yellow-600",
      description: "Design and delivery excellence"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Activity className="w-12 h-12 text-gradient animate-pulse" />
              <h1 className="text-5xl md:text-7xl font-bold text-gradient">
                Studio Pulse
              </h1>
            </div>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              📊 Real-time insights into our studio's heartbeat. 
              Track our journey, growth, and impact in the design world.
            </p>
            <div className="mt-4 text-sm text-foreground/50">
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                ✅ Live Data
              </span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {pulseData.map((metric, index) => (
              <div 
                key={index}
                className="glass p-8 rounded-3xl text-center hover:bg-white/10 transition-all duration-500 glow-hover animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`${metric.color} mb-4 flex justify-center`}>
                  {metric.icon}
                </div>
                <div className="text-4xl font-bold text-gradient mb-2">
                  {metric.value}{metric.suffix}
                </div>
                <div className="text-foreground/70 text-sm">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Progress Metrics */}
          <div className="glass p-8 rounded-3xl mb-16">
            <h2 className="text-3xl font-bold text-gradient mb-8 text-center">
              Performance Metrics
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {progressData.map((item, index) => (
                <div 
                  key={index} 
                  className="space-y-3 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1 + 1}s` }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/90 font-medium">{item.label}</span>
                    <span className="text-gradient font-bold">{item.value}%</span>
                  </div>
                  <Progress 
                    value={item.value} 
                    className="h-3 bg-white/10 overflow-hidden"
                  />
                  <p className="text-sm text-foreground/60">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Current Status */}
          <div className="glass p-8 rounded-3xl mb-16">
            <h2 className="text-3xl font-bold text-gradient mb-8 text-center">
              Current Status
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gradient mb-4">🎯 Focus Areas</h3>
                <ul className="space-y-3 text-foreground/80">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Premium brand identity projects</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Interactive web experiences</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Design system development</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>Creative consultation services</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gradient mb-4">🚀 Recent Milestones</h3>
                <ul className="space-y-3 text-foreground/80">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full"></div>
                    <span>Launched 3 major rebrands this quarter</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                    <span>Expanded service offerings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                    <span>100% client satisfaction maintained</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                    <span>New studio processes implemented</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="text-center glass p-12 rounded-3xl">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              <h2 className="text-3xl font-bold text-gradient">
                Currently Available
              </h2>
            </div>
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              We're actively taking on new projects and would love to hear about your vision. 
              Let's create something extraordinary together.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="mailto:aniketh@optra.me"
                className="group flex items-center gap-2 px-8 py-4 bg-optra-gradient text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 glow-hover"
              >
                Get in Touch
                <Zap className="w-5 h-5 group-hover:animate-bounce" />
              </a>
              
              <div className="text-sm text-foreground/50">
                Response time: Within 48 hours
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pulse;
