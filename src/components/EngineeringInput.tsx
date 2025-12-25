import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

interface EngineeringInputProps {
  onSendMessage: (message: string) => void;
}

export function EngineeringInput({ onSendMessage }: EngineeringInputProps) {
  const placeholders = [
    "Ask me anything about API 650...",
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
