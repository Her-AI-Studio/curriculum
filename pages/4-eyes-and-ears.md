---
outline: deep
---

# Kiku Wakes Up: Giving Your Pet Eyes, Ears, and a Face

![Sketchnotes, session 4]()

| **Lesson Goal**            | Give Kiku real AI senses: a screen for its face, a microphone that wakes it up, and a camera that teaches it to tell good food from junk food. |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **What you'll learn**       | By the end of this week you will be able to:<br>- Move Kiku's display from the LED array to the screen that ships with your AI kit<br>- Connect a microphone and use a local wake-word model to wake Kiku up<br>- Connect a camera and train a lightweight local classifier to recognize "good food" vs. "junk food"<br>- Combine screen, microphone, and camera into Kiku's full multi-sensory pipeline<br>- Explain the difference between Kiku's rule-based behavior (Week 3) and its AI-powered behavior (this week) |
| **Tools you'll need**       | Arduino Uno Q board and Bluetooth keyboard (from Week 3), the screen that ships with your AI kit, a USB microphone, a USB camera, laptop with Arduino App Lab installed |
| **End result**              | Kiku v2 — a pet with a face on screen, ears that listen for its name, and eyes that can tell good food from junk food |
| **Time needed to complete** | 90 minutes |

## Session Plan

### Part 1 — From LEDs to a Face: Giving Kiku a Screen (20 min)

**Mini-lecture: Two Brains, One Pet (5 min)**

Recall from Week 3: the Uno Q actually has two "brains" on one board — an STM32 microcontroller that runs your sketch (real-time, hardware-focused), and a Qualcomm processor running a full Linux environment, capable of running Python apps and graphics.

Last week, Kiku's only "face" was the LED array, driven by the microcontroller. Today we move Kiku's face to the screen that ships with your kit — driven by the Linux side, which can draw much richer graphics than a grid of LEDs.

**Activity: Connect Kiku's Screen (5 min)**

1. Connect your kit's screen to the Uno Q (via the USB hub, if that's how your kit is wired).
2. Power everything on and confirm the screen is detected — you should see the Arduino login/desktop appear.
3. Open App Lab from the screen (or from your laptop, connected to the same board).

**Activity: Build Kiku's Face (10 min)**

In App Lab, add a new **Python app** alongside your sketch. Start simple: three faces, one per mood.

```python
import tkinter as tk

root = tk.Tk()
root.title("Kiku")
canvas = tk.Canvas(root, width=240, height=240, bg="black")
canvas.pack()

def draw_face(mood):
    canvas.delete("all")
    if mood == "happy":
        canvas.create_oval(60, 90, 90, 120, fill="white")   # eyes
        canvas.create_oval(150, 90, 180, 120, fill="white")
        canvas.create_arc(80, 140, 160, 180, start=200, extent=140, style="arc", outline="white", width=4)  # smile
    elif mood == "hungry":
        canvas.create_oval(60, 90, 90, 120, fill="white")
        canvas.create_oval(150, 90, 180, 120, fill="white")
        canvas.create_line(90, 160, 150, 160, fill="white", width=4)  # flat mouth
    elif mood == "sleepy":
        canvas.create_line(55, 105, 95, 105, fill="white", width=4)  # closed eyes
        canvas.create_line(145, 105, 185, 105, fill="white", width=4)
        canvas.create_text(200, 60, text="z z z", fill="white", font=("Arial", 16))

draw_face("happy")
root.mainloop()
```

> **Note:** This is intentionally simple — three faces are enough to start. Feel free to make them more expressive once the basics work.

**How does the sketch tell this app what mood Kiku is in?** App Lab includes a built-in Bridge for passing values between the microcontroller side and the Linux side. Check your App Lab version's docs for the current Bridge syntax — the idea is: your Kiku sketch updates a `mood` value whenever hunger, energy, or an `F`/`P`/`S` key press changes it, and this Python app reads that value and calls `draw_face(mood)` whenever it changes.

### Part 2 — Kiku Wakes Up: Microphone and Wake Word (25 min)

**Mini-lecture: What's a Wake Word? (5 min)**

Devices like "Hey Siri" or "OK Google" aren't listening to everything you say and sending it to a server — that would be slow, expensive, and a privacy nightmare. Instead, a small, efficient **wake-word model** runs constantly on the device itself, listening only for one specific phrase. Everything else gets ignored (and never recorded).

This connects directly to what you learned about data sovereignty in Week 2: because this wake-word detection runs entirely on the Uno Q's own Linux side, your voice never has to leave the device to figure out whether you said "Kiku."

**Activity: Connect the Microphone (5 min)**

Plug your USB microphone into the Uno Q (via the hub, if needed). Confirm it's detected as an audio input device on the Linux side.

**Activity: Detect a Wake Word (15 min)**

We'll use [openWakeWord](https://github.com/dscripka/openWakeWord), an open-source, fully local wake-word engine.

```bash
pip install openwakeword sounddevice
```

```python
from openwakeword.model import Model
import sounddevice as sd
import numpy as np

# openWakeWord ships with several pre-trained wake words.
# For class, pick the closest available one and treat it as "Kiku's name"
# — check the current openWakeWord docs if you want to train a real custom "Hey Kiku" model.
model = Model(wakeword_models=["hey_jarvis"])

def audio_callback(indata, frames, time, status):
    prediction = model.predict(indata[:, 0])
    if prediction["hey_jarvis"] > 0.5:
        print("Kiku is awake!")
        # TODO: update Kiku's mood/state (e.g. from "sleepy" to "happy")
        # and tell the face app to redraw

with sd.InputStream(channels=1, samplerate=16000, callback=audio_callback):
    print("Listening for Kiku's wake word...")
    while True:
        pass
```

> **Note:** Installing audio libraries can take a few minutes the first time. If your kit's image comes with these pre-installed, skip straight to running the script.

Try it: put Kiku to sleep (from Week 3's sleep action), then say the wake word. Kiku's face should wake up.

**Full-group debrief:**

- How did it feel to "wake up" a device with your voice instead of a key press?
- Why does it matter that this all happens locally, without sending audio anywhere?
- What might go wrong with a wake-word model? (Think about accents, background noise, or similar-sounding words.)

### Part 3 — Good Food, Junk Food: Teaching Kiku to See (25 min)

**Mini-lecture: From My Room to Kiku (5 min)**

In Week 2, you trained a custom image classifier in the My Room app using MobileNet, a small model designed to run on low-power devices. Today you'll do something very similar, except the classifier will run locally on the Uno Q itself, using its camera, and it'll only need to recognize two categories: **good food** and **junk food**.

Instead of retraining all of MobileNet (slow), we'll use it as a **feature extractor** — letting it do what it already knows how to do (recognize shapes and textures) — and train only a small, fast classifier on top, using just a handful of your own example photos. This is the same trick behind "teachable machine"-style tools.

**Activity: Connect the Camera (5 min)**

Plug your USB camera into the Uno Q. Confirm it's detected on the Linux side.

**Activity: Train a Good-Food/Junk-Food Classifier (15 min)**

```bash
pip install opencv-python tensorflow scikit-learn
```

```python
import cv2
import numpy as np
from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input
from sklearn.neighbors import KNeighborsClassifier

# MobileNet as a feature extractor — we're not retraining the whole network,
# just reusing what it already knows about shapes and textures
feature_extractor = MobileNetV2(weights="imagenet", include_top=False, pooling="avg")

def get_features(frame):
    img = cv2.resize(frame, (224, 224))
    img = np.expand_dims(preprocess_input(img.astype(np.float32)), axis=0)
    return feature_extractor.predict(img, verbose=0)[0]

camera = cv2.VideoCapture(0)
features, labels = [], []

for label in ["good_food", "junk_food"]:
    input(f"Show the camera 5 examples of {label}, then press Enter...")
    for i in range(5):
        ok, frame = camera.read()
        features.append(get_features(frame))
        labels.append(label)
        input(f"  Captured {i + 1}/5 — reposition and press Enter for the next")

# A simple classifier trained on just those features
classifier = KNeighborsClassifier(n_neighbors=3)
classifier.fit(features, labels)

def classify_food():
    ok, frame = camera.read()
    prediction = classifier.predict([get_features(frame)])[0]
    print(f"Kiku sees: {prediction}")
    return prediction
```

> **Note:** Loading TensorFlow can take a moment. If class time is tight, ask your facilitator whether this can be pre-loaded before the session.

Now wire the result into Kiku: when `classify_food()` returns `"good_food"`, update Kiku's state so it gets fed and happy; when it returns `"junk_food"`, give Kiku a "sluggish" or "sick" reaction instead. Use the same Bridge approach from Part 1 to update the mood shown on the face.

**Full-group debrief:**

- How many examples did it take before the classifier reliably told good food from junk food?
- Try showing it something it's never seen. What does it predict, and why?
- What foods do you think it would misclassify, and why?

### Part 4 — Kiku Comes Alive: Eyes, Ears, Screen, and Body (20 min)

**Activity: End-to-End Demo (10 min)**

Put it all together and try the full experience:

1. Kiku starts out asleep (face shows "sleepy," eyes closed)
2. Say the wake word — Kiku's face wakes up
3. Hold up a food item to the camera — Kiku classifies it as good or junk food
4. Kiku's mood updates on screen based on what it "ate"
5. Use `P` or `S` on the Bluetooth keyboard from Week 3 to play with Kiku or put it back to sleep

**Reflection: What You Built**

Think back across all four weeks:

- **Week 1:** You learned what AI is, and why your perspective on it matters
- **Week 2:** You trained a model on your own data and understood what "local" really means
- **Week 3:** You gave Kiku a body, a Bluetooth keyboard, and rule-based logic — no AI yet
- **Week 4:** You gave Kiku senses — a wake-word model and an image classifier — genuine AI, running entirely on your own hardware

**Discussion prompt:** _"You just trained Kiku's food classifier on only a handful of examples — mostly foods from your own kitchen. What might it misclassify? How is this the same bias mechanism we discussed with big AI models in Week 1, just at a scale small enough to see directly?"_

## Take-Home

**Check Your Understanding**

1. What's the difference between a wake-word model and full speech recognition?
2. Why did we use MobileNet as a "feature extractor" instead of retraining it from scratch?
3. What is the Bridge doing when it passes Kiku's mood from the sketch to the Python face app?
4. Which parts of Kiku's Week 4 behavior are "real AI," and which parts are still the rule-based logic from Week 3?
5. Why does it matter that the wake-word detection and food classification both happen locally, on the board itself?

**Assignment**

- Add more training examples to the food classifier and see if it gets more reliable
- Add a third food category (e.g., "not food") and see how the classifier handles it
- Design a new face expression for a mood not covered in class
- Write a short reflection: what would you need to add to make Kiku's food classifier trustworthy enough to actually rely on?

**Optional Supplemental Reading**

- [openWakeWord on GitHub](https://github.com/dscripka/openWakeWord)
- [MobileNetV2 Paper](https://arxiv.org/abs/1801.04381) — the architecture behind the vision model
- [Transfer Learning with TensorFlow](https://www.tensorflow.org/tutorials/images/transfer_learning) — the technique behind using MobileNet as a feature extractor
- [Arduino App Lab Documentation](https://docs.arduino.cc/software/app-lab/)

## Next Steps

- [Capstone — Build Your Cyberdeck](/cyberdeck-instructions)
