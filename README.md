# CLI ChatGPT

A simple CLI chatbot that calls the OpenAI API, written in TypeScript/Deno.

```
$ export OPENAI_API_KEY="your-openai-api-key"

$ ./chat.ts 
This is a simple GPT-powered chat interface.
Starting a chat with GPT.
Type 'quit' to end the conversation.
You can also type 'restart' to start a new conversation.


You: hello

ChatGPT: Hello! How can I assist you today?


You: What's Candy Mountain?

ChatGPT: Candy Mountain is a fictional location commonly associated with a popular internet video called "Charlie the Unicorn." In the video, Charlie is convinced by his friends, Pink and Blue unicorns, to go on a journey to Candy Mountain, where they believe a magical candy-filled paradise awaits them. However, things take a surprising turn in the video. It has become a popular meme and has gained quite a following on the internet.


You: 
```


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

