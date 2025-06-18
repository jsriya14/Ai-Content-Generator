// // import { Search } from 'lucide-react'
// // import React from 'react'

// // function SearchSection({onSearchInput}:any) {
// //   return (
// //     <div className='p-10 bg-gradient-to-br from-purple-500 via-purple-700
// //      to-blue-600 flex flex-col justify-center items-center text-white'>
// //       <h2 className='text-3xl font-bold'>
// //         Browse all templates
// //       </h2>

// //       <p>
// //         what would you like to create today?
// //       </p>

// //       <div className='w-full flex justify-center'>
// //         <div className='flex gap-2 items-center p-2 border rounded-md bg-white my-5 w-[50%]'>
// //             <Search className='text-primary'/>
// //             {/* bg-transparent */}
// //             <input type="text" placeholder="Search for a template" onChange={(event)=>onSearchInput(event?.target.value)} 
// //             className="bg-transparent w-full outline-none text-black "/>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default SearchSection


// import { Search, Mic } from 'lucide-react';
// import React, { useState, useEffect } from 'react';

// function SearchSection({ onSearchInput }: any) {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isListening, setIsListening] = useState(false);




//   interface SpeechRecognition extends EventTarget {
//     continuous: boolean;
//     interimResults: boolean;
//     lang: string;
//     onresult: (event: SpeechRecognitionEvent) => void;
//     onstart: () => void;
//     onend: () => void;
//     onerror: (event: SpeechRecognitionErrorEvent) => void;
//     start: () => void;
//     stop: () => void;
//     abort: () => void;
// }

// interface SpeechRecognitionEvent extends Event {
//     results: SpeechRecognitionResultList;
// }

// interface SpeechRecognitionResultList {
//     [index: number]: SpeechRecognitionResult;
//     length: number;
// }

// interface SpeechRecognitionResult {
//     [index: number]: SpeechRecognitionAlternative;
//     isFinal: boolean;
//     length: number;
// }

// interface SpeechRecognitionAlternative {
//     confidence: number;
//     transcript: string;
// }

// interface SpeechRecognitionErrorEvent extends Event {
//     error: SpeechRecognitionErrorCode;
// }

// type SpeechRecognitionErrorCode = 'no-speech' | 'aborted' | 'audio-capture' | 'network' | 'not-allowed' | 'service-not-available' | 'bad-grammar' | 'language-not-supported';



  
//   const [recognition, setRecognition] = useState<SpeechRecognition| null>(null);

//   useEffect(() => {
//     // Check for browser support of Speech Recognition
//     const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

//     if (typeof SpeechRecognition !== 'undefined') {
//       const recognitionInstance = new SpeechRecognition();
//       recognitionInstance.continuous = false; // Capture only one phrase at a time
//       recognitionInstance.interimResults = false; // Don't show partial results
//       recognitionInstance.lang = 'en-US'; // Set language (you can change this)
//       navigator.mediaDevices.getUserMedia({ audio: true }) // Request access to the microphone
//                 .then((stream) => { // Access granted
//                     stream.getTracks().forEach(track => track.stop()); // Stop the stream immediately. This is important.
//                     recognition.current = new SpeechRecognition();
//                     // ... (rest of the SpeechRecognition setup)
//                 })
//                 .catch((err) => { // Access denied or error
//                     console.error("Microphone access denied or error:", err);
//                     // Display a message to the user explaining that microphone access is required
//                     // and how to grant it in their browser settings.
//                     alert("Microphone access is required for voice search. Please grant permission in your browser settings.");
//                 });
//       recognitionInstance.onstart = () => {
//         setIsListening(true);
//       };

//       recognitionInstance.onresult = (event: any) => {
//         const transcript = event.results[0][0].transcript;
//         setSearchTerm(transcript);
//         onSearchInput(transcript); // Update search input
//       };

//       recognitionInstance.onend = () => {
//         setIsListening(false);
//       };

      
//       recognitionInstance.onerror = (event: any) => {
//         console.error('Speech recognition error:', event.error);
//         setIsListening(false);
//       };

//       setRecognition(recognitionInstance);
//     } else {
//       console.warn('Speech Recognition API not supported in this browser.');
//     }

//     return () => {
//        if (recognition) {
//         recognition.abort(); // Stop recognition on component unmount
//       }
//     };
//   }, []);



//   const handleVoiceSearch = () => {
//     if (recognition && !isListening) {
//       recognition.start();
//     } else if (recognition && isListening) {
//       recognition.stop();
//     }
//   };

//   return (
//     <div className='p-10 bg-gradient-to-br from-purple-500 via-purple-700 to-blue-600 flex flex-col justify-center items-center text-white'>
//       <h2 className='text-3xl font-bold'>Browse all templates</h2>
//       <p>what would you like to create today?</p>

//       <div className='w-full flex justify-center'>
//         <div className='flex gap-2 items-center p-2 border rounded-md bg-white my-5 w-[50%]'>
//           <Search className='text-primary' />
//           <input
//             type="text"
//             placeholder="Search for a template"
//             value={searchTerm} // Bind input value to searchTerm
//             onChange={(event) => {
//               setSearchTerm(event.target.value);
//               onSearchInput(event.target.value);
//             }}
//             className="bg-transparent w-full outline-none text-black"
//           />
//           <button onClick={handleVoiceSearch} className="rounded-full p-1 hover:bg-gray-200"> {/* Added button */}
//             <Mic className={`text-gray-600 ${isListening ? 'text-red-500' : ''}`}  /> {/* Mic icon, change color if listening */}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SearchSection;



// import { Search, Mic } from 'lucide-react';
// import React, { useState, useEffect } from 'react';

// function SearchSection({ onSearchInput }: any) {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [isListening, setIsListening] = useState(false);
//     const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

//     interface SpeechRecognition extends EventTarget {
//         continuous: boolean;
//         interimResults: boolean;
//         lang: string;
//         onresult: (event: SpeechRecognitionEvent) => void;
//         onstart: () => void;
//         onend: () => void;
//         onerror: (event: SpeechRecognitionErrorEvent) => void;
//         start: () => void;
//         stop: () => void;
//         abort: () => void;
//     }

//     interface SpeechRecognitionEvent extends Event {
//         results: SpeechRecognitionResultList;
//     }

//     interface SpeechRecognitionResultList {
//         [index: number]: SpeechRecognitionResult;
//         length: number;
//     }

//     interface SpeechRecognitionResult {
//         [index: number]: SpeechRecognitionAlternative;
//         isFinal: boolean;
//         length: number;
//     }

//     interface SpeechRecognitionAlternative {
//         confidence: number;
//         transcript: string;
//     }

//     interface SpeechRecognitionErrorEvent extends Event {
//         error: SpeechRecognitionErrorCode;
//     }

//     type SpeechRecognitionErrorCode = 'no-speech' | 'aborted' | 'audio-capture' | 'network' | 'not-allowed' | 'service-not-available' | 'bad-grammar' | 'language-not-supported';

//     useEffect(() => {
//         const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

//         if (typeof SpeechRecognition !== 'undefined') {
//             const recognitionInstance = new SpeechRecognition();
//             recognitionInstance.continuous = false;
//             recognitionInstance.interimResults = false;
//             recognitionInstance.lang = 'en-US';

//             navigator.mediaDevices.getUserMedia({ audio: true })
//                 .then((stream) => {
//                     stream.getTracks().forEach(track => track.stop());
//                     setRecognition(recognitionInstance); // Corrected line
//                 })
//                 .catch((err) => {
//                     console.error("Microphone access denied or error:", err);
//                     alert("Microphone access is required for voice search. Please grant permission in your browser settings.");
//                 });

//             recognitionInstance.onstart = () => {
//                 setIsListening(true);
//             };

//             recognitionInstance.onresult = (event: any) => {
//                 const transcript = event.results[0][0].transcript;
//                 setSearchTerm(transcript);
//                 onSearchInput(transcript);
//             };

//             recognitionInstance.onend = () => {
//                 setIsListening(false);
//             };

//             recognitionInstance.onerror = (event: any) => {
//                 console.error('Speech recognition error:', event.error);
//                 setIsListening(false);
//             };
//         } else {
//             console.warn('Speech Recognition API not supported in this browser.');
//         }

//         return () => {
//             if (recognition) {
//                 recognition.abort();
//             }
//         };
//     }, []);

//     const handleVoiceSearch = () => {
//         if (recognition && !isListening) {
//             recognition.start();
//         } else if (recognition && isListening) {
//             recognition.stop();
//         }
//     };

//     return (
//         <div className='p-10 bg-gradient-to-br from-purple-500 via-purple-700 to-blue-600 flex flex-col justify-center items-center text-white'>
//             <h2 className='text-3xl font-bold'>Browse all templates</h2>
//             <p>what would you like to create today?</p>

//             <div className='w-full flex justify-center'>
//                 <div className='flex gap-2 items-center p-2 border rounded-md bg-white my-5 w-[50%]'>
//                     <Search className='text-primary' />
//                     <input
//                         type="text"
//                         placeholder="Search for a template"
//                         value={searchTerm}
//                         onChange={(event) => {
//                             setSearchTerm(event.target.value);
//                             onSearchInput(event.target.value);
//                         }}
//                         className="bg-transparent w-full outline-none text-black"
//                     />
//                     <button onClick={handleVoiceSearch} className="rounded-full p-1 hover:bg-gray-200">
//                         <Mic className={`text-gray-600 ${isListening ? 'text-red-500' : ''}`} />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }
// export default SearchSection;



import { Search, Mic } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

interface SearchSectionProps {
    onSearchInput: (searchTerm: string) => void;
}

interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onresult: (event: SpeechRecognitionEvent) => void;
    onstart: () => void;
    onend: () => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    start: () => void;
    stop: () => void;
    abort: () => void;
}

interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
    [index: number]: SpeechRecognitionResult;
    length: number;
}

interface SpeechRecognitionResult {
    [index: number]: SpeechRecognitionAlternative;
    isFinal: boolean;
    length: number;
}

interface SpeechRecognitionAlternative {
    confidence: number;
    transcript: string;
}

interface SpeechRecognitionErrorEvent extends Event {
    error: SpeechRecognitionErrorCode;
}

type SpeechRecognitionErrorCode = 'no-speech' | 'aborted' | 'audio-capture' | 'network' | 'not-allowed' | 'service-not-available' | 'bad-grammar' | 'language-not-supported';

function SearchSection({ onSearchInput }: SearchSectionProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isSpeechAPISupported, setIsSpeechAPISupported] = useState(false);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const [microphoneError, setMicrophoneError] = useState<string | null>(null);

    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (typeof SpeechRecognition !== 'undefined') {
            setIsSpeechAPISupported(true);
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.continuous = false;
            recognitionInstance.interimResults = false;
            recognitionInstance.lang = 'en-US';
            recognitionRef.current = recognitionInstance;

            recognitionInstance.onstart = () => {
                setIsListening(true);
            };

            recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
                const transcript = event.results[0][0].transcript;
                setSearchTerm(transcript);
                onSearchInput(transcript);
            };

            recognitionInstance.onend = () => {
                setIsListening(false);
            };

            recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
                switch (event.error) {
                    case 'no-speech':
                        setMicrophoneError('No speech detected. Please try again.');
                        break;
                    case 'audio-capture':
                        setMicrophoneError('Could not capture audio. Ensure your microphone is working and permissions are granted.');
                        break;
                    case 'not-allowed':
                        setMicrophoneError('Microphone access denied. Please grant permission in your browser settings.');
                        break;
                    default:
                        setMicrophoneError(`Speech recognition error: ${event.error}`);
                        break;
                }
                // Optionally clear the error after a few seconds
                setTimeout(() => setMicrophoneError(null), 5000);
            };

            navigator.mediaDevices.getUserMedia({ audio: true })
                .then((stream) => {
                    stream.getTracks().forEach(track => track.stop());
                })
                .catch((err) => {
                    console.error("Microphone access denied or error:", err);
                    setIsSpeechAPISupported(false); // Disable voice search if no access
                    setMicrophoneError("Microphone access denied. Please grant permission in your browser settings.");
                });
        } else {
            console.warn('Speech Recognition API not supported in this browser.');
            setIsSpeechAPISupported(false);
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.abort();
            }
        };
    }, []);

    const handleVoiceSearch = () => {
        setMicrophoneError(null); // Clear any previous microphone errors
        if (!isSpeechAPISupported) {
            alert('Voice search is not supported in this browser.');
            return;
        }
        if (recognitionRef.current && !isListening) {
            recognitionRef.current.start();
        } else if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
        }
    };

    return (
        <div className='p-10 bg-gradient-to-br from-purple-500 via-purple-700 to-blue-600 flex flex-col justify-center items-center text-white'>
            <h2 className='text-3xl font-bold'>Browse all templates</h2>
            <p>what would you like to create today?</p>

            <div className='w-full flex justify-center'>
                <div className='flex gap-2 items-center p-2 border rounded-md bg-white my-5 w-[50%]'>
                    <Search className='text-primary' />
                    <input
                        type="text"
                        placeholder="Search for a template"
                        value={searchTerm}
                        onChange={(event) => {
                            setSearchTerm(event.target.value);
                            onSearchInput(event.target.value);
                        }}
                        className="bg-transparent w-full outline-none text-black"
                    />
                    {isSpeechAPISupported ? (
                        <button
                            onClick={handleVoiceSearch}
                            className={`rounded-full p-1 hover:bg-gray-200 ${!navigator.mediaDevices ? 'cursor-not-allowed' : ''}`}
                            disabled={!navigator.mediaDevices}
                            title={!navigator.mediaDevices ? 'Microphone access required' : 'Start voice search'}
                        >
                            <Mic className={`text-gray-600 ${isListening ? 'text-red-500' : ''}`} />
                        </button>
                    ) : (
                        <Mic className="text-gray-400 cursor-not-allowed"  />
                    )}
                </div>
            </div>
            {microphoneError && (
                <div className="text-red-400 mt-2">{microphoneError}</div>
            )}
        </div>
    );
}

export default SearchSection;
