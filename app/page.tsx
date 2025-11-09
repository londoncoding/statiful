"use client";

import { useState } from "react";
import { Search, TrendingUp, Zap, BarChart3, Users, Award } from "lucide-react";

// Mock player data for demonstration
const mockPlayers = [
  {
    id: 1,
    name: "Erling Haaland",
    team: "Manchester City",
    position: "FW",
    photo: "https://media.api-sports.io/football/players/1100.png",
    stats: {
      goals: 27,
      assists: 5,
      xG: 24.3,
      shotsOnTarget: 62,
      passAccuracy: 74.2,
    }
  },
  {
    id: 2,
    name: "Mohamed Salah",
    team: "Liverpool",
    position: "FW",
    photo: "https://media.api-sports.io/football/players/306.png",
    stats: {
      goals: 18,
      assists: 12,
      xG: 16.7,
      shotsOnTarget: 54,
      passAccuracy: 79.8,
    }
  },
  {
    id: 3,
    name: "Bukayo Saka",
    team: "Arsenal",
    position: "FW",
    photo: "https://media.api-sports.io/football/players/18833.png",
    stats: {
      goals: 14,
      assists: 11,
      xG: 12.8,
      shotsOnTarget: 48,
      passAccuracy: 82.1,
    }
  },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);

  const filteredPlayers = mockPlayers.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.team.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const togglePlayer = (playerId: number) => {
    setSelectedPlayers(prev =>
      prev.includes(playerId)
        ? prev.filter(id => id !== playerId)
        : prev.length < 2
        ? [...prev, playerId]
        : prev
    );
  };

  const selectedPlayerData = mockPlayers.filter(p => selectedPlayers.includes(p.id));

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary-400 text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              <span>Beta - Now Live</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="gradient-text">Broadcast-Quality</span>
              <br />
              Football Statistics
            </h1>
            
            <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto">
              Generate stunning statistical graphics in seconds. 
              <span className="text-foreground font-semibold"> Not hours.</span>
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 glass-card text-sm">
                <TrendingUp className="w-4 h-4 text-pitch-400" />
                <span>Real-time Data</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 glass-card text-sm">
                <BarChart3 className="w-4 h-4 text-primary-400" />
                <span>20+ Templates</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 glass-card text-sm">
                <Award className="w-4 h-4 text-warning-400" />
                <span>Big 5 Leagues</span>
              </div>
            </div>
          </div>

          {/* Player Comparison Interface */}
          <div className="max-w-5xl mx-auto">
            {/* Search Bar */}
            <div className="glass-card p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <Users className="w-6 h-6 text-primary-400" />
                  Compare Players
                </h2>
                <span className="text-sm text-neutral-400">
                  Select up to 2 players
                </span>
              </div>

              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Search for a player or team..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-statiful-darker/50 border border-statiful-border rounded-lg text-foreground placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                />
              </div>

              {/* Player Results */}
              <div className="grid gap-3">
                {filteredPlayers.map((player) => {
                  const isSelected = selectedPlayers.includes(player.id);
                  return (
                    <button
                      key={player.id}
                      onClick={() => togglePlayer(player.id)}
                      disabled={selectedPlayers.length >= 2 && !isSelected}
                      className={`
                        w-full p-4 rounded-lg border-2 transition-all text-left
                        ${isSelected 
                          ? 'bg-primary/10 border-primary shadow-neon' 
                          : 'bg-statiful-darker/30 border-statiful-border hover:border-statiful-border hover:bg-statiful-darker/50'
                        }
                        ${selectedPlayers.length >= 2 && !isSelected ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                      `}
                    >
                      <div className="flex items-center gap-4">
                        {/* Player Photo */}
                        <div className="w-16 h-16 rounded-full bg-statiful-card border-2 border-statiful-border overflow-hidden flex-shrink-0">
                          <img 
                            src={player.photo} 
                            alt={player.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "https://via.placeholder.com/64?text=" + player.name.split(' ')[0];
                            }}
                          />
                        </div>

                        {/* Player Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg text-foreground truncate">
                              {player.name}
                            </h3>
                            <span className="px-2 py-0.5 rounded bg-primary/20 text-primary-400 text-xs font-medium flex-shrink-0">
                              {player.position}
                            </span>
                          </div>
                          <p className="text-neutral-400 text-sm">{player.team}</p>
                        </div>

                        {/* Quick Stats */}
                        <div className="hidden md:flex items-center gap-6 text-sm">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-pitch-400">{player.stats.goals}</div>
                            <div className="text-neutral-500">Goals</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary-400">{player.stats.assists}</div>
                            <div className="text-neutral-500">Assists</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-warning-400">{player.stats.xG}</div>
                            <div className="text-neutral-500">xG</div>
                          </div>
                        </div>

                        {/* Selection Indicator */}
                        {isSelected && (
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-white text-sm font-bold">✓</span>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Comparison Preview */}
              {selectedPlayerData.length === 2 && (
                <div className="pt-6 border-t border-statiful-border">
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedPlayerData.map((player) => (
                      <div key={player.id} className="glass-card-hover p-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-full bg-statiful-card border-2 border-primary/50 overflow-hidden">
                            <img 
                              src={player.photo} 
                              alt={player.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "https://via.placeholder.com/48?text=" + player.name.split(' ')[0];
                              }}
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold">{player.name}</h4>
                            <p className="text-sm text-neutral-400">{player.team}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-neutral-400">Pass Accuracy</span>
                            <span className="font-semibold">{player.stats.passAccuracy}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-400">Shots on Target</span>
                            <span className="font-semibold">{player.stats.shotsOnTarget}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-4 px-6 py-4 bg-primary hover:bg-primary-600 text-white font-semibold rounded-lg transition-all hover:shadow-neon hover:scale-[1.02]">
                    Generate Comparison
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16">
            <div className="glass-card p-6 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="font-semibold text-lg">Instant Export</h3>
              <p className="text-neutral-400 text-sm">
                Generate graphics in 30 seconds instead of 4 hours
              </p>
            </div>

            <div className="glass-card p-6 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-pitch/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-pitch-400" />
              </div>
              <h3 className="font-semibold text-lg">Advanced Stats</h3>
              <p className="text-neutral-400 text-sm">
                xG, progressive passes, physical metrics & more
              </p>
            </div>

            <div className="glass-card p-6 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-warning/20 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-warning-400" />
              </div>
              <h3 className="font-semibold text-lg">Custom Branding</h3>
              <p className="text-neutral-400 text-sm">
                Add your colors, logo, and style to every graphic
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}