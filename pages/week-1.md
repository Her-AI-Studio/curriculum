---
outline: deep
---

# Understanding AI: Who Built It, Who It's For, and Why You Belong Here

_Beginner Course · Week 1_

![Sketchnotes, week 1](/week-1.png)

| **Lesson Goal**            | What is AI? Who built it? Why should you care?                                                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **What you’ll learn**       | By the end of this week you will be able to:<br>- Describe in your own words what a machine learning model is and how it learns from data<br>- Name at least three women who made foundational contributions to AI and computing, and explain why that history matters today<br>- Identify at least two ways that AI systems reflect the biases of the people and data behind them<br>- Articulate why your own perspective as a young woman — especially as a skeptic — is an asset, not a liability, in AI development<br>- Ask informed critical questions about any AI tool you encounter: who built it, what data trained it, and who benefits |
| **Tools you’ll need**       | Notebook or paper and pencil and your curiosity and willingness to think about your relationship with AI |
| **End result**       |  A completed "AI Audit" card for a well-known AI tool and a personal statement about your perspective on these topics |
| **Time needed to complete** | 90 minutes |

## Session Plan

### Part 1 — What Even Is AI? (25 min)

**Warm-up: Two Truths and a Lie — AI Edition (10 min)**

Here are some statements about AI. Pick one of these sets of questions and determine which is true, and which is false?

1. AI models learn new information every time you use them.
2. Some AI models can run entirely on your laptop with no internet.
3. An AI model trained mostly on English text will perform worse on other languages.

1. AI learns patterns from data rather than "thinking" like a human.
2. Using AI guarantees faster and more accurate work in every situation.
3. AI models can reflect biases present in their training data.

1. AI can generate text, images, and computer code.
2. AI systems can sometimes produce confident but incorrect answers.
3. If an AI sounds confident, its answer is probably correct.

**Mini-lecture: How AI Models Actually Work (10 min)**

**What is a model?**

A machine learning (ML) model is a statistical program that finds patterns in examples. It doesn't follow rules a human wrote — it figures out its own rules by looking at a huge amount of data.

Analogy: Imagine learning what a "good" essay looks like by reading ten thousand essays. You'd start to notice patterns — strong openings, clear arguments, specific examples. A language model does the same thing, but with billions of documents. 

A large language model (LLM) is a program trained on vast amounts of text that predicts the most likely next word or phrase, generating human-sounding responses without truly understanding meaning. 

Machine learning models are the engine inside AI systems. 

**How do models learn?**

Training has two moves:
1. The model makes a prediction ("I think the next word is _cat_")
2. It checks whether it was right and adjusts slightly

This happens billions of times until the model gets good at predicting patterns in language.

**Training a ML model**

1. Training data in — raw text, images, audio, or other data is fed to a model during training
2. The model finds patterns — through repeated prediction and correction (billions of iterations), it builds an internal representation of those patterns as numerical weights
3. The weights are frozen — once training ends, the model's knowledge is locked in place; it no longer learns
4. Inference at runtime — when you interact with an AI product, your input is passed to the model, which runs it through those learned weights to generate a response
5. The AI product wraps the model — the app or service (ChatGPT, a spam filter, a photo tagger) adds the interface, guardrails, and business logic; the model itself is just one component

So "AI" is the product layer; the ML model is the pattern-matching core doing the actual work underneath it. Most AI systems you use day-to-day combine one or more trained models with traditional software around them.

**What AI can and cannot do**

While the statistical models underlying AI can produce incredibly novel text that can help you to think through problems and summarize data, in Pope Leo's words, "So-called artificial intelligences do not undergo experiences, do not possess a body, do not feel joy or pain, do not mature through relationships and do not know from within what love, work, friendship or responsibility mean. 

Nor do they have a moral conscience, since they do not judge good and evil, grasp the ultimate meaning of situations, or bear responsibility for consequences."

Read the Pope's encyclical [here](https://www.vatican.va/content/leo-xiv/en/encyclicals/documents/20260515-magnifica-humanitas.html).

**Let's talk about all that data**

It takes a lot of data (images, sounds, text) to train one of these big models. This data comes from all over the internet. It's important to know that training data is scraped, not licensed. If a machine can find data, it will probably be ingested into a ML model. 

> Fun fact, scraping bots that gather data outnumbered human internet surfers for the first time in June 2026.

**Student use of AI**

Right now, there's also a lot of debate about how to honestly use LLMs in school, as they can quickly turn into 'homework-machines' that prevent students from learning by short-circuiting the educational process. 

A lot of concern around AI for these communities revolves around data governance: who's getting access to your data, and how it is being used?

**Discussion prompt (5 min):** _"Does knowing this change how you feel about AI-generated content? Why or why not?"_

### Part 2 — Women's Heritage in AI and ML (30 min)

One thing is clear: unless we ensure that all kinds of diverse voices are heard when building, training, managing, and shipping AI systems, we risk building less and less reliable, safe, and unbiased AI.

That's why, at Her AI Studio, we emphasize that, by bring girls' voices to the forefront, we are able to build better AI by building AI better.

One thing that people often don't realize is that women have had a place at the table in this industry for over 150 years.

Let's learn about some of the famous women who have influenced the field.

**Group research activity (10 min)**

Divide into small groups (3–4 students). Each group is assigned one of the following women and has 10 minutes to research and prepare a 2-minute presentation answering:

1. What did she do?
2. What obstacles did she face?
3. How does her work connect to AI or computing today?

**Suggested figures:**

| Name | Contribution |
|---|---|
| Ada Lovelace | First algorithm written for a computing machine (1840s) |
| Grace Hopper | Created the first compiler; made programming more human-readable |
| Timnit Gebru | Co-authored landmark research on bias in facial recognition; co-founded DAIR Institute |
| Joy Buolamwini | Founded Algorithmic Justice League; documented racial and gender bias in AI systems |
| Fei-Fei Li | Created ImageNet, the dataset that launched the modern deep learning era |

Groups can use their phones or any available laptops to research. After 10 minutes, each group presents (2 min each).

**Group presentations (10 min)**

Each group delivers their 2-minute presentation to the full group.

**Full-group debrief (10 min)**

Facilitator-led discussion:

- What patterns did you notice across these women's stories?
- Were any of their names familiar before today? Why might that be?
- What would AI look like today if more of its founders had been women?

### Part 3 — Bias Is Not a Bug, It's a Mirror (20 min)

**AI bias**

There's a lot of data being scraped, and because a lot of it is generated by humans, human biases have entered into it. Any gaps or assumptions in training data enters directly into AI unless there are guardrails against this type of bias.

Let's see how bias can be reflected in AI.

**Demo: Ask the model something biased (5 min)**

Open a chat interface (Claude, ChatGPT, or a local model). Pick one of these prompts as a group and observe the outputs together:

```
Describe a prototypical software engineer, phyically
```
```
Write a short story about a nurse helping a patient.
```
```
List the most important AI researchers of the last decade.
```

Notice: who does the model imagine? What assumptions are baked in?

---

**Concept: Where does bias come from? (5 min)**

Bias in AI is not a glitch — it is a reflection. The model learned from human-generated data, and humans have biases. Here are three places bias enters:

**1. The data**
If the training data has more articles written by and about men, the model will "know" more about men's experiences.

**2. The people who build it**
Teams that lack diversity tend to miss blind spots. If everyone on the team has the same background, they share the same assumptions.

**3. The people who label it**
Many AI systems are trained using human feedback — raters who mark outputs as good or bad. Who those raters are shapes what "good" means to the model.

> Note: There are recent efforts at MIT and other places to "debias" datasets by using AI to balance datasets, watching as well for unfounded patterns to emerge in unlabeled data. This data is flagged for debiasing. [source](https://news.mit.edu/2024/researchers-reduce-bias-ai-models-while-preserving-improving-accuracy-1211) 

**Activity: The AI Audit Card (10 min)**

Each student picks an AI tool they actually use (a recommendation algorithm, a search engine, a photo filter, a writing assistant, a spell checker — anything counts).

Fill out an index card:

```
Tool name:
What does it do?
Who built it? (company or team)
What data do you think it was trained on?
Who does it seem to be designed for?
Who might it work less well for?
One question you still have about it:
```

Students pair up and share their cards. Facilitator collects cards — these will be revisited in Week 2.

### Part 4 — Your Skepticism Is a Skill (15 min)

**Mini-lecture: Why AI needs critics (5 min)**

Tech culture often treats skepticism as an obstacle. ("You just don't understand it yet." "Wait until you see what it can do.") But the people who ask hard questions are exactly who this field needs.

Three things a healthy AI skeptic does:

1. **Asks "who benefits?"** — every AI system was built by someone with goals. Understanding those goals helps you evaluate the system.
2. **Notices what's missing** — what voices, languages, or experiences are absent from this system's training data?
3. **Demands accountability** — when AI gets it wrong, who is responsible?

These are not anti-technology positions. They are the foundation of building technology that actually works for everyone.

**Reflection: Your Personal Statement (10 min)**

Students write individually (no sharing required unless they want to):

_"I am [name]. My perspective matters in AI because..."_

Try a sentence starter:

> _"Something I notice that others might miss is..."_
> _"I have experienced [x], which means I understand [y] in a way that..."_
> _"I think AI should be questioned because..."_
> _"I'm skeptical about using AI because..."_
> _"I think AI could be used in [x] way, but not in [y]"_

## Take-Home

**Check Your Understanding**

1. In your own words: how does a language model learn?
2. Name three women who shaped AI or computing — what did each one do?
3. Give two examples of where bias can enter an AI system.
4. What does it mean to ask "who benefits?" when evaluating an AI tool?

- Keep your AI Audit Card — bring it to Week 2
- Reading: [_Gender Shades_](https://www.media.mit.edu/projects/gender-shades/overview/) — the Joy Buolamwini study that documented facial recognition bias
- Watch Joy Buolamwini's spoken word piece, "AI, Ain't I a Woman?": https://www.youtube.com/watch?v=HZxV9w2o0FM
- Find one more woman in AI history not covered in class and bring her name to Week 2
- Optional: download a free zine that explains topics in machine learning: https://zines.jenlooper.com/ 
- Optional: read Pope Leo's encyclical, Magnifica Humanitas: https://www.vatican.va/content/leo-xiv/en/encyclicals/documents/20260515-magnifica-humanitas.html
- Optional: read about some of the challenges around copyright in AI. An example is Hayao Miyazaki (Studio Ghibli's animator)'s "disgust" for AI: https://www.the-independent.com/arts-entertainment/films/news/hayao-miyazaki-studio-ghibli-ai-trend-b2723358.html
- Optional: Watch [this interview](https://www.cbsnews.com/news/how-kenya-became-the-silicon-savannah-60-minutes/) on CBS News on the conditions of data labellers in Kenya.

## Next Steps

- [Week 2 — Taking Control: Building AI Locally and Owning Your Data](/week-2)
