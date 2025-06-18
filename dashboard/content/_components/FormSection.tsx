// "use client"

// import React, { useState } from 'react'
// import { TEMPLATE } from '../../_components/TemplateListSection'
// import Image from 'next/image'
// import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea'
// import { Button } from '@/components/ui/button'
// import { Loader2Icon } from 'lucide-react'

// interface PROPS {
//     selectedTemplate?: TEMPLATE;
//     userFormInput:any,
//     loading:boolean;
// }


// function FormSection({ selectedTemplate,userFormInput,loading }: PROPS) {

//     const[formData,setFormData]=useState<any>();

//     const handleInputChange=(event:any)=>
//     {
//         const {name,value}=event.target;
//         setFormData({...formData,[name]:value})
//     }

//     const onSubmit = (e: any) => {
//         e.preventDefault();
//         userFormInput(formData)

//     }


//     return (
//         <div className='p-5 shadow-md border rounded-lg bg-white'>
//             {/* @ts-ignore */}
//             <Image src={selectedTemplate?.icon} alt='icon' width={70} height={70} />
//             <h2 className='font-bold text-2xl mb-2 text-primary'>{selectedTemplate?.name}</h2>
//             <p className='text-gray-500 text-sm'>{selectedTemplate?.desc}</p>

//             <form className='mt-6' onSubmit={onSubmit}>
//                 {selectedTemplate?.form?.map((item, index) =>
//                 (
//                     <div key={index} className='my-2 flex flex-col gap-2 mb-7'>
//                         <label className=' font-bold block text-gray-500 text-sm mb-2'>{item.label}</label>
//                         {item.field == 'input' ?
//                             <Input name={item.name} required={item?.required}
//                             onChange={handleInputChange}
//                             />
//                             : item.field == 'textarea' ?
//                                 <Textarea name={item.name} required={item?.required}
//                                 onChange={handleInputChange} /> : null
//                         }
//                     </div>

//                 ))}
//                 <Button type="submit" className='w-full py-6'
//                  disabled={loading}>
//                     {loading&&<Loader2Icon className='animate-spin'/>}
//                     Generate Content
//                 </Button >
//             </form>
//         </div>
//     )
// }

// export default FormSection;




"use client";

import React, { useState, useEffect } from 'react';
import { TEMPLATE } from '../../_components/TemplateListSection';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2Icon, Mic } from 'lucide-react';

interface PROPS {
    selectedTemplate?: TEMPLATE;
    userFormInput: any;
    loading: boolean;
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

function FormSection({ selectedTemplate, userFormInput, loading }: PROPS) {
    const [formData, setFormData] = useState<any>({});
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
    const [activeInputName, setActiveInputName] = useState<string | null>(null);

    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (typeof SpeechRecognition !== 'undefined') {
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.continuous = false;
            recognitionInstance.interimResults = false;
            recognitionInstance.lang = 'en-US';

            recognitionInstance.onstart = () => setIsListening(true);
            recognitionInstance.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                if (activeInputName) {
                    setFormData((prevFormData: any) => ({ ...prevFormData, [activeInputName]: transcript }));
                }
            };
            recognitionInstance.onend = () => setIsListening(false);
            recognitionInstance.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
            };
            setRecognition(recognitionInstance);
        } else {
            console.warn('Speech Recognition API not supported in this browser.');
        }

        return () => {
            if (recognition) {
                recognition.abort();
            }
        };
    }, [selectedTemplate, activeInputName]);

    const handleVoiceInput = (inputName: string) => {
        setActiveInputName(inputName);
        if (recognition && !isListening) {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then((stream) => {
                    stream.getTracks().forEach(track => track.stop());
                    if (recognition) {
                        recognition.start();
                    }
                })
                .catch((err) => {
                    console.error("Microphone access denied or error:", err);
                    alert("Microphone access is required for voice input. Please grant permission in your browser settings.");
                });
        } else if (recognition && isListening) {
            recognition.stop();
        }
    };

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = (e: any) => {
        e.preventDefault();
        userFormInput(formData);
    };

    return (
        <div className='p-5 shadow-md border rounded-lg bg-white'>
            {/* @ts-ignore */}
            <Image src={selectedTemplate?.icon} alt='icon' width={70} height={70} />
            <h2 className='font-bold text-2xl mb-2 text-primary'>{selectedTemplate?.name}</h2>
            <p className='text-gray-500 text-sm'>{selectedTemplate?.desc}</p>

            <form className='mt-6' onSubmit={onSubmit}>
                {selectedTemplate?.form?.map((item, index) => (
                    <div key={index} className='my-2 flex flex-col gap-2 mb-7'>
                        <label className=' font-bold block text-gray-500 text-sm mb-2'>{item.label}</label>
                        {item.field === 'input' ? (
                            <div className='flex items-center'>
                                <Input
                                    name={item.name}
                                    required={item?.required}
                                    onChange={handleInputChange}
                                    value={formData[item.name] || ''} // Added value prop
                                />
                                <button
                                    type="button"
                                    onClick={() => handleVoiceInput(item.name)}
                                    className="rounded-full p-1 hover:bg-gray-200 ml-2"
                                >
                                    <Mic className={`text-gray-600 ${isListening && activeInputName === item.name ? 'text-red-500' : ''}`} />
                                </button>
                            </div>
                        ) : item.field === 'textarea' ? (
                            <div className='flex items-start'>
                                <Textarea
                                    name={item.name}
                                    required={item?.required}
                                    onChange={handleInputChange}
                                    value={formData[item.name] || ''} // Added value prop
                                />
                                <button
                                    type="button"
                                    onClick={() => handleVoiceInput(item.name)}
                                    className="rounded-full p-1 hover:bg-gray-200 ml-2"
                                >
                                    <Mic className={`text-gray-600 ${isListening && activeInputName === item.name ? 'text-red-500' : ''}`} />
                                </button>
                            </div>
                        ) : null}
                    </div>
                ))}
                <Button type="submit" className='w-full py-6' disabled={loading}>
                    {loading && <Loader2Icon className='animate-spin' />}
                    Generate Content
                </Button>
            </form>
        </div>
    );
}

export default FormSection;