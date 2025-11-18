import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SeatMap, Seat } from "@/components/SeatMap";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock, MapPin, Calendar } from "lucide-react";

// Mock seat data - in real app, this would come from API
const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  const rows = 8;
  const cols = 12;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Add some gaps for aisles
      if (col === 3 || col === 8) continue;

      const isVIP = row < 2;
      const isOccupied = Math.random() > 0.7;
      
      seats.push({
        id: `${String.fromCharCode(65 + row)}${col + 1}`,
        label: `${String.fromCharCode(65 + row)}${col + 1}`,
        row,
        col,
        type: isVIP ? "vip" : "regular",
        price: isVIP ? 350 : 200,
        status: isOccupied ? "occupied" : "available",
      });
    }
  }

  return seats;
};

export default function ShowtimeSeats() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [seats] = useState<Seat[]>(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatSelect = (seatId: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };

  const selectedSeatDetails = seats.filter((seat) => selectedSeats.includes(seat.id));
  const totalPrice = selectedSeatDetails.reduce((sum, seat) => sum + seat.price, 0);

  const handleProceed = () => {
    if (selectedSeats.length > 0) {
      navigate("/checkout");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="hover:bg-secondary"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground">
                The Grand Adventure
              </h1>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-1">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>PVR Cinemas - Inox Mall</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Today</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>6:30 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seat Selection */}
      <div className="container mx-auto px-4 py-8">
        <SeatMap
          seats={seats}
          selectedSeats={selectedSeats}
          onSeatSelect={handleSeatSelect}
          className="mb-8"
        />
      </div>

      {/* Booking Summary - Fixed Bottom */}
      {selectedSeats.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <Card className="p-4 bg-secondary/50">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    {selectedSeats.length} {selectedSeats.length === 1 ? "Seat" : "Seats"} Selected
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {selectedSeatDetails.map((s) => s.label).join(", ")}
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    ₹{totalPrice}
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={handleProceed}
                  className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
