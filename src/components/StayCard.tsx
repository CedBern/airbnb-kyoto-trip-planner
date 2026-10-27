'use client';

import React, { useState } from 'react';
import { Heart, Star, ShieldCheck, Calendar, MapPin } from 'lucide-react';
import { StayCardItem } from '../data/kyotoMockData';
import Filler from './FillerLine';

interface StayCardProps {
  data: StayCardItem;
  simulateMissingField?: boolean;
}

export default function StayCard({ data, simulateMissingField = false }: StayCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  // If simulateMissingField is active for testing, omit reviewsCount
  const reviewsCount = simulateMissingField ? null : data.reviewsCount;
  const rating = data.rating;

  return (
    <article
      data-testid="stay-card"
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
    >
      {/* 1. IMAGE SPOT: Full-width Top Hero (16:9) */}
      <div className="relative aspect-[16/9] w-full bg-gray-100 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.imageUrl || '/images/machiya.svg'}
          alt={data.title || 'Kyoto Stay'}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />

        {/* Pillar Tag */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#FF385C] text-white text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm">
          <span>STAY</span>
          <span>•</span>
          <span>2 NIGHTS</span>
        </div>

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={() => setIsFavorite(!isFavorite)}
          aria-label={isFavorite ? "Remove from wishlist" : "Save to wishlist"}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm text-gray-700 hover:text-[#FF385C] transition-colors shadow-sm"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#FF385C] text-[#FF385C]' : ''}`} />
        </button>

        {/* Fixed Weekend Dates Overlay Bar */}
        <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md text-white text-xs px-2.5 py-1.5 rounded-lg flex items-center justify-between">
          <span className="flex items-center gap-1 font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#FF385C]" />
            <Filler value={data.checkIn} /> &rarr; <Filler value={data.checkOut} />
          </span>
          <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded text-white font-semibold">
            <Filler value={data.nights} suffix=" nights" />
          </span>
        </div>
      </div>

      {/* CARD BODY */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Header row: Property type & Rating */}
          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
            <span className="font-medium text-gray-500 uppercase tracking-wide">
              <Filler value={data.propertyType} />
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-gray-900">
                <Filler value={rating} />
              </span>
              <span className="text-gray-500">
                (<Filler value={reviewsCount} suffix=" reviews" />)
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-gray-900 leading-snug line-clamp-1 mb-1">
            <Filler value={data.title} />
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-2.5">
            <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span className="line-clamp-1">
              <Filler value={data.location} />
            </span>
          </div>

          {/* Amenities Badges */}
          {data.amenities && data.amenities.length > 0 ? (
            <div className="flex flex-wrap gap-1 mb-3">
              {data.amenities.map((amenity, idx) => (
                <span
                  key={idx}
                  className="text-[11px] bg-rose-50 text-rose-900 border border-rose-100 px-2 py-0.5 rounded-md"
                >
                  {amenity}
                </span>
              ))}
            </div>
          ) : (
            <div className="mb-3">
              <Filler value={null} />
            </div>
          )}
        </div>

        {/* 2. BIGGEST TEXT: Nightly Price with Airbnb Coral Accent (#FF385C) */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-gray-500 uppercase font-semibold">Total / Night</div>
            <div className="text-2xl font-extrabold text-gray-900 tracking-tight">
              &yen;{data.pricePerNight ? Number(data.pricePerNight).toLocaleString() : <Filler value={null} />}
              <span className="text-xs font-normal text-gray-500 ml-1">night</span>
            </div>
          </div>

          {/* Superhost Badge / Coral CTA Button */}
          <button
            type="button"
            className="px-4 py-2 bg-[#FF385C] hover:bg-[#E00B41] text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
          >
            Reserve Stay
          </button>
        </div>
      </div>
    </article>
  );
}
