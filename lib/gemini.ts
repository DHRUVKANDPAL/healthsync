import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const schema = {
  description: "Medical triage response",
  type: SchemaType.OBJECT,
  properties: {
    user_input: {
      type: SchemaType.STRING,
      description: "The original input text provided by the patient.",
    },
    possible_departments: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.STRING,
        description: "Possible hospital departments.",
      },
    },
  },
  required: ["user_input", "possible_departments"],
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // Or another suitable model
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
  },
});

async function MedicalTriage(userInput: string) {
  try {
    const result = await model.generateContent(
      `You are a medical triage assistant. Given a patient's symptom description, determine the most suitable hospital department.

Response Format:
Return a JSON object with the following keys:

"user_input": The original input text provided by the patient.
"possible_departments": An array of all recognized names for that department (including abbreviations or common names).

Guidelines:
Use only recognized hospital departments.
If symptoms are general or unclear, classify them under "General Practitioner" or "Physician".
If a department has multiple recognized names (e.g., "Otolaryngology" is also known as "ENT"), include all in "possible_departments" (e.g., ["ENT", "Otolaryngology"]).
Understand input in multiple languages (English, Hindi, Hinglish, slang, etc.).
Ensure the JSON response is strictly in English.

Input: "${userInput}"` // Inject the user's input
    );

    const responseText = result.response.text();

    // Attempt to parse the JSON.  If it fails, provide a default.
    try {
      const jsonResponse = JSON.parse(responseText);
      return jsonResponse;
    } catch (jsonError) {
      console.error("Error parsing JSON:", jsonError);
      console.error("Raw response:", responseText); // Log the raw response for debugging

      return {
        user_input: userInput,
        possible_departments: ["General Practitioner", "Physician"], // Default if JSON parsing fails
      };
    }
  } catch (error) {
    console.error("Error in triage:", error);
    return {
      user_input: userInput,
      possible_departments: ["General Practitioner", "Physician"], // Default in case of error
    };
  }
}

// Example usage:
// async function testTriage() {
//   const input1 = "Pet dard ho rha h";
//   const output1 = await triage(input1);
//   console.log(JSON.stringify(output1, null, 2));

//   const input2 = "Kaan me dard hai";
//   const output2 = await triage(input2);
//   console.log(JSON.stringify(output2, null, 2));

//   const input3 = "I have a fever and headache";
//   const output3 = await triage(input3);
//   console.log(JSON.stringify(output3, null, 2));

//   const input4 = "Chest pain";
//   const output4 = await triage(input4);
//   console.log(JSON.stringify(output4, null, 2));

//   const input5 = "Bohot weakness lag rahi hai"; // Hinglish
//   const output5 = await triage(input5);
//   console.log(JSON.stringify(output5, null, 2));

//   const input6 = "My leg hurts";
//   const output6 = await triage(input6);
//   console.log(JSON.stringify(output6, null, 2));
// }

// testTriage();
