export const challengeCategories = [
  "Education",
  "Healthcare",
  "Infrastructure",
  "Environment",
  "Agriculture",
  "Water Resources",
] as const;

export const challengePriorities = ["High", "Medium", "Low"] as const;

export type ChallengeCategory = (typeof challengeCategories)[number];
export type ChallengePriority = (typeof challengePriorities)[number];

export type ChallengeClassification = {
  category: ChallengeCategory;
  priority: ChallengePriority;
};

export async function categorizeChallenge(description: string): Promise<ChallengeClassification> {
  if (!description.trim()) {
    throw new Error("A challenge description is required.");
  }

  // Strictly using import.meta.env for Vite
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: `Classify this civic challenge description:\n\n${description}` }],
            },
          ],
          systemInstruction: {
            parts: [
              {
                text: `Return only a JSON object with exactly two fields: category and priority. category must be one of: ${challengeCategories.join(
                  ", "
                )}. priority must be one of: ${challengePriorities.join(", ")}.`,
              },
            ],
          },
          generationConfig: {
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) {
      throw new Error("Gemini returned an empty response.");
    }

    const parsed = JSON.parse(responseText);
    
    return {
      category: parsed.category as ChallengeCategory,
      priority: parsed.priority as ChallengePriority,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Gemini error";
    throw new Error(`Unable to categorize challenge: ${message}`);
  }
}