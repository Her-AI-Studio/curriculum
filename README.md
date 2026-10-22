[![GitHub license](https://img.shields.io/github/license/Her-AI-Studio/curriculum.svg)](https://github.com/Her-AI-Studio/curriculum/blob/main/LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/Her-AI-Studio/curriculum.svg)](https://GitHub.com/Her-AI-Studio/curriculum/graphs/contributors/)
[![GitHub issues](https://img.shields.io/github/issues/Her-AI-Studio/curriculum.svg)](https://GitHub.com/Her-AI-Studio/curriculum/issues/)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/Her-AI-Studio/curriculum.svg)](https://GitHub.com/Her-AI-Studio/curriculum/pulls/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

[![GitHub watchers](https://img.shields.io/github/watchers/Her-AI-Studio/curriculum.svg?style=social&label=Watch&maxAge=2592000)](https://GitHub.com/Her-AI-Studio/curriculum/watchers/)
[![GitHub forks](https://img.shields.io/github/forks/Her-AI-Studio/curriculum.svg?style=social&label=Fork&maxAge=2592000)](https://GitHub.com/Her-AI-Studio/curriculum/network/)
[![GitHub stars](https://img.shields.io/github/stars/Her-AI-Studio/curriculum.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/Her-AI-Studio/curriculum/stargazers/)

# Her AI Studio Curriculum

**Women learning AI together** — build fun and personalized projects in a supportive in person studio. By working together and participating thoughtfully in this technology, we will be able to build a better AI, and help to build AI better.

**Authors:** Jen Looper and the Her AI Studio contributors

---

## About This Curriculum

Her AI Studio is a **project-based, three-tier curriculum** that takes students from critical first questions about AI all the way to assembling their own portable cyberdeck. Each tier builds on the last — software first, then hardware, then a final build you can take home.

The curriculum starts not with setup instructions, but with the question that matters most: **Who built AI, who is it for, and why do you belong here?** Students learn to think critically about AI systems — who benefits from them, where bias enters, and why skepticism is a skill, not a liability.

> **For students:** Watch https://heraistudio.org for a notice about the ability to apply to join an in person cohort to learn in community and earn the hardware elements of your cyberdeck. Not part of an in person cohort? That's ok! We will offer our kits for purchase soon. Work through each lesson at your own pace. Better yet, find a friend and go through it together.

---

## Course Structure

Five sessions, grouped into two "weeks" of paired sessions plus a standalone capstone:

| Week | Sessions | Focus | Outcome |
|------|----------|-------|---------|
| [Week 1: Discover](pages/week-1.md) | [Session 1 — Understanding AI](pages/1-understanding-ai.md) · [Session 2 — Working with Data](pages/2-working-with-data.md) | AI foundations, critical thinking, bias, training data, local AI | An AI Audit Card, a personal statement, Ollama running locally, and a small custom image classifier trained with the My Room app |
| [Week 2: Create](pages/week-2.md) | [Session 3 — Building with Arduino](pages/3-building-with-arduino.md) · [Session 4 — Kiku Wakes Up](pages/4-eyes-and-ears.md) | Arduino Uno Q, Bluetooth peripherals, rule-based logic, then real on-device AI (wake word + local LLM chat) | Kiku: a working Arduino pet with a Bluetooth-keyboard-driven personality, a wake word, and a chat interface |
| Capstone | [Your Cyberdeck](pages/5-cyberdeck-instructions.md) | An open-ended, self-directed build combining every peripheral and skill from the course | A complete, battery-powered, personally-designed cyberdeck ready for showcase |

Two more standalone pages round out the curriculum:

| Page | Purpose |
|------|---------|
| [Mini Workshop: Build a Pet](pages/mini-workshop.md) | A 60-minute, board-only taste of the course — flash a sketch, build a tiny on-device Kiku, no extra peripherals required |
| [CSTA Standards Mapping](pages/csta-standards.md) | Maps every session to 2026 CSTA PK–12 Computer Science Standards, for facilitators |

---

## Each Lesson Includes

- Sketchnote (in progress — not every lesson has one yet)
- Warm-up and knowledge-check quizzes
- Written lesson with a session plan broken into timed parts
- Step-by-step project guides (for project-based weeks)
- Discussion prompts and activities
- Check Your Understanding questions
- Take-home challenge and supplemental reading

---

## Lessons

| Session | Concepts Taught | Learning Objectives | Linked Lesson | Sketchnote | Author |
| ------- | ---------------- | -------------------- | :------------: | :--------: | ------ |
| 1 — Understanding AI: Who Built It, Who It's For, and Why You Belong Here | What is a model? Women in AI history. Bias as a mirror. Skepticism as a skill. | Describe how a language model learns · Name women who shaped AI · Identify where bias enters a system · Articulate why your perspective matters | [Lesson](pages/1-understanding-ai.md) | ✅ | Jen Looper |
| 2 — Understanding Training Data and Models | Cloud vs. local AI, data sovereignty, open vs. closed models, guardrails | Explain cloud vs. local AI trade-offs · Install and run a local open-source model with Ollama · Train a small custom image classifier with the My Room app | [Lesson](pages/2-working-with-data.md) |  | Jen Looper |
| 3 — Building with Arduino: Meet Kiku | Arduino sketches, the Uno Q's dual MCU/MPU design, Bluetooth pairing, a Web UI brick, state machines | Set up Arduino App Lab and flash a sketch · Control the onboard LED array · Pair a Bluetooth keyboard · Build a rule-based pet with a web interface | [Lesson](pages/3-building-with-arduino.md) | | Jen Looper |
| 4 — Kiku Wakes Up: Giving Your Pet a Personality | Local wake-word detection, local LLM chat, system prompts, rule-based vs. AI-powered behavior | Connect a microphone and trigger a local wake-word model · Add a chat interface backed by a local LLM · Explain the difference between rule-based and AI-powered behavior | [Lesson](pages/4-eyes-and-ears.md) | | Jen Looper |
| Capstone — Your Cyberdeck | Engineering design process, vision models, portable battery power, enclosure design, attribution | Scope and build an independent, purpose-driven cyberdeck · Combine every AI Kit peripheral into one enclosure · Present and teach the finished build | [Lesson](pages/5-cyberdeck-instructions.md) | | Jen Looper |
| Mini Workshop — Build a Pet | Flashing sketches, Serial communication, LED matrix animation, a small state machine | Flash a sketch over USB · Read typed commands over Serial · Build a tiny on-device pet with no extra peripherals | [Lesson](pages/mini-workshop.md) | | Jen Looper |

---

## Pedagogy

This curriculum is **facilitated, project-based, and community-minded**. Every lesson is designed to run in a studio or classroom setting with a facilitator, but students can also work through it independently. 

The progression is intentional: students begin by examining AI critically — as users and skeptics — before they ever write a line of code. By the end of the beginner course they have built a working local AI app. By the end of the advanced course, they have a cyberdeck: a small, portable, offline-capable computer they built themselves.

We believe the field of AI needs more voices, not fewer — and that young women who ask hard questions are exactly who should be building these systems.

![Teaching AI](/teaching.png)
