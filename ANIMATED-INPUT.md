# Animated Input Component Integration

## ✨ Features Implemented

### Beautiful Animated Input
- **Particle vanishing effect** - Text dissolves into particles when submitted
- **Rotating placeholders** - Engineering-specific prompts cycle every 3 seconds
- **Gradient button** - Purple to pink gradient with hover effects
- **Glassmorphism design** - Frosted glass effect with backdrop blur
- **Smooth animations** - Framer Motion powered transitions

### Engineering-Themed Placeholders
1. "Calculate beam deflection for a 10m span..."
2. "What's the optimal steel grade for seismic zones?"
3. "Design a rack for 5000 kg load capacity..."
4. "Analyze stress distribution in this structure..."
5. "Recommend column size for 50 kN load..."
6. "What are the safety factors for elevated platforms?"
7. "Calculate wind load for 20m height structure..."
8. "Material selection for corrosive environments..."

## 🎨 Design Highlights

- **Dark theme** with vibrant purple/pink/cyan accents
- **Glassmorphic effects** throughout
- **Responsive design** - Works on all screen sizes
- **Hover states** - All interactive elements have smooth transitions
- **Feature cards** - Quick overview of capabilities

## 📁 Files Created

```
src/
├── components/
│   ├── ui/
│   │   └── placeholders-and-vanish-input.tsx  # Main animated input
│   ├── EngineeringInput.tsx                   # Wrapper with engineering placeholders
│   └── InputShowcase.tsx                       # Landing page demo
├── lib/
│   └── utils.ts                                # Tailwind utility function
└── App.tsx                                     # Updated with demo toggle
```

## 🚀 How to Use

The app now starts with a beautiful showcase page featuring the animated input.

**Toggle Views:**
- Click "Open Full Chat" button (bottom-right) to access the full chat interface
- The animated input demonstrates the particle vanishing effect

**Try It:**
1. Type a message in the input field
2. Press Enter or click the arrow button
3. Watch the text dissolve into particles!

## 🎯 Next Steps

To integrate this input into the actual chat interface:

1. Replace n8n's default input with our custom input
2. Wire up the `onSendMessage` function to the n8n webhook
3. Customize colors by editing the Tailwind classes in:
   - `placeholders-and-vanish-input.tsx`
   - `InputShowcase.tsx`

## 🎨 Customization

### Change Colors
Edit `placeholders-and-vanish-input.tsx`:
```tsx
// Line 191: Change gradient colors
className="bg-gradient-to-r from-purple-600 to-pink-600"

// Line 189: Change border/shadow
className="shadow-[0_0_30px_rgba(102,126,234,0.3)]"
```

### Modify Placeholders
Edit `EngineeringInput.tsx`:
```tsx
const placeholders = [
  "Your custom placeholder here...",
  // Add more...
];
```

### Adjust Animation Speed
Edit `placeholders-and-vanish-input.tsx` line 23:
```tsx
// Change 3000 to desired milliseconds
setInterval(() => { }, 3000);
```

## 📦 Dependencies Installed

- `framer-motion` - Animation library
- `tailwindcss` - Utility-first CSS
- `clsx` & `tailwind-merge` - Class name utilities
- `autoprefixer` & `postcss` - CSS processing

## 🎭 Current View

Open http://localhost:3001 to see the animated input showcase!
