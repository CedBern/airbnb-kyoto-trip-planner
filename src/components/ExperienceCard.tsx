'use client';

import React from 'react';
import { Compass, Clock, Users, CalendarCheck2 } from 'lucide-react';
import { ExperienceCardItem } from '../data/kyotoMockData';
import Filler from './FillerLine';

interface ExperienceCardProps {
  data: ExperienceCardItem;
  simulateMissingField?: boolean;
}

export default function ExperienceCard({ data, simulateMissingField = false }: ExperienceCardProps) {
  // If simulateMissingField is active for testing, omit hostName
  const hostName = simulateMissingField ? undefined : data.hostName;

  return (
    <article
      data-testid="experience-card"
      className="bg-white rounded-2xl border border-gray-200 border-l-4 border-l-teal-600 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 p-4"
    >
      {/* HEADER SECTION: Left Square Thumbnail + Title & Details */}
      <div className="flex items-start gap-3.5">
        {/* 1. IMAGE SPOT: Left-aligned Square Thumbnail (w-20 h-20) */}
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-teal-50 flex-shrink-0 border border-teal-200 shadow-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.imageUrl || '/images/zen.svg'}
            alt={data.title || 'Kyoto Experience'}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content next to image */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full">
              EXPERIENCE
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-600 font-medium truncate">
              <Filler value={data.category} />
            </span>
          </div>

          {/* 2. BIGGEST TEXT: Experience Title */}
          <h3 className="text-lg font-extrabold text-gray-900 leading-snug line-clamp-2">
            <Filler value={data.title} />
          </h3>

          {/* Host & Duration meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mt-1.5">
            <span className="flex items-center gap-1">
              <span className="text-gray-400 font-medium">Host:</span>
              <strong className="text-gray-800">
                <Filler value={hostName} />
              </strong>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              <Filler value={data.durationMinutes} suffix=" min" />
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-teal-600" />
              Max <Filler value={data.groupSizeMax} suffix=" guests" />
            </span>
          </div>
        </div>
      </div>

      {/* 3. DISTINCT UI TRAIT: Day-by-Day Weekend Plan Schedule */}
      <div className="mt-3.5 bg-teal-50/70 border border-teal-100 rounded-xl p-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-teal-900 uppercase tracking-wide mb-2">
          <CalendarCheck2 className="w-4 h-4 text-teal-700" />
          <span>Day-by-Day Weekend Plan</span>
        </div>

        <div className="space-y-1.5 text-xs">
          {data.dayByDayPlan && data.dayByDayPlan.length > 0 ? (
            data.dayByDayPlan.map((plan, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-white/80 rounded-lg p-2 border border-teal-100/50">
                <span className="bg-teal-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5">
                  Day {plan.day}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-teal-950">
                      <Filler value={plan.date} />
                    </span>
                    {plan.time && (
                      <span className="text-[10px] text-teal-700 font-medium bg-teal-100 px-1.5 rounded">
                        <Filler value={plan.time} />
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 text-xs mt-0.5 leading-tight">
                    <Filler value={plan.activity} />
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-xs">
              <Filler value={null} />
            </div>
          )}
        </div>
      </div>

      {/* FOOTER: Price & Booking */}
      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
        <div>
          <span className="text-[11px] text-gray-500 uppercase font-semibold">Per Person</span>
          <div className="text-base font-bold text-teal-800">
            &yen;{data.pricePerPerson ? Number(data.pricePerPerson).toLocaleString() : <Filler value={null} />}
            <span className="text-xs font-normal text-gray-500 ml-1">/ session</span>
          </div>
        </div>

        <button
          type="button"
          className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
        >
          Book Experience
        </button>
      </div>
    </article>
  );
}
