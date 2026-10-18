---
outline: deep
---

# Kiku Wakes Up: Giving Your Pet a Personality

![Sketchnote coming soon](/coming-soon.png)

| **Lesson Goal**            | Give Kiku real AI senses: a microphone that wakes it up with local AI and a wakeword and the ability to chat with you. |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **What you'll learn**       | By the end of this week you will be able to:<br>- Connect a microphone and use a local wake-word model to wake Kiku up<br>- Chat with your pet on screen via a chat interface and local AI model.<br>- Explain the difference between Kiku's rule-based behavior (Week 3) and its AI-powered behavior (this week) |
| **Tools you'll need**       | Arduino Uno Q board and Bluetooth keyboard (from Week 3), USB hub, the screen, USB microphone that ships with your AI kit, and your laptop with Arduino App Lab installed |
| **End result**              | Kiku v2 — a pet on screen, ears that listen for its name, and a chat interface |
| **Time needed to complete** | 90 minutes |

## Session Plan

### Part 1 — Kiku's Full Capability (20 min)

**Mini-lecture: Two Brains, One Pet (5 min)**

Recall from Week 3: the Uno Q actually has two "brains" on one board — an STM32 microcontroller that runs your sketch (real-time, hardware-focused), and a Qualcomm processor running a full Linux environment, capable of running Python apps and graphics.

Last week, you built Kiku, your pet who lives on the mini monitor and with which you can interact with your mini keyboard. Its behavior is based on logic in code that you loaded onto your board.

**Activity: Connect Your Cyberdeck Peripherals (10 min)**

This is the week you connect all the pieces of your cyberdeck.

> If you don't have a Her AI Studio AI Kit, you can still do this activity using a small microphone and camera connected to your monitor. It won't be quite as fun but it will still work!

1. Connect the USB hub to your Uno Q and to a power source, as you did in the last session.
2. Connect the monitor to the hub.
3. Make sure your Bluetooth keyboard (paired back in Week 3) is on and ready — you'll use it both to log in and to keep controlling Kiku.
4. Power everything on. You should see the Arduino login/desktop appear on the monitor.
5. Log in, then open App Lab from the screen (or from your laptop, connected to the same board).

> **Troubleshooting:** If the monitor stays blank, check the hub's power connection first — a hub that isn't getting enough power often fails to pass video through to a display.

6. Plug in the mini microphone to the hub

**Activity: Add AI Bricks (5 min)**

In App Lab, add two AI bricks to your Kiku app: **Large Language Model (LLM)** and **Keyword Spotting**. We're going to use these to make Kiku have some personality.

![Adding a brick](/add-brick.png)

We'll wire each one up properly in the parts that follow — for now, just get both bricks added to the project.

### Part 2 — Kiku Wakes Up: Microphone and Wake Word (25 min)

**Mini-lecture: What's a Wake Word? (5 min)**

Devices like "Hey Siri" or "OK Google" aren't listening to everything you say and sending it to a server — that would be slow, expensive, and a privacy nightmare. Instead, a small, efficient **wake-word model** runs constantly on the device itself, listening only for one specific phrase. Everything else gets ignored (and never recorded).

This connects directly to what you learned about data sovereignty in Week 2: because this wake-word detection runs entirely on the Uno Q's own Linux side, your voice never has to leave the device to figure out whether you said "Kiku."

**Activity: Train and Deploy a Custom Wake Word Model (10 min)**

The Keyword Spotting brick needs a model that knows what "Hey Kiku" sounds like. That model comes from **Edge Impulse**, a service affiliated with Arduino's App Lab. We've created a pre-trained model for you that can listen for "Kiku" or "Hey Kiku" — let's make it available to your device.

> 💡 You can use the free Developer plan in Edge Impulse Studio to train your own model on your own data, but for now let's save time by using this pretrained one.

1. Create an account at https://studio.edgeimpulse.com and login
2. Clone the model by opening its page: https://studio.edgeimpulse.com/public/1124727/live
3. Click `Clone this project` in the top-right corner of the page. You can keep it personal and private if you like.
4. Once cloned, navigate to Deployment in the left sidebar of your cloned project.
5. Select your target deployment option: Arduino Library. Make sure the Target at the top is Arduino Uno Q

![Library](/arduino-lib-edge-impulse.png)

6. Click Build
7. Connect your device to your Edge account by returning to App Lab and clicking the AI models tab in your Kiku app's Keyword Spotting brick. Once logged in, App Lab is connected to Edge Impulse and you can find your models.
8. Click `download` and install the model to App Lab.

![Model in App Lab](/model-in-app-lab.png)

**Activity: Wire Up the Wake Word (10 min)**

Now let's make "Hey Kiku" actually do something. In the `python` folder, find `main.py` and add this code under the keypress function:

```python
from arduino.app_utils import *
from arduino.app_bricks.keyword_spotting import KeywordSpotting

spotting = KeywordSpotting()

def on_wake_word():
    print("Hey Kiku detected!")
    ui.send_message("wake_up", {})

spotting.on_detect("Hey_Kiku", on_wake_word)

App.run()
```

In `index.html`, dig into the code and find `function pet()`. Under that, add another function to wake up Kiku:

```javascript
function wakeUp(){
          if (!state.asleep) return;
          state.asleep = false;
          state.joy = 70;
          stopSnoring();
          petReaction(); burst('var(--happy)'); render();
          statusEl.textContent = 'hello there!';
        }

// Expose it so app.js (loaded after this script) can call it
window.wakeUp = wakeUp;
```

in `app.js` add this code to line 3:

```javascript
ui.on_message('wake_up', () => {
  window.wakeUp();
});
```

Try it: put Kiku to sleep (from Week 3's sleep action), then say "Hey Kiku." Kiku should wake up.

**Full-group debrief:**

- How did it feel to "wake up" a device with your voice instead of a key press?
- Why does it matter that this all happens locally, without sending audio anywhere?
- What might go wrong with a wake-word model? (Think about accents, background noise, or similar-sounding words.)

### Part 3 — Chat with Kiku (25 min)

**Mini-lecture: What's in the LLM Brick? (5 min)**

The Large Language Model (LLM) brick you added earlier runs a small language model locally on the Uno Q's Linux side — the same "no data leaves the device" idea as the wake-word model, just applied to conversation instead of audio. We'll give it a short **system prompt** that tells it to act like Kiku rather than a generic assistant, and we'll turn on its built-in memory so it remembers what you said earlier in the conversation.

> Note, this is your opportunity to give Kiku a special personality. Maybe they speak Spanish only? Maybe they only reespond in riddles? Maybe they only respond in one-word phrases? Up to you to decide.

**Activity: Build the Chat Interface (20 min)**

We need to touch four files: the HTML (what the chat box looks like), the CSS (how it looks), `app.js` (how the browser talks to the board over the socket connection you've already been using for the wake word), and `main.py` (how the board talks to the LLM brick and sends a reply back).

1. In `index.html`, find the closing `</div>` for `<div class="layout">` (the grid that holds Kiku's stage and stat bars). Right after it, and still inside the outer `<div class="app">`, add a new chat section:

```html
<section class="chat-section">
  <p class="chat-title">Ask Kiku</p>
  <div class="chat-log" id="chat-log"></div>
  <form class="chat-form" id="chat-form">
    <input type="text" id="chat-input" placeholder="Ask Kiku something…" autocomplete="off" maxlength="300" />
    <button type="submit" id="chat-send">Send</button>
  </form>
</section>
```

2. In `style.css`, add styles for the new section so it matches Kiku's existing dark, pixel-blue theme. Drop this in near the other `.board-*` rules:

```css
.chat-section{
  margin-top:18px;
  background:var(--card);
  border-radius:20px;
  padding:14px 16px 16px;
  box-shadow:inset 0 0 0 1px rgba(255,255,255,0.05);
}
.chat-title{
  font-family:'Baloo 2',sans-serif;
  font-weight:700;
  font-size:0.95rem;
  margin:0 0 10px;
  color:var(--text);
}
.chat-log{
  display:flex;
  flex-direction:column;
  gap:8px;
  max-height:220px;
  overflow-y:auto;
  margin-bottom:10px;
}
.chat-msg{
  max-width:80%;
  padding:8px 12px;
  border-radius:14px;
  font-size:0.86rem;
}
.chat-msg p{margin:0;white-space:pre-wrap;}
.chat-msg-user{align-self:flex-end;background:var(--pixel-dim);color:var(--text);}
.chat-msg-kiku{align-self:flex-start;background:var(--track);color:var(--text);}
.chat-msg-thinking p{color:var(--muted);font-style:italic;}
.chat-form{display:flex;gap:8px;}
.chat-form input{flex:1;min-width:0;background:var(--bg-deep);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:9px 12px;color:var(--text);font-family:'Nunito',sans-serif;}
.chat-form button{flex-shrink:0;background:var(--pixel);color:#071022;border:none;border-radius:12px;padding:9px 16px;font-weight:700;cursor:pointer;}
.chat-form button:disabled{opacity:0.5;cursor:not-allowed;}
```

3. In `app.js`, add the logic that sends what you type over the same `ui` connection you used for the wake word, and listens for Kiku's reply:

```javascript
const chatLog = document.getElementById('chat-log');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');

function addChatMessage(text, who) {
  const msg = document.createElement('div');
  msg.className = `chat-msg chat-msg-${who}`;
  const p = document.createElement('p');
  p.textContent = text;
  msg.appendChild(p);
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
  return msg;
}

let thinkingMsg = null;

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text || thinkingMsg) return;

  addChatMessage(text, 'user');
  chatInput.value = '';
  chatSend.disabled = true;
  thinkingMsg = addChatMessage('…', 'kiku');
  thinkingMsg.classList.add('chat-msg-thinking');

  ui.send_message('chat_message', { text });
});

ui.on_message('chat_message_response', (data) => {
  if (thinkingMsg) { thinkingMsg.remove(); thinkingMsg = null; }
  chatSend.disabled = false;
  addChatMessage((data && data.text) || '...', 'kiku');
});
```

> **Troubleshooting:** Kiku's existing keyboard shortcuts (`F`, `P`, `S` for feed/play/sleep) listen for keydown events on the whole page. If you test the chat box and typing those letters makes Kiku feed or play instead of appearing in your message, find that `keydown` listener in `app.js` and add a guard at the top so it ignores keystrokes typed into the chat input:

> ```javascript
> document.addEventListener('keydown', function (e) {
>   const isTyping = e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA';
>   if (isTyping) return;
>   // ...rest of the existing hotkey code
> });
> ```

4. In `main.py`, import the LLM brick and create it with a short system prompt that gives it Kiku's personality, then register a handler for messages named `chat_message`:

```python
from arduino.app_bricks.llm import LargeLanguageModel

kiku_llm = LargeLanguageModel(
    system_prompt=(
        "You are Kiku, a tiny robotic bug-like desk pet. Answer playfully and "
        "curiously in 1-3 short sentences, like a small companion creature would, "
        "not like a general-purpose assistant."
    )
).with_memory(max_messages=12)

def on_chat_message(client, data):
    text = (data or {}).get("text", "").strip()
    if not text:
        return {"text": "..."}
    try:
        reply = kiku_llm.chat(text)
    except Exception as e:
        print(f"Kiku chat error: {e}")
        reply = "hmm, my antennae are a little fuzzy right now. try again?"
    return {"text": reply}

ui.on_message("chat_message", on_chat_message)
```

Notice the handler just **returns** a dictionary instead of calling `ui.send_message` directly — the WebUI brick automatically sends it back to the browser as `chat_message_response`, which is exactly the event name `app.js` is listening for in step 3.

**Try it:** type a question into the new box — "What's your favorite food?" or "Are you sleepy?" — and watch Kiku's reply appear after a "…" thinking bubble.

**Full-group debrief:**

- The system prompt is the only thing standing between "generic chatbot" and "Kiku." If you rewrite it, how does Kiku's personality change?
- This chat still runs entirely on your board, with no internet connection required, just like the wake word. What trade-offs come with running a small, local model instead of a large cloud one (speed, quality, privacy, cost)?
- `with_memory()` lets Kiku remember earlier turns in the conversation. What happens if you remove it and chat for a few turns — does Kiku's personality still feel consistent?

### Part 4 — Kiku Comes Alive (20 min)

**Activity: End-to-End Demo (10 min)**

Put it all together and try the full experience:

1. Kiku starts out asleep (face shows "sleepy," eyes closed)
2. Say the wake word — Kiku's face wakes up
3. Press `F` to feed Kiku
4. Watch Kiku's mood update on screen
5. Use `P` or `S` on the Bluetooth keyboard from Week 3 to play with Kiku or put it back to sleep
6. Try a chat!

**Reflection: What You Built**

Think back across all four weeks:

- **Week 1:** You learned what AI is, and why your perspective on it matters
- **Week 2:** You trained a model on your own data and understood what "local" really means
- **Week 3:** You gave Kiku a body, a Bluetooth keyboard, and rule-based logic — no AI yet
- **Week 4:** You gave Kiku senses — a wake-word model and a chatbot — genuine AI, running entirely on your own hardware

## Take-Home

**Check Your Understanding**

1. What's the difference between a wake-word model and full speech recognition?
2. What is the Bridge doing when it passes Kiku's mood from the sketch to the Python face app?
3. Which parts of Kiku's Week 4 behavior are "real AI," and which parts are still the rule-based logic from Week 3?
4. Why does it matter that the wake-word detection and chat both happen locally, on the board itself?

**Assignment**

- Connect your camera and create a new Kiku integration of your own design
- Design a new face expression for a mood not covered in class
- Write a short reflection: what useful aspect of creating a simple 'pet' stands out to you?

**Optional Supplemental Reading**

- [openWakeWord on GitHub](https://github.com/dscripka/openWakeWord)
- [Arduino App Lab Documentation](https://docs.arduino.cc/software/app-lab/)

## Next Steps

- [Capstone — Build Your Cyberdeck](/5-cyberdeck-instructions)
