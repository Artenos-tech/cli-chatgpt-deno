# CLI ChatGPT

A simple CLI chatbot that calls the OpenAI API, written in TypeScript/Deno.


## Usage

1. Set the `OPENAI_API_KEY` environment variable to your OpenAI API key.

   ```bash
   export OPENAI_API_KEY="your-openai-api-key"
   ```

1. Run the CLI chatbot.

   Execute the `chat.ts` file directly:

   ```bash
   ./chat.ts
   ```

   This requires the `deno` executable to be in your `$PATH`.

   **OR**

   Run the `chat.ts` file with `deno`:

   ```bash
   deno run --allow-all chat.ts
   ```

