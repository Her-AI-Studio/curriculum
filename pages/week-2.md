---
outline: deep
---

# Understanding Training Data

_Beginner Course · Week 2_

---

## Learning Objectives

By the end of this week you will be able to:

- Explain the difference between cloud-hosted AI and locally-running AI, including the privacy trade-offs of each
- Define data sovereignty and give a real-world example of why it matters to you personally
- Install and run an open-source AI model on your own machine without a cloud account or internet connection
- Train a small custom image classifier using data you collected yourself
- Describe what a model "guardrail" is and explain why someone would add one

---

## What We Will Learn

Last week you got a local AI model running on your machine. But where did that model come from? How did it learn to generate responses? This week we pull back the curtain and look at the **data** that powers AI — where it comes from, what's in it, and why it matters.

### Outline

1. **What is training data?** — the raw material that teaches AI models
2. **How AI learns from data** — a simple look at the training process
3. **Bias in data** — how the data we choose shapes what AI "knows"
4. **Responsible AI principles** — fairness, accountability, transparency, and privacy

---

## Expectations

### What you need before you start

- A working Ollama installation from Week 1
- A text editor (any will do)
- Curiosity about how things work under the hood

### What you will have when you finish

- A clear mental model of how training data shapes AI behavior
- A bias-checked dataset idea for your Plant Journal project
- A personal "Responsible AI Checklist" you can apply to any project

### Time estimate

~2 hours of guided work + 1 hour of independent practice

---

## Lesson Content

### What is training data?

Training data is the collection of examples used to teach an AI model. Just as you learn to recognize a cat by seeing many pictures of cats, an AI model learns patterns by processing many examples.

**Types of training data:**

| Type | Example | Used For |
|------|---------|----------|
| Text | Books, articles, websites | Language models (like Llama) |
| Images | Photos, drawings, diagrams | Image recognition models |
| Audio | Speech recordings, music | Speech-to-text, music generation |
| Structured data | Spreadsheets, databases | Prediction and classification models |

**Where does training data come from?**

Most large language models are trained on data scraped from the public internet — Wikipedia, books, academic papers, forums, social media, and more. The model you downloaded last week (Llama 3.2) was trained on trillions of words from these sources.

**Why does this matter?**

The model's knowledge is entirely shaped by its training data. If the data contains certain viewpoints, facts, or language patterns, the model will reflect those. If the data is missing certain topics, the model will know nothing about them.

### How AI learns from data

Training a language model happens in three main phases:

**Phase 1: Pre-training**

The model is given a massive amount of text and learns to predict the next word in a sentence. For example:

```
Input:  "The capital of France is ___"
Output: "Paris" (correct prediction)
```

Over billions of examples, the model builds a statistical understanding of language — grammar, facts, reasoning patterns, and even cultural knowledge.

**Phase 2: Fine-tuning**

The pre-trained model is further trained on carefully curated examples to improve its behavior. This is where:
- The model learns to follow instructions
- Harmful outputs are reduced
- The model is aligned with human values

**Phase 3: Inference (what you did last week)**

The trained model is frozen and used to generate responses. No more learning happens — it simply applies what it already knows.

**Analogy: Learning to cook**

- **Pre-training** is like reading thousands of cookbooks. You learn techniques, ingredients, and flavor combinations.
- **Fine-tuning** is like practicing with a chef who corrects your mistakes.
- **Inference** is when you cook a meal for friends using everything you've learned.

### Bias in data

Bias in AI occurs when the training data over-represents or under-represents certain groups, perspectives, or information. Since models learn from data, they can amplify the biases present in that data.

**Common types of bias:**

| Bias Type | Example |
|-----------|---------|
| **Gender bias** | A model associates "nurse" with women and "engineer" with men because training data reflects historical stereotypes |
| **Cultural bias** | A model knows more about Western plants than tropical or desert plants because training data has more Western content |
| **Representation bias** | A model performs poorly on certain accents or dialects because those were rare in training data |
| **Confirmation bias** | A model agrees with the user's stated opinion rather than providing balanced information |

**Why this matters for your Plant Journal:**

Imagine you build a plant classifier. If your training data has:
- 90% images of common houseplants (pothos, snake plants, monstera)
- 10% images of all other plants

Your model will be great at identifying pothos but terrible at identifying anything else. The model isn't "wrong" — it's reflecting the data it was given.

**Activity: Spot the bias**

Think about the Plant Journal project. What kinds of plants do you want to identify? Consider:

1. What plants are common in your region?
2. What plants might be missing from typical training data?
3. How would the model perform for a gardener in a different climate?

### Responsible AI principles

Responsible AI means building and using AI systems in ways that are fair, transparent, and accountable. These principles help ensure AI benefits everyone and harms no one.

**The four core principles:**

**1. Fairness**
AI systems should treat all people fairly and not discriminate.
- *For your Plant Journal:* Ensure your model works equally well for common and rare plants. Don't assume everyone grows the same things.

**2. Accountability**
Someone should be responsible for what an AI system does.
- *For your Plant Journal:* You are responsible for the care tips your model gives. Always verify AI suggestions before following them — especially for living things like plants!

**3. Transparency**
Users should know when they are interacting with AI and understand its limitations.
- *For your Plant Journal:* Be clear that care tips come from an AI model, not a botanist. Label AI-generated content.

**4. Privacy**
Personal data should be protected and used responsibly.
- *For your Plant Journal:* Since you're running locally, your plant photos and check-in data stay on your machine. This is a privacy advantage of local AI.

**Your Responsible AI Checklist:**

Create a file called `responsible-ai-checklist.txt` and add these questions. You'll use it throughout the course:

```
☐ Who might be affected by this AI system?
☐ What data was used to train it? Is that data representative?
☐ Can I explain how the AI reached its conclusion?
☐ Are users aware they are interacting with AI?
☐ Is sensitive data being protected?
☐ What happens if the AI makes a mistake?
```

---

## Check Your Understanding

1. What is training data and why does it matter for AI?
2. Name two types of bias that can appear in AI training data.
3. How does the "garbage in, garbage out" principle apply to AI?
4. List the four core principles of responsible AI.
5. Why is local AI generally better for privacy than cloud AI?

---

## Next Steps

- [Week 3 — Building Your Plant Classifier](/week-3) — put your knowledge into practice by building a simple image classifier
- Review the training data for a model you use every day (search for "[model name] training data" online)
- Share your Responsible AI Checklist with a friend and discuss