'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, AlertTriangle, RefreshCw, Sparkles, MessageSquare, Compass, Info, Check, Bug } from 'lucide-react';
import { KYOTO_TRIP_PACKS, ItineraryCardItem, StayCardItem, ExperienceCardItem, FoodCardItem, TripItinerary } from '../data/kyotoMockData';
import StayCard from './StayCard';
import ExperienceCard from './ExperienceCard';
import FoodCard from './FoodCard';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text?: string;
  isError?: boolean;
  cards?: [StayCardItem, ExperienceCardItem, FoodCardItem];
  tripTitle?: string;
  tripDates?: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      timestamp: '14:00',
      text: "Konnichiwa! I'm your Kyoto Weekend Trip Planner. Tell me what kind of weekend you'd like, and I'll build you a complete 2-night itinerary for April 11–13, 2025 with a stay, an experience, and a dining reservation."
    },
    {
      id: 'initial-user-msg',
      sender: 'user',
      timestamp: '14:01',
      text: "Plan my Kyoto weekend: April 11–13, 2025 with Zen culture and Michelin dining."
    },
    {
      id: 'initial-assistant-msg',
      sender: 'assistant',
      timestamp: '14:01',
      tripTitle: KYOTO_TRIP_PACKS["higashiyama-zen"].title,
      tripDates: "Friday 11 Apr – Sunday 13 Apr 2025 (2 Nights)",
      text: "Here is your synchronized Kyoto weekend itinerary (Cultural & Zen Heritage Weekend) for April 11–13, 2025. I have bundled your lodging, daytime immersion, and confirmed dinner hold:",
      cards: KYOTO_TRIP_PACKS["higashiyama-zen"].items
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [simulateError, setSimulateError] = useState(false);
  const [simulateEmptyField, setSimulateEmptyField] = useState(false);
  const [activeRequestCount, setActiveRequestCount] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  // Handle sending a request
  const handleSend = (customPrompt?: string) => {
    const textToSend = customPrompt || inputPrompt.trim();
    if (!textToSend || isThinking) return;

    const userMsgId = `user-${Date.now()}`;
    const userMessage: Message = {
      id: userMsgId,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: textToSend
    };

    setMessages(prev => [...prev, userMessage]);
    setInputPrompt('');
    setIsThinking(true);

    // Pick trip option based on request count or prompt keywords
    const lower = textToSend.toLowerCase();
    let selectedTripKey = "higashiyama-zen";
    if (lower.includes('nature') || lower.includes('arashiyama') || activeRequestCount % 3 === 1) {
      selectedTripKey = "arashiyama-nature";
    } else if (lower.includes('tea') || lower.includes('gion') || activeRequestCount % 3 === 2) {
      selectedTripKey = "gion-tea";
    }

    const selectedItinerary: TripItinerary = KYOTO_TRIP_PACKS[selectedTripKey];
    setActiveRequestCount(prev => prev + 1);

    // Thinking delay: ~2000ms as required
    setTimeout(() => {
      setIsThinking(false);

      if (simulateError) {
        // Render friendly error bubble
        const errorMsg: Message = {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isError: true,
          text: "We couldn't generate your Kyoto weekend plan right now. We had trouble connecting to the planner service. Your request is safely saved."
        };
        setMessages(prev => [...prev, errorMsg]);
      } else {
        // Render successful response with 3 cards in order: Stay, Experience, Food
        const successMsg: Message = {
          id: `assistant-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          tripTitle: selectedItinerary.title,
          tripDates: "Friday 11 Apr – Sunday 13 Apr 2025 (2 Nights)",
          text: `Here is your synchronized Kyoto weekend itinerary (${selectedItinerary.title}) for April 11–13, 2025. I have bundled your lodging, daytime immersion, and confirmed dinner hold:`,
          cards: selectedItinerary.items
        };
        setMessages(prev => [...prev, successMsg]);
      }
    }, 2000);
  };

  // Recover from error state when "Try again" is clicked
  const handleTryAgain = () => {
    // Invariant: switch must reset to OFF
    setSimulateError(false);
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      const recoveredItinerary = KYOTO_TRIP_PACKS["higashiyama-zen"];
      const successMsg: Message = {
        id: `recovered-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tripTitle: recoveredItinerary.title,
        tripDates: "Friday 11 Apr – Sunday 13 Apr 2025 (2 Nights)",
        text: "Connection restored! Here is your synchronized Kyoto weekend plan for April 11–13, 2025:",
        cards: recoveredItinerary.items
      };
      setMessages(prev => [...prev, successMsg]);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-gray-50 border-x border-gray-200">
      {/* TOP NAVIGATION / AIRBNB HEADER & TEST CONTROLS */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-3 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FF385C] flex items-center justify-center text-white font-black text-lg shadow-sm">
              京
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm tracking-tight text-gray-900">airbnb</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs font-semibold text-gray-600">Kyoto Weekend Planner</span>
              </div>
              <p className="text-[11px] text-gray-500">Fixed Dates: 11 – 13 Apr 2025 • No Login Required</p>
            </div>
          </div>

          {/* Test Controls (Simulation switches for the 8 UX test guests) */}
          <div className="flex items-center gap-3 bg-gray-100/80 px-3 py-1.5 rounded-xl border border-gray-200">
            {/* Forced Failure Switch */}
            <label
              htmlFor="toggle-simulated-error"
              className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-gray-700"
              title="Force failure to test friendly error state and 'Try again' recovery"
            >
              <input
                type="checkbox"
                id="toggle-simulated-error"
                checked={simulateError}
                onChange={e => setSimulateError(e.target.checked)}
                className="w-4 h-4 text-[#FF385C] rounded border-gray-300 focus:ring-[#FF385C] cursor-pointer"
              />
              <span className={`text-[11px] font-semibold ${simulateError ? 'text-red-600' : 'text-gray-600'}`}>
                Simulate Error {simulateError ? '(ON)' : '(OFF)'}
              </span>
            </label>

            <span className="text-gray-300">|</span>

            {/* Missing Field Demo Toggle */}
            <label
              htmlFor="toggle-empty-field"
              className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-gray-700"
              title="Test filler line ('—') on cards when a field is missing"
            >
              <input
                type="checkbox"
                id="toggle-empty-field"
                checked={simulateEmptyField}
                onChange={e => setSimulateEmptyField(e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded border-gray-300 focus:ring-amber-500 cursor-pointer"
              />
              <span className={`text-[11px] font-semibold ${simulateEmptyField ? 'text-amber-700' : 'text-gray-600'}`}>
                Filler Line Demo {simulateEmptyField ? '(ON)' : '(OFF)'}
              </span>
            </label>
          </div>
        </div>
      </header>

      {/* QUICK SUGGESTION PILLS */}
      <div className="bg-white/60 backdrop-blur-xs border-b border-gray-100 px-4 py-2 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-gray-400 font-medium whitespace-nowrap text-[11px]">Try prompt:</span>
        <button
          type="button"
          disabled={isThinking}
          onClick={() => handleSend("Plan a Zen & Cultural Heritage weekend in Kyoto (Apr 11-13)")}
          className="whitespace-nowrap px-2.5 py-1 rounded-full bg-rose-50 text-[#FF385C] hover:bg-rose-100 border border-rose-200 transition-colors disabled:opacity-50"
        >
          ⛩️ 1. Zen & Cultural Heritage
        </button>
        <button
          type="button"
          disabled={isThinking}
          onClick={() => handleSend("Plan an Arashiyama Bamboo & Nature weekend retreat (Apr 11-13)")}
          className="whitespace-nowrap px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200 transition-colors disabled:opacity-50"
        >
          🎋 2. Arashiyama Nature Retreat
        </button>
        <button
          type="button"
          disabled={isThinking}
          onClick={() => handleSend("Plan a Gion tea craft and alleyway foodie weekend (Apr 11-13)")}
          className="whitespace-nowrap px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 transition-colors disabled:opacity-50"
        >
          🍵 3. Gion Tea Craft (Filler Test)
        </button>
      </div>

      {/* CHAT MESSAGES STREAM */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => {
          if (msg.sender === 'user') {
            return (
              <div key={msg.id} className="flex justify-end">
                <div className="max-w-[85%] bg-gray-900 text-white rounded-2xl rounded-tr-xs px-4 py-3 shadow-xs">
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <span className="text-[10px] text-gray-400 mt-1 block text-right">{msg.timestamp}</span>
                </div>
              </div>
            );
          }

          // Error Bubble State
          if (msg.isError) {
            return (
              <div key={msg.id} className="flex justify-start">
                <div className="max-w-[92%] bg-red-50 border border-red-200 rounded-2xl rounded-tl-xs p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 text-red-600">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-red-950">
                        Couldn&apos;t generate your Kyoto weekend plan
                      </h4>
                      <p className="text-xs text-red-800 mt-1 leading-relaxed">
                        {msg.text}
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          type="button"
                          id="btn-try-again"
                          onClick={handleTryAgain}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FF385C] hover:bg-[#E00B41] text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Try again</span>
                        </button>
                        <span className="text-[11px] text-gray-500">
                          Resets error switch &amp; recovers 3 cards
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // Assistant standard bubble or Cards Response
          return (
            <div key={msg.id} className="flex justify-start">
              <div className="max-w-[96%] space-y-3">
                {/* Intro text */}
                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-xs px-4 py-3 shadow-xs">
                  <p className="text-sm text-gray-800 leading-relaxed">{msg.text}</p>
                  {msg.tripDates && (
                    <div className="mt-2 text-xs font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md inline-block">
                      🗓️ {msg.tripDates}
                    </div>
                  )}
                  <span className="text-[10px] text-gray-400 mt-1 block">{msg.timestamp}</span>
                </div>

                {/* Three Cards in Order: Stay, Experience, Food */}
                {msg.cards && (
                  <div className="space-y-3 pt-1">
                    {/* 1. StayCard */}
                    <StayCard
                      data={msg.cards[0]}
                      simulateMissingField={simulateEmptyField}
                    />

                    {/* 2. ExperienceCard */}
                    <ExperienceCard
                      data={msg.cards[1]}
                      simulateMissingField={simulateEmptyField}
                    />

                    {/* 3. FoodCard */}
                    <FoodCard
                      data={msg.cards[2]}
                      simulateMissingField={simulateEmptyField}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* 2-SECOND THINKING ANIMATION BUBBLE */}
        {isThinking && (
          <div className="flex justify-start animate-fade-in" data-testid="thinking-bubble">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-xs px-4 py-3 shadow-xs flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF385C] animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#008489] animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#D97706] animate-bounce"></span>
              </div>
              <span className="text-xs text-gray-500 font-medium">
                Kyoto Planner is matching stays, experiences &amp; reservations...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* INPUT FORM (LOCKED WHILE THINKING) */}
      <footer className="sticky bottom-0 bg-white border-t border-gray-200 p-3 sm:p-4">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={inputPrompt}
              disabled={isThinking}
              onChange={e => setInputPrompt(e.target.value)}
              placeholder={
                isThinking
                  ? "Input locked while planner is thinking..."
                  : "Type your Kyoto trip request (e.g. Kyoto weekend 11-13 Apr 2025)..."
              }
              className={`w-full px-4 py-3 text-sm rounded-xl border transition-all ${
                isThinking
                  ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-75"
                  : "bg-gray-50 hover:bg-white text-gray-900 border-gray-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent"
              }`}
            />
            {isThinking && (
              <span className="absolute right-3 top-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                Locked
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isThinking || !inputPrompt.trim()}
            className={`p-3 rounded-xl font-bold flex items-center justify-center transition-all ${
              isThinking || !inputPrompt.trim()
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#FF385C] hover:bg-[#E00B41] text-white shadow-sm"
            }`}
            aria-label="Send trip request"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="flex items-center justify-between text-[11px] text-gray-400 mt-2 px-1">
          <span>Airbnb Search Team • Prototype Invariant Validation</span>
          <span>Zero Login • 11–13 Apr 2025</span>
        </div>
      </footer>
    </div>
  );
}
