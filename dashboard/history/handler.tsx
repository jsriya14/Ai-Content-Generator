// import { db } from '@/utils/db'; // Your Drizzle database instance
// import {AiOutput} from '@/utils/schema'; // Your Drizzle schema
// import { desc, eq } from 'drizzle-orm';
// import { useUser } from '@clerk/nextjs';
// export default async function handler() {
//   try {
//     const user = await useUser();
//     {/*@ts-ignore*/ }
//     const data = await db.select().from(AiOutput).where(eq(AiOutput?.createdBy, user?.primaryEmailAddress?.emailAddress))
//             .orderBy(desc(AiOutput.id)); // Your Drizzle query
//     return data;
//   } catch (error) {
//     console.error("Error fetching history:", error);
//     throw error; // Re-throw the error to be handled by the client component
//   }
// }




// pages/api/history.js
import { db } from '@/utils/db';
import { AiOutput } from '@/utils/schema';
import { eq, desc } from 'drizzle-orm';
import { getAuth } from '@clerk/nextjs/server';
import type { NextRequest, NextResponse } from 'next/server'; // Import types
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest, // Type the request
  res: NextApiResponse // Type the response
) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const HistoryList = await db
      .select()
      .from(AiOutput)
      .where(eq(AiOutput.createdBy, userId))
      .orderBy(desc(AiOutput.id))
      .execute();

    res.status(200).json(HistoryList);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
}