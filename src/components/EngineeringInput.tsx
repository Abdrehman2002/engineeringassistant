import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

interface EngineeringInputProps {
  onSendMessage: (message: string) => void;
}

export function EngineeringInput({ onSendMessage }: EngineeringInputProps) {
  const placeholders = [
    "Calculate beam deflection for a 10m span...",
    "What's the optimal steel grade for seismic zones?",
    "Design a rack for 5000 kg load capacity...",
    "Analyze stress distribution in this structure...",
    "Recommend column size for 50 kN load...",
    "What are the safety factors for elevated platforms?",
    "Calculate wind load for 20m height structure...",
    "Material selection for corrosive environments...",
  ];

  const handleChange = (_e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle input change if needed
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = (e.currentTarget.querySelector('input') as HTMLInputElement)?.value;
    if (message?.trim()) {
      onSendMessage(message);
    }
  };

  return (
    <div className="w-full flex justify-center items-center p-6">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
