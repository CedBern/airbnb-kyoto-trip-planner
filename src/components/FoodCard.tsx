'use client';

import React from 'react';
import { Utensils, Award, CheckCircle2, MapPin } from 'lucide-react';
import { FoodCardItem } from '../data/kyotoMockData';
import Filler from './FillerLine';

interface FoodCardProps {
  data: FoodCardItem;
  simulateMissingField?: boolean;
}

export default function FoodCard({ data, simulateMissingField = false }: FoodCardProps) {
  // If simulateMissingField is active for testing, omit specialtyDish
  const specialtyDish = simulateMissingField ? null : data.specialtyDish;

  return (
    <article
      data-testid="food-card"
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 p-4"
    >
      {/* Top Header: Content on Left + 1. IMAGE SPOT: Right-aligned Circular Avatar */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
              DINING
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs font-semibold text-amber-700">
              <Filler value={data.priceTier} />
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-600 truncate">
              <Filler value={data.cuisineType} />
            </span>
          </div>

          {/* 2. BIGGEST TEXT: Restaurant Name (Uppercase tracking-wider) */}
          <h3 className="text-lg font-extrabold uppercase tracking-wider text-gray-900 leading-snug truncate">
            <Filler value={data.restaurantName} />
          </h3>

          {/* Neighborhood */}
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
            <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            <span className="truncate">
              <Filler value={data.neighborhood} />
            </span>
          </div>
        </div>

        {/* 1. IMAGE SPOT: Right-aligned Circular Avatar */}
        <div className="w-16 h-16 rounded-full overflow-hidden bg-amber-50 flex-shrink-0 border-2 border-amber-400 shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.imageUrl || '/images/karyo.svg'}
            alt={data.restaurantName || 'Kyoto Dining'}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Accolades & Badges (e.g. Michelin Bib Gourmand) */}
      {data.accolades && data.accolades.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
          {data.accolades.map((accolade, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 text-[11px] font-medium bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-md"
            >
              <Award className="w-3 h-3 text-amber-600" />
              {accolade}
            </span>
          ))}
        </div>
      )}

      {/* Specialty Highlight */}
      <div className="mt-2.5 text-xs text-gray-700 bg-gray-50 rounded-lg p-2.5 border border-gray-100 flex items-start gap-2">
        <Utensils className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="min-w-0 flex-1">
          <span className="font-semibold text-gray-900 mr-1">Recommended Tasting:</span>
          <Filler value={specialtyDish} />
        </div>
      </div>

      {/* 3. DISTINCT UI TRAIT: Warm Ochre Confirmed Hold Notification */}
      <div className="mt-3 bg-amber-50/80 border border-amber-200/80 rounded-xl p-2.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5 min-w-0">
          <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
              Weekend Hold Secured
            </span>
            <span className="text-xs font-semibold text-amber-950 truncate block">
              <Filler value={data.reservationSlot} />
            </span>
          </div>
        </div>

        <button
          type="button"
          className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex-shrink-0 ml-2"
        >
          Confirm Table
        </button>
      </div>
    </article>
  );
}
