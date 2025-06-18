// // const {
// //   GoogleGenerativeAI,
// //   HarmCategory,
// //   HarmBlockThreshold,
// // } = require("@google/generative-ai");

// // const apikey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY;
// // const genAI = new GoogleGenerativeAI(apikey);

// // const model = genAI.getGenerativeModel({
// //   model: "gemini-pro-vision", // Use a model that supports image generation
// // });

// // const generationConfig = {
// //   temperature: 0.9, // Adjust as needed for image generation
// //   topP: 0.95,
// //   maxOutputTokens: 2048, // Adjust as needed
// // };

// // export const generateContent = async (aiPrompt: any, imageBase64 = null) => {
// //   const parts = [];

// //   if (imageBase64) {
// //       parts.push({
// //           inlineData: {
// //               data: imageBase64,
// //               mimeType: "image/jpeg", // Or the appropriate mime type
// //           },
// //       });
// //   }

// //   parts.push({
// //       text: aiPrompt,
// //   });

// //   try {
// //       const result = await model.generateContent({
// //           contents: parts,
// //           generationConfig,
// //       });

// //       const response = result.response;


// //       // Process the response to extract text and image if present
// //       let generatedText = "";
// //       let generatedImage = null;

// //       for (const candidate of response.candidates) {
// //         for (const part of candidate.content.parts) {
// //           if (part.text) {
// //             generatedText += part.text;
// //           } else if (part.inlineData) {
// //             generatedImage = {
// //               data: part.inlineData.data,
// //               mimeType: part.inlineData.mimeType,
// //             };
// //           }
// //         }
// //       }

// //       return { text: generatedText.trim(), image: generatedImage }; // Return both text and image

// //   } catch (error) {
// //       console.error("Error generating content:", error);
// //       throw error; // Re-throw the error for handling at the caller level
// //   }
// // };


// // Example usage (in your component or API route):
// // Assuming you have the image as a base64 string (imageBase64) and a prompt:

// /*
// const prompt = "Describe this image and generate a related image.";

// generateContent(prompt, imageBase64)
// .then(({ text, image }) => {
//   console.log("Generated Text:", text);
//   if (image) {
//     console.log("Generated Image:", image);
//     // Display the image:
//     // <img src={`data:${image.mimeType};base64,${image.data}`} alt="Generated Image" />
//   }
// })
// .catch((error) => {
//   // Handle errors
// });
// */




































// from google import genai
// from google.genai import types
// from PIL import Image
// from io import BytesIO

// client = genai.Client(api_key='GEMINI_API_KEY')

// response = client.models.generate_images(
//     model='imagen-3.0-generate-002',
//     prompt='Fuzzy bunnies in my kitchen',
//     config=types.GenerateImagesConfig(
//         number_of_images= 4,
//     )
// )
// for generated_image in response.generated_images:
//   image = Image.open(BytesIO(generated_image.image.image_bytes))
//   image.show()







const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");

const apikey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apikey);

const model = genAI.getGenerativeModel({
    // model: "imagen-3.0-generate-002",
    model: "gemini-2.0-flash",
  });

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    //topk: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};
export const chatSession = model.startChat({
    generationConfig,
    //safetySettings: Adjust safety settings
    //See https://ai.google.dev/genini-api/docs/safety-settings
    history: [
    ],
});
















// const { GenerativeImageClient } = require('@google-ai/generative-ai');
// const { Image } = require('image-js');
// const {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
// } = require("@google/generative-ai");

// const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY; // Use environment variable
// const genAI = new GoogleGenerativeAI(apiKey);

// const imageGenerationModel = genAI.getGenerativeModel({ model: 'imagen-3.0-generate-002' }); // For image generation
// const chatModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // For chat

// const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
// };

// export const chatSession = chatModel.startChat({
//     generationConfig,
//     history: [],
// });


// async function generateImages(prompt) {  // Accept a prompt argument
//     try {
//         const response = await imageGenerationModel.generateImages({
//             prompt: prompt, // Use the provided prompt
//             imageGenerationSpec: {
//                 numImages: 4,
//             },
//         });

//         if (response && response.generatedImages) {
//             const images = [];  // Store image data for potential later use

//             for (const generatedImage of response.generatedImages) {
//                 if (generatedImage.image && generatedImage.image.imageBytes) {
//                     const imageBytes = Uint8Array.from(generatedImage.image.imageBytes);
//                     const image = await Image.load(imageBytes);

//                     // Choose ONE of the following:

//                     // 1. Display (if in a suitable environment):
//                     image.show();

//                     // 2. Save to file (server-side):
//                     // await image.save(`bunny_${Date.now()}.png`);
//                     // console.log("Image saved.");

//                     // 3. Store for later use (e.g., sending to client):
//                     images.push(imageBytes);  // Store Uint8Array for flexibility

//                 } else {
//                     console.error('Image data missing in response:', generatedImage);
//                 }
//             }
//             return images; // Return the array of image bytes
//         } else {
//             console.error('Invalid or missing response:', response);
//             return null;
//         }
//     } catch (error) {
//         console.error('Error generating images:', error);
//         return null;
//     }
// }


// // Example usage:
// async function test() {
//     const images = await generateImages('Fuzzy bunnies in my kitchen');

//     if (images) {
//         console.log("Images generated successfully!");

//         // Example: If you saved to files, you could now do something with them.
//         // Or, if you stored the imageBytes, you could now send them to a client
//         // or process them further.
//     }
// }

// test();

// // You can now call generateImages() with a prompt whenever you need to:
// // generateImages("A cat wearing a hat");


// // Example in a Next.js API route (or similar backend):
// // pages/api/generateImage.js
// export default async function handler(req:any, res:any) {
//     if (req.method === 'POST') {
//         const { prompt } = req.body; // Get prompt from request body

//         const images = await generateImages(prompt);

//         if (images) {
//            //Convert to base64 for sending to client side
//            const base64Images = images.map(imageBytes => Buffer.from(imageBytes).toString('base64'));
//             res.status(200).json({ images: base64Images }); // Send image data back to the client
//         } else {
//             res.status(500).json({ error: 'Image generation failed' });
//         }
//     } else {
//         res.status(405).end(); // Method Not Allowed
//     }
// }

