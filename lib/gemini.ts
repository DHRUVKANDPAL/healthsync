import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

export async function triage(userInput: string) {
  try {
    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
    );

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
        interpration: {
          type: SchemaType.STRING,
          description:
            "One line description of what u understood about the patient's symptoms.",
        },
      },
      required: ["user_input", "possible_departments", "interpration"],
    };

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // Or another suitable model
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const result = await model.generateContent(
      `You are a professional medical triage assistant. Given a patient's symptom description, determine the most suitable hospital departments. 

Response Format:
Return a JSON object with the following keys:
- "user_input": The original input text provided by the patient.
- "possible_departments": An array of all recognized names for departments that could be relevant to the symptoms, including abbreviations or common names.
- "interpretation": A brief, one-line description of what you understand about the patient's symptoms.

Guidelines:
1. Use only recognized hospital departments from the following list:
General Practitioner (GP)
Physician
Orthopedics
Cardiology
Gastroenterology
Neurology
Dermatology
Pediatrics
Otolaryngology (ENT)
Psychiatry
Radiology
Oncology
Pulmonology
Endocrinology
Nephrology
Urology
Obstetrics and Gynecology (OB/GYN)
Rheumatology
Infectious Disease
Hematology
Anesthesiology
Emergency Medicine
Pathology
Physical Therapy / Rehabilitation
Nutrition / Dietary Services
Surgery
Plastic Surgery
Vascular Surgery
Trauma Surgery
Critical Care / ICU
Dentistry
Geriatrics
Palliative Care
Sleep Medicine
Sports Medicine
Pain Management
Podiatry
Speech-Language Pathology
Occupational Therapy
Ophthalmology (Eye Care)
Optometry
Allergy and Immunology
Medical Genetics
Family Medicine
Tropical Medicine
Neurosurgery
Neonatology
Viral Hepatitis
Pediatric Surgery
Chiropractic Medicine
2. If the symptoms are general or unclear, classify them under "General Practitioner" or "Physician".
3. If a symptom could apply to multiple departments, list all relevant ones in "possible_departments" (e.g., for chest pain, you could list ["Physician", "Cardiologist", "Gastroenterologist"]).
4. Use recognized names and abbreviations for departments (e.g., "Otolaryngology" can also be referred to as "ENT").
5. Understand input in multiple languages (English, Hindi, Hinglish, slang, etc.), and provide appropriate department(s). For example, slang terms like "pair ghisad gaya" could result in multiple departments such as "Physician", "Orthopedics", or "General Practitioner".
6. Ensure the response is in strict English.

Examples:

Example 1:
Input: "Pet dard ho rha h"
Output:
{
  "user_input": "Pet dard ho rha h",
  "possible_departments": ["Gastroenterology"],
  "interpretation": "Stomach Ache"
}

Example 2:
Input: "Kaan me dard hai"
Output:
{
  "user_input": "Kaan me dard hai",
  "possible_departments": ["ENT", "Otolaryngology"],
  "interpretation": "Ear Pain"
}

Example 3:
Input: "I have a fever and headache"
Output:
{
  "user_input": "I have a fever and headache",
  "possible_departments": ["General Practitioner", "Physician"],
  "interpretation": "Headache"
}

Example 4:
Input: "Pair ghisad gaya"
Output:
{
  "user_input": "Pair ghisad gaya",
  "possible_departments": ["Physician", "Orthopedics", "General Practitioner"],
  "interpretation": "Foot Injury"
}

Example 5:
{
  "user_input": "Jee machal rha h",
  "possible_departments": ["General Practitioner", "Physician", "Psychiatry", "Gastroenterology", "Neurology"],
  "interpretation": "Symptoms suggest anxiety, dizziness, and possibly vomiting."
}


***IMPORTANT NOTE: Accuracy is the key provide appropriate responses.***


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
//   const input1 = "muscle pain";
//   const output1 = await triage(input1);
//   console.log(JSON.stringify(output1, null, 2));
// }

// testTriage();
