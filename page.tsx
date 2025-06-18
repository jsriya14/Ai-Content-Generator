// import { Button } from "@/components/ui/button";
// import Image from "next/image";

// import Dashboard from "./dashboard/page";
// import layout from "./dashboard/layout";


// export default function Home() {
//   return (
//     <div>
//       <h2>ai</h2>
    
//     </div>
    
//   );
// }



'use client'; // If you need client-side interactivity

import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // For navigation

// Component imports (replace with your actual component paths)
import { Button } from '@/components/ui/button'; // Example button component
// ... other component imports

// Image imports (replace with your actual image paths)
//import logo from './logo.png'; // Example logo import
import heroImage from './hero-image.jpg'; // Example hero image
//import SpeechToText from './dashboard/_components/SpeechtoText';
// import templateIcon from './template-icon.svg'; // Example template icon
// import customIcon from './custom-icon.svg'; // Example customization icon
// import freeIcon from './free-icon.svg'; // Example free icon
// import supportIcon from './support-icon.svg'; // Example support icon

export default function HomePage() {
  return (
    <div className="bg-white text-gray-800 font-sans"> {/* Base styles */}

      {/* Navigation Bar */}
      <nav className="bg-gray-100 p-4 flex justify-between items-center">
        <Link href="/dashboard"> {/* Replace with your logo link */}
          <Image src="https://cdn-icons-png.flaticon.com/128/13298/13298257.png" alt="Logo" width={100} height={50} /> {/* Adjust size */}
        </Link>
        <div>
          <a href="/dashboard"><Button>Get Started</Button></a> {/* Or any other nav items */}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-20 px-8 flex flex-col items-center">
        <h1 className="text-5xl font-bold mb-4 text-center">AI Content Generator</h1>
        <p className="text-xl mb-8 text-center w-3/4">Revolutionize your content creation with our AI-powered app, delivering engaging and high-quality text in seconds.</p>
        <a href="/dashboard"><Button className="bg-white text-blue-500 py-3 px-6 rounded-lg font-medium">Get started</Button></a>
      </section>

      

      

      {/* Footer */}
      <div className='pt-44'>
      <footer className="bg-gray-800 text-white py-4 px-8 text-center">
        <p>&copy; {new Date().getFullYear()} NASA</p>
      </footer>
      </div>
      
    </div>
  );
}