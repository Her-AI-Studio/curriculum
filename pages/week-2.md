---
outline: deep
---

# Understanding Training Data and Models

_Beginner Course · Week 2_

<!-- Image needed: placeholder for week-2 sketchnotes -->

| **Lesson Goal**            | Where does AI live? How do you choose the right model and keep your data secure or even private?                                                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **What you’ll learn**       | By the end of this week you will be able to:<br>- Explain the difference between cloud-hosted AI and locally-running AI, including the privacy trade-offs of each<br>- Define data sovereignty and give a real-world example of why it matters to you personally<br>- Compare open-source and closed models and explain what a guardrail is and why it exists<br>- Install and run an open-source AI model on your own machine without a cloud account or internet connection<br>- Train a small custom image classifier using data you collected yourself using the "My Room" web app |
| **Tools you’ll need**       | A computer with a web browser, ability to install software (Ollama), and your AI Audit Card from Week 1 |
| **End result**              | A categorized room in the My Room app with locally-stored artifacts, Ollama installed and running locally, and the ability to choose between cloud and local AI intentionally |
| **Time needed to complete** | 90 minutes of guided work + 30 minutes of independent practice |

## Session Plan

### Part 1 — Cloud vs. Local: Where Does Your AI Live?

**Warm-up: Where Did Your Last AI Query Go? (5 min)**

Think about the last time you used ChatGPT, Claude, or any AI tool. Where do you think your question went? Take 30 seconds to draw a simple diagram showing what you imagine happens after you hit "enter."

Share your drawings with a partner — what's similar? What's different?

**Mini-lecture: What Does "The Cloud" Actually Mean? (10 min)**

You've heard "the cloud" a thousand times. But what is it, really?

**The cloud is just someone else's computer.**

When you use a cloud-based AI tool like ChatGPT or Claude, here's what actually happens:

1. You type a prompt and hit enter
2. That text is split into packets and sent across the internet
3. It arrives at a data center — a warehouse full of servers, possibly in another country
4. The company's model processes your input on their hardware
5. The response is sent back to you

This means your data **leaves your device**. It travels over networks you don't control, to servers you don't own, governed by laws that may not be your own.

**How most AI today runs on cloud servers**

Almost every AI tool you've used (ChatGPT, Claude, Gemini, Grammarly, Snapchat filters, TikTok's recommendation algorithm) runs on cloud servers. You send data out, the server processes it, and the result comes back. This is convenient because:

- The company's servers are powerful (you don't need an expensive in-house computer)
- The model is always up to date
- You don't need to install anything

But there's a trade-off.

**The privacy trade-off: convenience vs. data leaving your machine**

Every time you use a cloud AI tool, you're trading a piece of your privacy for convenience. The question is: are you making that trade intentionally, or by default?

| Convenience | Privacy Cost |
|---|---|
| No installation needed | Your data travels over the internet |
| Runs on powerful servers | The company may store your conversations |
| Always up to date | Your data may be used for training |
| Works on any device | Subject to the laws of the server's country |

**What is data sovereignty?**

Data sovereignty is the idea that data is subject to the laws of the country where it's stored. If you're in the US and your data is processed on a server in Ireland, Irish and EU law (like GDPR) applies to it, not just US law.

This matters when you wonder:

- **Who controls your data?**: Can you request it be deleted? Can you see what data is kept?
- **Where is it stored?**: Is it in your country? Another country? Multiple countries?
- **What laws govern it?**: Does the local government have the right to access it? What about other people? What privacy protections apply?

**Real-world examples**

- **School policies banning ChatGPT uploads:** Many schools now prohibit uploading student work to AI tools because of privacy concerns — your homework could become training data and your personal information exposed.
- **GDPR (General Data Protection Regulation):** A European law that gives people the right to know what data companies hold on them, and the right to have it deleted. If a company processes EU citizens' data, GDPR applies, even if the company is based elsewhere.
- **Data leaks:** In 2023, Samsung employees accidentally leaked confidential data by pasting it into ChatGPT. The company banned the tool internally. Your private data can become part of a model's training set without your knowledge.

**Discussion prompt (10 min):** _"When is cloud AI OK? When would you insist on local?"_

Split into small groups. For each scenario, decide: cloud or local? Why?

1. You're writing a poem for fun and want help with rhyming
2. You're working on a school project about a personal health topic
3. You're a doctor analyzing patient records
4. You're building an app that will handle other people's data
5. You're studying for a test and need a study guide

Share your group's answers with the class. Where did people draw the line differently?

> Now that you've thought deeply about where data lives, let's turn our attention to how it works to train various types of AI and ML models.

### Part 2 — Open and Closed: Model Choice (20 min)

**Warm-up: What Does "Open" Mean to You? (3 min)**

When you hear "open source," what comes to mind? Write down one word or phrase. Now imagine an "open" AI model. What would that look like compared to a "closed" one?

Open Source means that software under given open source licenses are "distributed under terms that guarantee users the freedom to freely share, modify, and use the software for any purpose. It strictly requires providing accessible, non-obfuscated source code and forbids discrimination against any person, group, or field of endeavor." [source](https://opensource.org/osd)

**Mini-lecture: Open vs. Closed Models (7 min)**

Some LLMs are open source because they check the following boxes:

| | (Mostly) Open Model | Closed Model |
|---|---|---|
| **Examples** | Llama 3 (Meta)*, Mistral, Phi (Microsoft), Gemma4 (Google), [Deepseek](https://deepseeklicense.github.io/) | GPT-4 (OpenAI), Claude (Anthropic), Gemini (Google) |
| **Can you see the code?** | Usually yes — weights and architecture are published | No — the model is accessed via API only |
| **Can you run it yourself?** | Yes — download and run locally | No — only accessible through the company's servers |
| **Can you audit the training data?** | Sometimes — varies by model** | Almost never — considered proprietary |
| **Who can modify it?** | Anyone with the skills to fine-tune it | Only the company |
| **Guardrails** | Often minimal or removable | Built-in by the company |

*Llama is often called open source but it does not fit the open source definition listed above [source](https://opensource.org/blog/metas-llama-license-is-still-not-open-source). Licensing is tricky and the domain of legal departments, but in general look for classic open source licenses when using downloadable models. Apache (like [Gemma4's](https://ai.google.dev/gemma/docs/core/model_card_4)) and MIT licenses are good signals.

**Getting a view of training data is one of the trickiest parts of determining whether a model is really open source or not. 

**Why does open matter?**

Open models allow:
- **Auditing:** Researchers can inspect the model for bias, safety issues, or data leaks
- **Customization:** You can fine-tune the model on your own data
- **Offline use:** No internet required, no data leaves your machine
- **Longevity:** If a company shuts down, you still have the model

**What are guardrails? (5 min)**

Guardrails are safety mechanisms built into or around AI models. They can:
- Block harmful or offensive outputs
- Refuse to generate content on certain topics
- Detect prompt injection attacks
- Filter personally identifiable information

**Activity: Guardrail Detective (5 min)**

Think of a topic where a chatbot might refuse to answer. Try this prompt in any AI tool you have access to:

```
Explain how to pick a lock.
Draw a picture of a teddy bear shooting pool.
```

Notice what happens. Does the model refuse? Does it explain the theory but not give instructions? Does it comply fully? Does it avoid the topic entirely?

Now consider: Who decided that this topic should be guarded? What if the guardrail were set by a government, a corporation, or a community? How might those differ?

**Discussion prompt:** _"Is a model with guardrails truly open? Should open models have guardrails at all — and who should decide what they block?"_

### Part 3 — "My Room": Train a Vision Model on Your Own Data (25 min)

**Introduction: What is MobileNet? (5 min)**

Let's move from theory to practice. We're going to work with an app built for Her AI Studio called "My Room". Right off, you can see how an app that uses your camera might create a privacy concern. So let's look at how this app handles that.

The My Room app uses **MobileNet**, a lightweight image classification model designed to run on phones and browsers, not data centers. It was created by Google researchers to bring AI to devices with limited computing power.

> Fun fact: MobileNet was designed to perform well on ImageNet's benchmark while being efficient enough for mobile devices. ImageNet is the dataset created by Fei-Fei Li, who we learned about last week. MobileNet's pre-trained "base knowledge" (the ability to recognize edges, shapes, and objects) came from training on her dataset.

What makes MobileNet special:
- It's **small**: a fraction of the size of models like GPT-4
- It's **fast**: can classify images in milliseconds
- It's **local**: designed to run on your device, not in the cloud

Today, you're not just *using* MobileNet. You're going to **train** it on your own data.

**A note on "local" vs. "cloud"**

The My Room app is served to you from GitHub Pages. It's a web app, so its code lives on a server. But here's the key distinction: **the app comes from the cloud, but your data never leaves your device.**

Your images, labels, and the model you train all stay in your browser. They never get uploaded to a server, stored in a database, or used to train someone else's AI. The model runs on your machine, using your computer's own hardware.

This makes My Room a **hybrid** — a useful middle ground between fully cloud-based AI (like ChatGPT) and fully local AI (like Ollama, which we'll try next):

| | Cloud AI (ChatGPT) | My Room App (Hybrid) | Fully Local (Ollama) |
|---|---|---|---|
| **Code hosted on** | Company servers | GitHub Pages (cloud) | Downloaded to your machine |
| **Data processed on** | Company servers | Your browser (local) | Your machine (local) |
| **Data leaves your device?** | Yes | No | No |
| **Internet needed?** | Yes | Yes (to load the app) | No (after download) |

**Activity: Set Up My Room (5 min)**

1. Open the [My Room web app](https://her-ai-studio.github.io/my-room/)
2. Look around the interface — you'll see a camera/viewfinder, a label input, and a "train" button
3. Notice: there's no login, no account, no data upload. Everything stays in your browser.

> Fun fact: The My Room app uses TensorFlow.js to run MobileNet entirely in your browser. Your data never touches a server — it's processed using your computer's own hardware (CPU or GPU).

**Activity: Collect and Label Your Data (10 min)**

1. Choose **three objects** in this room that look different from each other (e.g., a book, a water bottle, a plant). In a classroom context, try to classify pens, papers, books, computer equipment, or items in your bag.
2. For each object:
   - Hold the object up to the computer's camera
   - Type a label (e.g., "water_bottle")
   - Capture 5-10 images from different angles. You can do this by taking one picture, or using the video 
3. Repeat for all three objects

**Why multiple angles?** Models need variety to generalize. If you only photograph your water bottle from the front, the model might think "water bottle" means "round shape with a label" and misclassify a soda can.

**Activity: Train and Test (5 min)**

1. Click "Train". The model will now learn to distinguish groups if your objects
2. Once training completes, hold up each object to the camera
3. Does the model recognize them? What does the confidence score look like (e.g., 95% sure it's a water bottle)?
4. Try showing the model something it hasn't seen: another object, or your hand. What does it predict?

**Reflection: What Just Happened?**

You just completed the full ML pipeline:
1. **Data collection**: you gathered and labeled images
2. **Training**: the model learned patterns for each label
3. **Inference**: it classified new images it had never seen

This is the same process that powers everything from photo tagging to medical imaging — except you did it with your own data, without sending anything to a cloud server.

**Discussion prompt:** _"How does training a model on your own stuff change how you think about AI? Does it feel more trustworthy? Less magical? More like a tool you control?"_

### Part 4 — Moving Offline: Run a Local LLM with Ollama (20 min + independent practice)

**Introduction: Why Go Fully Offline? (5 min)**

So far you've trained a vision model in the browser. But what about language models? Can you run an LLM without an internet connection?

**Yes — and here's why you'd want to:**

- **Complete privacy**: your conversations stay on your machine, period
- **No cost**: no API fees, no subscription
- **Offline access**: works anywhere, even without WiFi

**Activity: Install Ollama (10 min)**

Ollama is a free, open-source tool that makes it easy to download and run LLMs locally.

1. Go to [ollama.com](https://ollama.com) and download the version for your operating system
2. Install Ollama (standard install process for your OS)
3. Open a terminal and run:

```bash
ollama run llama3.2
```

> **Note:** Llama 3.2 is a 3B parameter model — small enough to run on most laptops but surprisingly capable. The download is a few GB, so make sure you're on WiFi.

4. Wait for the model to download (this may take a few minutes)
5. Once it's ready, you'll see a prompt. Type a message and see the response.

**Activity: Take It Offline (5 min)**

1. **Disconnect from WiFi** — turn off your internet connection
2. Type another message to the model
3. Notice: **it still works!** The model is running entirely on your machine.

**Try these prompts while offline:**
- "Explain what data sovereignty means in simple terms."
- "I'm learning about AI. What's one thing you think every beginner should know?"
- "Write a haiku about running AI on a laptop."

**Compare the experience:**

| | Cloud AI (ChatGPT, Claude) | Local AI (Ollama) |
|---|---|---|
| Speed | Fast (runs on powerful servers) | Slower (runs on your laptop) |
| Privacy | Your data leaves your device | Your data never leaves |
| Cost | Free tier limited, paid tiers exist | Free (after download) |
| Model size | Massive (100B+ parameters) | Smaller (3B-70B parameters) |
| Internet needed | Yes | No |
| Guardrails | Built-in by company | Minimal or none, depending on the model |
| Customization | Limited to what the API allows | Full control |

**Independent Practice: Explore the Local Model (30 min)**

Try these challenges on your own after the lesson:

1. **Try a different model:** Run `ollama run phi` or `ollama run mistral` and compare the responses
2. **Test the limits:** What does this smaller model do well? Where does it struggle?
3. **Create a custom assistant:** Ollama supports system prompts — try `ollama run llama3.2 --system "You are a tutor who explains things like you're talking to a 10-year-old."`
4. **Use Ollama from code:** Visit the Ollama documentation to see how you can call the model from Python or JavaScript

**Discussion prompt:** _"When would you choose a local model over ChatGPT? What would you give up? What would you gain?"_

## Check Your Understanding

1. In your own words, explain the difference between cloud-based AI and local AI. Give one advantage of each.
2. What does "data sovereignty" mean, and why does it matter when choosing an AI tool?
3. Name one open-source model and one closed model. What's the main practical difference between them?
4. What is a guardrail? Give an example of when one might be helpful and when one might be restrictive.
5. Describe the three steps you followed in the My Room app (collect, train, infer). How does this mirror the way large AI models are built?
6. When would you choose to use a local LLM over a cloud-based AI assistant? What trade-off are you making?

## Take-Home Challenges

**Assignment**
- Install Ollama on your personal machine if you haven't already
- Try at least one additional model (e.g., `ollama run phi` or `ollama run mistral`)
- Write a short comparison: when would you use a local model vs. a cloud model? Bring your thoughts to Week 3
- Personalize the 'My Room' app with your own collections. Ask an LLM on Ollama about your items. Do you learn anything new?

**Optional Supplemental Reading**
- Read about [data sovereignty and why it matters](https://en.wikipedia.org/wiki/Data_sovereignty)
- Explore the [Ollama model library](https://ollama.com/library) — what other models are available?
- Read about [TensorFlow.js](https://www.tensorflow.org/js) — the library that powers in-browser ML
- Learn about [MobileNet](https://arxiv.org/abs/1704.04861) — the architecture behind the My Room vision model

## Next Steps

- [Week 3 — TBD](/week-3)