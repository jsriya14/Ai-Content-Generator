// "use client"
// import Templates from '@/app/(data)/Templates';
// import { Button } from '@/components/ui/button';
// import { db } from '@/utils/db';
// import { AiOutput } from '@/utils/schema';
// // import { currentUser } from '@clerk/nextjs';
// import { useUser } from '@clerk/nextjs';
// import { desc, eq } from 'drizzle-orm';
// import React from 'react';
// import Image from 'next/image';
// import { TEMPLATE } from '../_components/TemplateListSection'

// export interface HISTORY {
//     id: Number,
//     formData: string,
//     aiResponse: string,
//     templateSlug: string,
//     createdBy: string,
//     createdAt: string
// }
// async function history() {
//     const {user} = useUser();

//     {/*@ts-ignore*/ }
//     const HistoryList: HISTORY[] = await db.select().from(AiOutput).where(eq(AiOutput?.createdBy, user?.primaryEmailAddress?.emailAddress))
//         .orderBy(desc(AiOutput.id)).execute();
//     console.log(HistoryList);


//     const GetTemplateName = (slug: string) => {
//         const template: TEMPLATE | any = Templates?.find((item) => item.slug ==slug)
//         return template;
//     }
//     return (
//         <div>
//         <div className='m-5 p-5 border rounded-lg bg-white'>
//             <h2 className='dont-bold text-3xl'>History</h2>
//             <p className='text-grey-500'>search your previously generated content</p>
//             <div className='grid grid-cols-7 font-bold bg-secondary mt-5 p-5'>
//                 <h2 className='col-span-2'>TEMPLATE</h2>
//                 <h2 className='col-span-2'>AI RESPONSE</h2>
//                 <h2>DATE</h2>
//                 <h2>WORDS</h2>
//                 <h2>COPY</h2>
//             </div>
//             {HistoryList.map((item: HISTORY, index: number) => (
//                 <React.Fragment key={index}>
//                     <div className='grid grid-cols-7 my-5 py-3 px-3'>
//                         <h2 className='col-span-2 flex gap-2 items-center'>
//                             <Image
//                                 src={GetTemplateName(item?.templateSlug)?.icon || '/default_icon.png'}
//                                 width={25}
//                                 height={30}
//                                 alt={GetTemplateName(item.templateSlug)?.name || 'Template Icon'}
//                             />
//                             {GetTemplateName(item.templateSlug)?.name || 'Unknown Template'} {/* Added fallback */}
//                         </h2>
//                         <h2 className='col-span-2 line-clamp-3'>{item?.aiResponse || 'No Response'}</h2> {/* Added fallback */}
//                         <h2>{item.createdAt || 'Date Not Available'}</h2> {/* Added fallback */}
//                         <h2>{item?.aiResponse?.length || 0}</h2> {/* Corrected property access and added fallback */}
//                         <h2>
//                             <Button variant='ghost' className='text-primary' onClick={() => navigator.clipboard.writeText(item.aiResponse)}>
//                                 Copy {/* Updated text */}
//                             </Button>
//                         </h2>
//                     </div>
//                     <hr />
//                 </React.Fragment>
//             ))}
//         </div>
//         </div>
//     );
// }


// export default history;






'use client';

import Templates from '@/app/(data)/Templates';
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { AiOutput } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import Image from 'next/image';
import { TEMPLATE } from '../_components/TemplateListSection';

export interface HISTORY {
    id: number;
    formData: string; // Make formData nullable
    aiResponse: string ; // Make aiResponse nullable
    templateSlug: string; // Make templateSlug nullable
    createdBy: string; // Make createdBy nullable
    createdAt: string; // Make createdAt nullable
}

export default function History() { // Changed to a function component
    const { user } = useUser();
    const [HistoryList, setHistoryList] = useState<HISTORY[]>([]); // Initialize state
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchHistory() {
            if (user?.primaryEmailAddress?.emailAddress) {
                try {
                    const results = await db
                        .select()
                        .from(AiOutput)
                        .where(eq(AiOutput.createdBy, user.primaryEmailAddress.emailAddress))
                        .orderBy(desc(AiOutput.id))
                        .execute();

                    // Transform the data to match the HISTORY interface
                    // @ts-ignore
                    const transformedHistoryList: HISTORY[] = results.map((item) => ({
                        id: item.id,
                        formData: item.formData ?? null, // Handle nulls
                        aiResponse: item.aiResponse ?? null, // Handle nulls
                        templateSlug: item.templateSlug ?? null, // Handle nulls
                        createdBy: item.createdBy ?? null, // Handle nulls
                        createdAt: item.createdAt?.toString() ?? null, // Handle nulls and convert Date to string if needed
                    }));

                    setHistoryList(transformedHistoryList);
                } catch (error) {
                    console.error("Error fetching history:", error);
                    // @ts-ignore
                    setError(error.message);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        }

        fetchHistory();
    }, [user]); // Add user to dependency array

    const GetTemplateName = (slug: string) => {
        const template: TEMPLATE | any = Templates?.find((item) => item.slug === slug); // Strict equality check
        return template;
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!HistoryList || HistoryList.length === 0) {
        return <div>No history data available.</div>;
    }

    return (
        <div>
            <div className='m-5 p-5 border rounded-lg bg-white'>
                <h2 className='dont-bold text-3xl'>History</h2>
                <p className='text-grey-500'>search your previously generated content</p>
                <div className='grid grid-cols-7 font-bold bg-secondary mt-5 p-5'>
                    <h2 className='col-span-2'>TEMPLATE</h2>
                    <h2 className='col-span-2'>AI RESPONSE</h2>
                    {/* <h2>DATE</h2> */}
                    <h2 className='col-span-2 pl-10'>WORDS</h2>
                    <h2 >COPY</h2>
                </div>
                {HistoryList.map((item: HISTORY, index: number) => (
                    <React.Fragment key={index}>
                        <div className='grid grid-cols-7 my-5 py-3 px-3'>
                            <h2 className='col-span-2 flex gap-2 items-center'>
                                <Image
                                    src={GetTemplateName(item.templateSlug)?.icon || '/default_icon.png'}
                                    width={25}
                                    height={30}
                                    alt={GetTemplateName(item.templateSlug)?.name || 'Template Icon'}
                                />
                                {GetTemplateName(item.templateSlug)?.name || 'Unknown Template'}
                            </h2>
                            <h2 className='col-span-2 line-clamp-3'>{item?.aiResponse || 'No Response'}</h2>
                            {/* <h2>{item.createdAt || 'Date Not Available'}</h2> */}
                            <h2 className='col-span-2 pl-10'>{item?.aiResponse?.length || 0}</h2>
                            <h2>
                                <Button
                                    variant='ghost'
                                    className='text-primary'
                                    onClick={() => navigator.clipboard.writeText(item.aiResponse)}
                                >
                                    Copy
                                </Button>
                            </h2>
                        </div>
                        <hr />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}