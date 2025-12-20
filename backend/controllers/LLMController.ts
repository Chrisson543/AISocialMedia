import { Request, Response } from "express";
import { createAIUserF, getNRandomAIUsersF, getRandomAIUserF } from "../services/userService";
import { createNewAIPostF } from "../services/postService";
import { getNRandomPersonaTypes, getRandomPersonaTypes } from '../helpers/llmHelpers'

export async function generateAIUser(req: Request, res: Response){
    const url = "https://openrouter.ai/api/v1/chat/completions";
    const headers = {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
    };

    const personaType = getRandomPersonaTypes();
    console.log(personaType)

    const payload = {
        "model": "@preset/ai-social-media-generate-characters",
        "messages": [
        {
            "role": "user",
            "content": `Generate a fictional social-media user. Use persona_type = ${personaType}.`
        }
        ],
        "response_format": {
            "type": "json_schema",
            "json_schema": {
                "name": "ai_user",
                "strict": true,
                "schema": {
                    "type": "object",
                    "properties": {
                    "username": { "type": "string" },
                    "display_name": { "type": "string" },
                    "bio": { "type": "string" },
                    "persona_type": { "type": "string" },
                    "persona_style": { "type": "string" },
                    "interests": {
                        "type": "array",
                        "items": { "type": "string" },
                        "minItems": 3,
                        "maxItems": 7
                    },
                    "writing_style_examples": {
                        "type": "array",
                        "items": { "type": "string" },
                        "minItems": 1,
                        "maxItems": 2
                    },
                    "post_frequency": {
                        "type": "string",
                        "enum": ["low", "medium", "high"]
                    },
                    "timezone": { "type": "string" }
                    },
                    "required": [
                    "username",
                    "display_name",
                    "bio",
                    "persona_type",
                    "persona_style",
                    "interests",
                    "writing_style_examples",
                    "post_frequency",
                    "timezone"
                    ],
                    "additionalProperties": false
                }
            }
        }
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        const aiUserData = JSON.parse(data.choices[0].message.content)

        const aiUser = await createAIUserF(
            aiUserData.username, 
            aiUserData.display_name, 
            aiUserData.bio,
            aiUserData.persona_type,
            aiUserData.persona_style,
            aiUserData.interests,
            aiUserData.writing_style_examples,
            aiUserData.post_frequency,
            aiUserData.timezone 
        )

        return res.status(200).send(aiUser)
    }
    catch(error: any){
        console.error(error.message);
        return res.status(400).json(error.message);
    }

}

export async function generateNAIUsers(req: Request, res: Response) {
  const url = "https://openrouter.ai/api/v1/chat/completions";
  const headers = {
    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
    "Content-Type": "application/json"
  };

  const { nUsers } = req.params;
  const n = Number(nUsers);

  if (!Number.isFinite(n) || n <= 0) {
    return res.status(400).json({ error: "nUsers must be a positive number" });
  }

  const personaTypes = getNRandomPersonaTypes(n);

  const payload = {
    model: "@preset/ai-social-media-generate-characters",
    max_tokens: n * 300,
    messages: [
      {
        role: "user",
        // one persona_type per user, in order
        content:
          `Generate ${n} fictional social-media users as JSON under a "users" array. ` +
          `Use these persona_types, in this order, one per user: ${JSON.stringify(personaTypes)}.`
      }
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "ai_user_batch",
        strict: true,
        schema: {
          type: "object",
          properties: {
            users: {
              type: "array",
              minItems: n,
              maxItems: n,
              items: {
                type: "object",
                properties: {
                  username: { type: "string" },
                  display_name: { type: "string" },
                  bio: { type: "string" },
                  persona_type: { type: "string" },
                  persona_style: { type: "string" },
                  interests: {
                    type: "array",
                    items: { type: "string" },
                    minItems: 3,
                    maxItems: 7
                  },
                  writing_style_examples: {
                    type: "array",
                    items: { type: "string" },
                    minItems: 1,
                    maxItems: 2
                  },
                  post_frequency: {
                    type: "string",
                    enum: ["low", "medium", "high"]
                  },
                  timezone: { type: "string" }
                },
                required: [
                  "username",
                  "display_name",
                  "bio",
                  "persona_type",
                  "persona_style",
                  "interests",
                  "writing_style_examples",
                  "post_frequency",
                  "timezone"
                ],
                additionalProperties: false
              }
            }
          },
          required: ["users"],
          additionalProperties: false
        }
      }
    }
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    const parsed = JSON.parse(data.choices[0].message.content);
    const users = parsed.users as any[];

    const created = await Promise.all(
      users.map(u =>
        createAIUserF(
          u.username,
          u.display_name,
          u.bio,
          u.persona_type,
          u.persona_style,
          u.interests,
          u.writing_style_examples,
          u.post_frequency,
          u.timezone
        )
      )
    );

    return res.status(200).json(created);
  } catch (error: any) {
    console.error(error.message);
    return res.status(400).json({ error: error.message });
  }
}

export async function generateAIPost(req: Request, res: Response){
    const url = "https://openrouter.ai/api/v1/chat/completions";
    const headers = {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
    };

    const random_ai_data = await getRandomAIUserF();

    const aiInput = JSON.stringify({
        bio: random_ai_data.bio, 
        persona_type: random_ai_data.persona_type, 
        persona_style: random_ai_data.persona_style, 
        interests: random_ai_data.interests, 
        writing_style_examples: random_ai_data.writing_style_examples
    })

    const payload = {
        "model": "@preset/ai-social-media-generate-posts",
        "messages": [
        {
            "role": "user",
            "content": JSON.stringify(aiInput)
        }
        ]
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        const aiPost = data.choices[0].message.content

        const newAIPost = await createNewAIPostF(
            random_ai_data.id,
            aiPost
        )

        return res.status(200).json(newAIPost)
    }
    catch(error: any){
        console.error(error.message);
        return res.status(400).json(error.message);
    }

}

export async function generateNAIPosts(req: Request, res: Response) {
  const url = "https://openrouter.ai/api/v1/chat/completions";
  const headers = {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    "Content-Type": "application/json",
  };

  const { nUsers } = req.params;
  const n = Number(nUsers);

  if (!Number.isFinite(n) || n <= 0) {
    return res.status(400).json({ error: "nUsers must be a positive number" });
  }

  try {
    const randomUsers = await getNRandomAIUsersF(n);

    const createdPosts = await Promise.all(
      randomUsers.map(async (user) => {
        const aiInput = {
          bio: user.bio,
          persona_type: user.persona_type,
          persona_style: user.persona_style,
          interests: user.interests,
          writing_style_examples: user.writing_style_examples,
        };

        const payload = {
          model: "@preset/ai-social-media-generate-posts",
          // optional: max_tokens: 100,
          messages: [
            {
              role: "user",
              // single stringify here is enough
              content: JSON.stringify(aiInput),
            },
          ],
        };

        const response = await fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        const aiPostText = data.choices[0].message.content as string;

        // store post for this user
        const newPost = await createNewAIPostF(user.id, aiPostText);
        return newPost;
      })
    );

    return res.status(200).json(createdPosts);
  } catch (error: any) {
    console.error(error.message);
    return res.status(400).json({ error: error.message });
  }
}
