---
outline: deep
---

# Get Started Building AI

_Beginner Course · Week 1_

---

## Learning Objectives

By the end of this lesson you will be able to:

- Explain what an AI model is and how it generates a response
- Install and run a local open-source AI model on your own machine
- Write and refine a basic prompt to get useful output

---

## What We Will Learn

In this first week we set up your machine so you can experiment with AI entirely offline. No cloud account required — everything runs locally. You will meet the tools we will use throughout the course and send your very first prompt.

### Outline

1. **What is an AI model?** — a plain-language explanation of how language models work
2. **Installing your tools** — step-by-step setup for your operating system
3. **Running your first model** — starting the model and verifying it works
4. **Writing your first prompt** — prompt basics and how to iterate

---

## Expectations

### What you need before you start

- A laptop or desktop computer (Mac, Windows, or Linux)
- At least 8 GB of RAM and 10 GB of free disk space
- Basic comfort navigating your file system and opening a terminal

### What you will have when you finish

- A working local AI model you can chat with
- A saved prompt you wrote and refined yourself

### Time estimate

~2 hours of guided work + 1 hour of independent practice

---

## Lesson Content

### What is an AI model?

An AI model is a computer program that has been trained on large amounts of text to recognize patterns and generate new text. Think of it like a very advanced autocomplete — it predicts the next word based on the words that came before it.

**Key concepts:**

- **Training**: The model learns by analyzing millions of documents, books, and websites. It doesn't "know" facts — it learns statistical patterns about which words tend to follow other words.
- **Inference**: When you give the model a prompt, it runs through its learned patterns to generate a response. This is called inference.
- **Parameters**: Models have billions of "knobs" (parameters) that get tuned during training. More parameters generally means more capability, but also requires more computer memory.

**Local vs. cloud AI:**

| Local AI | Cloud AI |
|----------|----------|
| Runs on your machine | Runs on someone else's server |
| No internet required | Requires internet connection |
| Your data stays private | Your data is sent to a third party |
| Free to use (no API costs) | Often costs money per request |
| Smaller, faster models | Larger, more capable models |

For this course we use **local AI** because it's private, free, and helps you understand how the technology actually works under the hood.

### Installing your tools

We will use [Ollama](https://ollama.ai), a free and open-source tool that makes it easy to run AI models on your own computer.

**Step 1: Download and install Ollama**

1. Open your web browser and go to [https://ollama.ai](https://ollama.ai)
2. Click the **Download** button for your operating system (macOS, Windows, or Linux)
3. Open the downloaded file and follow the installation instructions
4. Once installed, you should see the Ollama icon in your menu bar (macOS) or system tray (Windows)

**Step 2: Verify the installation**

Open a terminal (Command Prompt on Windows, Terminal on macOS/Linux) and run:

```bash
ollama --version
```

You should see a version number printed. If you get an error, try restarting your terminal or reinstalling Ollama.

**Step 3: Choose a model**

For this course we will use **Llama 3.2** (or the latest small model available). Small models run faster and use less memory while still being capable.

### Running your first model

**Step 1: Pull the model**

In your terminal, run:

```bash
ollama pull llama3.2
```

This downloads the model to your machine. The download is about 2-3 GB and may take a few minutes depending on your internet speed.

**Step 2: Start a chat session**

Once the download completes, run:

```bash
ollama run llama3.2
```

You will see a prompt where you can type messages. The model will respond to each message.

**Step 3: Test it out**

Type a simple message like:

```
Hello! Can you tell me a fun fact about plants?
```

The model will generate a response. Notice how it:
- Understands your question
- Produces a relevant answer
- May take a few seconds to generate

**Step 4: Exit the chat**

Type `/bye` and press Enter to exit the chat session.

### Writing your first prompt

A **prompt** is the input you give to an AI model. The quality of the output depends heavily on the quality of the input. This is called **prompt engineering**.

**Prompt anatomy:**

A good prompt usually includes:
- **Context**: Background information the model needs
- **Instruction**: What you want the model to do
- **Format**: How you want the response structured

**Example — weak prompt:**

```
Tell me about plants.
```

This is too vague. The model doesn't know what aspect of plants you care about.

**Example — better prompt:**

```
I'm a beginner gardener growing tomatoes on my balcony. Give me 3 tips for watering them correctly. List each tip as a bullet point.
```

This prompt includes context (beginner gardener, balcony, tomatoes), a clear instruction (3 tips for watering), and a format (bullet points).

**Your turn — refine a prompt:**

1. Start a chat session with `ollama run llama3.2`
2. Try this prompt: `Give me plant care advice.`
3. Notice the response — is it useful? Too general?
4. Now refine it. Add details about:
   - What kind of plant you have
   - Where it lives (indoors, outdoors, pot, ground)
   - How much time you can spend on care
   - What format you want the answer in
5. Try your refined prompt and compare the results

**Save your best prompt:**

Create a text file called `my-first-prompt.txt` and save your best prompt in it. You'll use this in future lessons.

---

## Check Your Understanding

1. What is the difference between a language model and a chatbot?
2. Where does your model run — on your machine or in the cloud?
3. What changed when you rewrote your prompt to be more specific?
4. Why might you choose a local AI model over a cloud-based one?

---

## Next Steps

- [Week 2 — Understanding Training Data](/week-2) — learn how AI learns from data and how to use it responsibly
- Try running a different model: `ollama pull phi` or `ollama pull tinyllama`
- Experiment with prompts about your own interests — cooking, music, coding, etc.