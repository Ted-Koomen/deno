import { serve } from "https://deno.land/std/http/server.ts";
import { mapStory } from "./mapStory.ts";
import { Story, StoryResponse } from "./interfaces/index.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

const url = "http://hn.algolia.com/api/v1/search?query=javascript"

const server = serve({ port: 8080 });

const fetchStories = async (): Promise<StoryResponse> => {
  try {
    const response = await fetch(url).then((res) => res.json());

    return response;
  } catch (e) {
    throw new Error(e);
  }
};



for await (const req of server) {
    const stories = await fetchStories();
    const formattedStores = stories.hits.map(mapStory);
    req.respond({ body: JSON.stringify(formattedStores) })
}