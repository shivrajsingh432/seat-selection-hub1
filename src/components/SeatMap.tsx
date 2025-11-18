import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Armchair, Monitor } from "lucide-react";

export type SeatStatus = "available" | "selected" | "occupied" | "vip" | "blocked";

export interface Seat {
  id: string;
  label: string;
  row: number;
  col: number;
  type: "regular" | "vip";
  price: number;
  status: SeatStatus;
}

interface SeatMapProps {
  seats: Seat[];
  onSeatSelect: (seatId: string) => void;
  selectedSeats: string[];
  className?: string;
}

export const SeatMap = ({ seats, onSeatSelect, selectedSeats, className }: SeatMapProps) => {
  const [hoveredSeat, setHoveredSeat] = useState<string | null>(null);

  const rows = Math.max(...seats.map((s) => s.row)) + 1;
  const cols = Math.max(...seats.map((s) => s.col)) + 1;

  const getSeatStatus = (seat: Seat): SeatStatus => {
    if (selectedSeats.includes(seat.id)) return "selected";
    return seat.status;
  };

  const getSeatClassName = (status: SeatStatus, type: "regular" | "vip") => {
    const baseClasses = "relative w-8 h-8 md:w-10 md:h-10 rounded-md transition-all duration-200 cursor-pointer flex items-center justify-center";
    
    const statusClasses = {
      available: type === "vip" 
        ? "bg-seat-vip/20 border-2 border-seat-vip hover:bg-seat-vip/40 hover:scale-110" 
        : "bg-seat-available/20 border-2 border-seat-available hover:bg-seat-available/40 hover:scale-110",
      selected: "bg-seat-selected border-2 border-seat-selected scale-110 animate-seat-pulse",
      occupied: "bg-seat-occupied/50 border-2 border-seat-occupied cursor-not-allowed opacity-50",
      vip: "bg-seat-vip/20 border-2 border-seat-vip hover:bg-seat-vip/40 hover:scale-110",
      blocked: "bg-seat-blocked/50 border-2 border-seat-blocked cursor-not-allowed opacity-50",
    };

    return cn(baseClasses, statusClasses[status]);
  };

  const handleSeatClick = (seat: Seat) => {
    const status = getSeatStatus(seat);
    if (status === "occupied" || status === "blocked") return;
    onSeatSelect(seat.id);
  };

  const seatGrid = Array.from({ length: rows }, (_, rowIdx) =>
    Array.from({ length: cols }, (_, colIdx) => {
      return seats.find((s) => s.row === rowIdx && s.col === colIdx);
    })
  );

  const hoveredSeatData = hoveredSeat ? seats.find((s) => s.id === hoveredSeat) : null;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Screen */}
      <div className="flex flex-col items-center gap-2 mb-8">
        <div className="w-full max-w-4xl h-2 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full animate-glow" />
        <div className="flex items-center gap-2 text-muted-foreground">
          <Monitor className="h-4 w-4" />
          <span className="text-sm font-medium">Screen this way</span>
        </div>
      </div>

      {/* Seat Grid */}
      <div className="flex flex-col items-center gap-2 md:gap-3 select-none">
        {seatGrid.map((row, rowIdx) => (
          <div key={rowIdx} className="flex items-center gap-2 md:gap-3">
            <span className="w-6 text-center text-sm font-medium text-muted-foreground">
              {String.fromCharCode(65 + rowIdx)}
            </span>
            {row.map((seat, colIdx) => {
              if (!seat) {
                return <div key={`empty-${rowIdx}-${colIdx}`} className="w-8 h-8 md:w-10 md:h-10" />;
              }

              const status = getSeatStatus(seat);
              return (
                <button
                  key={seat.id}
                  className={getSeatClassName(status, seat.type)}
                  onClick={() => handleSeatClick(seat)}
                  onMouseEnter={() => setHoveredSeat(seat.id)}
                  onMouseLeave={() => setHoveredSeat(null)}
                  disabled={status === "occupied" || status === "blocked"}
                  aria-label={`Seat ${seat.label}, ${seat.type}, ₹${seat.price}, ${status}`}
                >
                  <Armchair className="h-4 w-4 md:h-5 md:h-5" />
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Seat Tooltip */}
      {hoveredSeatData && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-popover border border-border rounded-lg px-4 py-2 shadow-lg z-50 animate-fade-in">
          <div className="text-sm">
            <span className="font-semibold">{hoveredSeatData.label}</span>
            <span className="text-muted-foreground"> • </span>
            <span className="text-accent">₹{hoveredSeatData.price}</span>
            <span className="text-muted-foreground"> • </span>
            <span className="capitalize">{hoveredSeatData.type}</span>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 pt-6 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-seat-available/20 border-2 border-seat-available" />
          <span className="text-sm text-foreground">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-seat-selected border-2 border-seat-selected" />
          <span className="text-sm text-foreground">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-seat-occupied/50 border-2 border-seat-occupied" />
          <span className="text-sm text-foreground">Occupied</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-seat-vip/20 border-2 border-seat-vip" />
          <span className="text-sm text-foreground">VIP</span>
        </div>
      </div>
    </div>
  );
};
