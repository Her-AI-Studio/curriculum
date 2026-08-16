---
outline: deep
---

# CSTA Standards Mapping

_Her AI Studio curriculum → 2026 CSTA PK–12 Computer Science Standards (Grades 9–12)_

Every lesson in this curriculum is mapped below to the 2026 CSTA standards it addresses. The AI-aware structure of the 2026 revision suits us well: AI content is woven **throughout** the five foundational concepts (_Algorithms & Design, Programming, Data & Analysis, Systems & Security, Computing & Society_) **and** has its own High School specialty strand (**Artificial Intelligence / AIN**) with two tiers.

## How to read the standard IDs

| Prefix | Meaning | Who it's for |
|--------|---------|--------------|
| `HS-*` | High School foundational standard | All students in grades 9–12 |
| `S1-*` | Specialty I (first focused experience in a domain) | HS students taking an AI/physical-computing pathway |
| `S2-*` | Specialty II (advanced study) | HS students in deeper or capstone coursework |

Concepts: `ALG` = Algorithms & Algorithms, `PRO` = Programming, `DAT` = Data & Analysis, `SYS` = Systems & Security, `SOC` = Computing & Society, `AIN` = Artificial Intelligence, `PHY` = Physical Computing.

CSTA source: [_2026 CSTA PK–12 Computer Science Standards_](https://csteachers.org/pk12standards/) (CC BY-NC-SA 4.0).

---

## Week 1 — Understanding AI: Who Built It, Who It's For, and Why You Belong Here

_Beginner course._ Students define what an AI model is, learn the history of AI's women builders, confront bias as a mirror, and practice skepticism as a skill (AI Audit Card, personal statement).

**Core standards (plan your assessment evidence around these):**

| Standard | Title (abbreviated) | Why it aligns |
|---|---|---|
| `S1-AIN-DD-01` | Analyze AI systems to differentiate the types of problems they address | The Two Truths and a Lie warm-up and the "generative vs. discriminative" distinction (chatbots vs. image classifiers). |
| `S1-AIN-HR-09` | Analyze the potential biases and limitations of AI systems | Your "bias is a mirror" lesson and the Gender Shades discussion — this standard's own example is a facial-recognition performance gap across demographic groups. |
| `HS-ALG-PS-05` | Evaluate AI-generated output to assess bias, accuracy, and potential harms | The AI Audit Card's "does it work for everyone?" questioning is a structured version of this standard. |
| `HS-ALG-IM-11` | Justify values embedded in the design of an algorithmic system | "Who benefits? who built it? what data trained it?" — every design choice prioritizes some value (efficiency, privacy, fairness). |
| `HS-SOC-HI-38` | Analyze a technology's historical trajectory and its societal/environmental links | The three-women-in-AI history flipchart and "why your perspective matters." |

**Supporting standards:**
- `HS-ALG-PS-04` — Describe deterministic vs. probabilistic algorithms *(the "model predicts the next word" mini-lecture; ML is statistical, not rule-following)*
- `HS-ALG-ML-07` — Evaluate training data by source, quality, and representativeness *(audit-card question: "What data do you think it was trained on?")*
- `HS-ALG-IM-10` — Evaluate ethical impacts and bias of rule-based vs. data-driven algorithms *(two sources of bias)*
- `HS-SOC-HU-43` — Evaluate how human choices in designing/deploying/regulating tech create risks and long-term impacts *(the "demands accountability" skeptic move)*
- `HS-SOC-HU-44` — Debate human vs. AI intelligence, consciousness, and responsibility *(warm-up "AI doesn't think like a human")*
- `HS-SOC-ET-41` — Evaluate societal/environmental impacts of emerging tech, incl. inequities *(who might it work less well for?)*
- `S1-AIN-PP-12` — Analyze AI tool experiences across diverse user backgrounds *(accompaniment, language, geography)*
- `S1-AIN-PP-13` — Assess how unauthorized data/AI-copyright issues affects training practice *(Miyazaki reading; Kenya labor reading)*
- `S1-AIN-PP-14` — Evaluate how AI ethics has changed over time *(rule-based → model-based evolution)*
- `HS-SOC-CE-45` / `HS-SOC-CE-46` — Diverse teams and your place in this field *(the "you belong here" charge)*

---

## Week 2 — Taking Control: Training Data and Local AI

**Beginner · Students contrast cloud vs. local AI, explore privacy and data sovereignty, install and run an open-source model (Ollama), and train a custom image classifier with the My Room app (collect → train → infer).**

**Core standards:**

| Standard | Title (abbreviated) | Why it aligns |
|---|---|---|
| `HS-ALGS-ML-08` | Develop a machine learning model for a chosen task using appropriate data and tools | The My Room training loop — every student trains their own classifier. |
| `HS-ALG-ML-07` | Evaluate training data: source, quality, representativeness, bias, privacy | Choosing and evaluating your own collected classes/examples for "My Room." |
| `S1-AIN-DD-03Create an application using a prebuilt supervised learning model to classify or predict |  My Room uses prebuilt MobileNet features — the standard's own example. |
| `S1-AIN-DS-07` | Apply data acquisition, cleaning, and transformation techniques for AI analysis | Your data-prep steps before training (naming classes, balancing, splitting). |
| `HS-DAT-IM-27` | Evaluate societal, environmental, ethical implications of large-scale data | "The cloud is just someone else's computer" — this standard literally names data sovereignty and data-center impact. |

**Supporting standards:**
- `S1-AIN-DD-02` — Modify training data to improve fairness/accuracy *(rebalancing with more objects / more classes)*
- `S1-AIN-DS-06` — Examine data flow through a neural network *(the "how the classifier works" sketch)*
- `HS-ALGS-ML-06` — Justify model choice (image classifier vs LLM vs rule) *(your local-model comparison table)*
- `HS-DAT-DC-23` / `HS-DAT-DC-24` — Clean/inspect data consistency *(data hygiene before training)*
- `HS-SYS-SE-31` / `HS-SYS-SE-32` — Security measures/tradeoffs and breach causes & impacts *(privacy trade-off of cloud vs. local)*
- `HS-SYS-NT-35` — Internet as network-of-networks; client/server model *(drawing where your query goes)*
- `HS-SYS-HW-29` — Operating system roles managing hardware *(running Ollama locally)*
- `HS-SOC-HI-39` — Propose policy for ethical innovation *(GDPR/data-sovereignty discussion)*
- `HS-DAT-IM-28` — Debate data-use policy efficacy *(data sovereignty debate)*
- `S1-AIN-HR-08` — Plan safeguards protecting well-being & privacy (guardrails for your local model)
- `S1-AIN-HR-10` — Analyze environmental impacts of widespread AI adoption *(edge vs. data-center energy)*
- `S1-AIN-PP-11` — Integrate a prebuilt AI agent (an LLM) into an app *(Ollama powering journal entries / code)*

---

## Week 3 — Hello, a network of computing systems: From PC Control to Networked AI

**Intermediate · hardware.** Students set up an Arduino IoT board, write their first sketches `setup()`/`loop()`, control LED array, read mouse input, and connect board to local LLM over WiFi/HTTP via Python bridge.

**Core standards:**
| Standard | Title (abbreviated) | Why the alignment |
|---|---|---|
| `S1-PHY-HC-01` | Construct a computing circuit to power & control a physical device | The Uno Q + USB/mouse-LED-array circuit build. |
| `S1-PHY-IO-02` | Integrate sensors, actuators, peripherals into a physical system | Mouse input, LED matrix output, later camera input. |
| `S1-PHY-DD-03` | Develop software iteratively to control a physical device | Every Arduino `setup()` / `loop()` sketch and its debugging runs. |
| `S1-PHY-PP-08` | Evaluate security implications of a physical computing system | Running at 0.0.0.0, exposing a local server, and the "data stays on your network" discussion. |
| `HS-SYS-NT-34` | Diagram a network of computing components (hardware + software) | The Uno Q → WiFi → Python server → Ollama pipeline diagram. |
| `HS-SYS-NT-35` | Analyze the internet's client/server model and network-of-networks | HTTP request/response over LAN — the "where did my query go" follow-through. |

**Supporting:
- `HS-PRO-PD-12` — Modular programs via `#include` libraries; **lessons** use external Arduino/Python modules.
- `HS-PRO-PD-13` — Use documentation, libraries, APIs *(Arduino LED library, Flask, `ollama` subprocess)*
- `S1-AIN-PP-11` — Integrate a prebuilt AI agent into an application *(the LLM behind the Python server)*
- `HS-SYS-SE-33` — Formulate a solution to a security flaw *(discussing the open server/trust boundaries)*
- `HS-PRO-RD-18` — Evaluate AI-generated code for accuracy/reliability *(AS-demanding; assess code)*
- `S1-PHY-CI-05` — Implement IoT communication with basic protocols *(WiFi/HTTP)* (used again in Week 4)

---

## Week 4 — Can You See Me Now? Adding Computer Vision to Your Arduino

**Intermediate · vision + LJ.** Students add a camera, stream video over WiFi, classify with MobileNet on the laptop, chain vision → LLM prompt → display + LED feedback, and reflect on confidence scores and multi-modal pipelines.

**Core standards:**
| Standard | Title (abbreviated) | Why the alignment |
|---|---|---|
| `S1-AIN-DD-03` | Create an app using a pretrained supervised learning model to classify | MobileNet image classifier on the laptop — direct example used by the standard itself. |
| `S1-AIN-DD-04` | Compare data representations & constraints (image vs. text) | Same system handles image data (MobileNet) and text data (the LLM) — compare both streams. |
| `S1-AIN-DS-06` | Examine how data flows through a neural network | Teacher-era notes: labels, weights, layer-by-layer flow, output logits → confidence. |
| `S1-PHY-IO-02` | Integrate sensors/peripherals (camera) into a system | The Arducam OV2640 over SPI, image capture. |
| `S1-PHY-CI-04` | Use IoT devices to collect & transmit sensor data locally (device-to-gateway) | Camera on Uno, WiFi to laptop — **no cloud involved**, exactly as CSTA ran. |
| `S1-PHY-PP-08` | Evaluate security implications of a physical system | Discussion of who/ідікс network; keeping personal data locally. |

**Supporting standards:**
- `HS-ALG-ML-07` — Evaluate the model's training influence incl. representing limitation (MobileNet's 1000 classes, gaps) — "Notes which the model gets right & struggles → *why*"
- `HS-DAT-DI-26` — How to app update An video: "visualization/simulation limitations" maps to confidence-score critique
- `HS-DAT-DC-23/24` — Handle data fidelity in image transfer (format, size, JPEG)
- `HS-SYS-NT-34` — reiterate the 5-stage pipeline diagram from Week 3, now with image data
- `HS-PRO-PD-13` — libraries/APIs (Requests, PIL, TensorFlow, Keras)
- `S1-AIN-DD-05` — Evaluate whether AI or non-AI would be more appropriate *(e.g., rule-based color detection vs. an image classifier)*
- `HS-SOC-ET-41` — Debrief: for whom does a camera system work better/worse?

---

## Week 5 — Creating a Fully Local Computer

**Advanced · Alone.** Work toward a server-independent, fully offline local build. (Draft week.)

| Standard | Title (abbreviated) | Why aligns |
|---|---|---|
| `S2-PHY-CI-04` | Develop an IoT system to manage local data collection/transmission | Coordination of local devices w/o 'internet*-medium' — offline logic. |
| `S2-PHY-DD-03` | Develop an application extending functionality and user engagement | Level up the desk companion into a standalone tool. |
| `HS-SYS-HW-30` | Demonstrate a device's capabilities & limitations | Running Ollama/SBC offline — the limits are the point. |
| `HS-ALG-IM-09` | Design with human-centered design principles | Who will use this device? Accessibility, power, portability. |
| `HS-PRO-TR-19` / `HS-PRO-TR-20` | Evaluate against specs & responsible values; iterate with feedback | Usability tuning toward the final build. |

---

## Week 6 — My Cyberdeck: The Final Build

**Advanced · capstone build.**

| Standard | Title (abbreviated) | Why aligns |
|---|---|---|
| `S2-PHY-PP-08` | Develop a physical computing solution for diverse users using an engineering design process | The cyberdeck is your standard's reference implementation (sketch → plan → build → test → refine). |
| `S2-PHY-PP-06` | Apply a project management methodology to a collaborative build | Track scope: prototyping boards, wiring, programming, user testing. |
| `S2-PHY-IO-02` | Design a closed-loop feedback that behaves as you intend | Cyberdeck power/portability/uptime under load. |
| `HS-ALG-IM-09` | Human-centered design | Portability, accessibility, personalization — "your own voice." |
| `HS-SOC-ET-42` | Design a conceptual solution to a real-world problem with an emerging technology | Framing the deck as a device that serves a purpose you choose. |
| `HS-PRO-TR-19/20` | Evaluate and refine the build | Final acceptance tests + post-build reflections. |

---

## Capstone — My Capstone: Present and Teach

**Capstone.** Students explain, showcase, and paginate their cyberdeck and its AI pipeline, teaching others what they built and why it matters.

| Standard | Title (abbreviated) | Why aligns |
|---|---|---|
| `S2-AIN-PP-09` | Develop professional communication artifacts translating technical AI results for diverse audiences | The capstone talk/demo/site tailored to peers vs. judges vs. parents. |
| `HS-SOC-CE-46` | Connect the computing you learned to personal goals and interests | The "I can teach this" final reflection. |
| `HS-SOC-CE-45` | Elaborate how diverse teams use computing to solve problems | The dean for future cohorts / the "it was built by people like us" moment. |
| `HS-PRO-PD-14` | Attribution & intellectual property | A proper credits page for code, libraries, icons. |
| `HS-PRO-TR-19` | Evaluate the build against specs & responsible values | The final self-audit of your own project. |
| `HS-SOC-ET-41` | Evaluate broader impacts | "Who would benefit most from a tool like this?" reflection. |

---

## Quick reference — one-line coverage

| Week / Block | Go-to standards |
|---|---|
| W1 — AI identity, history, bias, skepticism | `S1-AIN-HR-09`, `HS-ALG-PS-05`, `HS-ALG-IM-11`, `HS-SOC-HI-38` |
| W2 — Training data, local AI, privacy | `HS-ALG-ML-08`, `S1-AIN-DD-03`, `HS-DAT-IM-27`, `HS-ALG-ML-07` |
| W3 — Arduino & networks | `S1-PHY-HC-01`, `S1-PHY-IO-02`, `S1-PHY-DD-03`, `HS-SYS-NT-34/35` |
| W4 — Computer vision & multi-modal | `S1-AIN-DD-03`, `S1-AIN-DS-06`, `S1-PHY-CI-04`, `HS-DAT-DI-26` |
| W5–6 — The cyberdeck | `S2-PHY-PP-08`, `S2-PHY-CI-04`, `HS-PRO-TR-19/20` |
| Capstone — Present & teach | `S2-AIN-PP-09`, `HS-SOC-CE-46/45`, `HS-PRO-PD-14` |

---

## Notes on this mapping

- **Specialty vs. foundational**: The AI (`AIN`) and Physical Computing (`PHY`) sites are high-school *specialty* standards; the `HS-*` items are the foundational band every 9–12 student should reach. Combined, they let you show both "for all" and "for pathway" coverage.
- **Practices & dispositions**: Most aligned standards carry the **ESR (Ethics & Social Responsibility)** and **HCD (Human-Centered Design)** practices, which describe how students engage — that is why we grouped them as the natural homeowners of your pedagogy.
- The CSTA names AIN standards as tiers (Specialty I → II) so you can place the semester goal (e.g., `S2-PHY-PP-08`) while still meeting the beginner expectation (`S1-PHY-HC-01`).