---
outline: deep
---

# Building with Arduino: Meet Kiku

![Sketchnotes, session 3]()

| **Lesson Goal**            | Bring Kiku, your Tamagotchi-style Arduino pet, to life: an Arduino LED array for a face, a Bluetooth keyboard for interaction, and code that gives it a personality that needs feeding, playing, and sleep. This lesson gets you familiar with Arduino and the Her AI Studio cyberdeck peripherals |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **What you'll learn**       | By the end of this week you will be able to:<br>- Set up the Arduino Uno Q with Arduino App Lab and upload your first sketch to your board<br>- Read and edit Arduino code to control the built-in LED array<br>- Pair a Bluetooth keyboard with the board and read key presses in your code<br>- Explain how a simple state machine tracks Kiku's hunger, energy, and mood over time<br>- Use F, P, and S key presses to feed, play with, and put Kiku to sleep, and watch its LED patterns respond |
| **Tools you'll need**       | Arduino Uno Q board, USB cable, laptop with Arduino App Lab installed, your AI Kit's Bluetooth keyboard, USB Hub, and small monitor |
| **End result**              | A working Kiku — an Arduino pet whose behavior changes based on hunger, energy, and mood, all controlled with a paired Bluetooth keyboard |
| **Time needed to complete** | 90 minutes |

## Session Plan

### Part 1 — Setup & Blink: Giving Kiku a Heartbeat (25 min)

**Activity: Install App Lab and Connect Your Board (10 min)**

Arduino App Lab is the software environment you'll use to write and upload code to your Uno Q. It runs in your browser and connects to your board over USB. Here's a diagram of the board's various pins (called a "pinout" diagram):

![pinout](/uno-q-pinout.png)

We're going to start by blinking some LED lights (the ones at the bottom right of this diagram)

1. Go to the [Arduino App Lab getting-started page](https://docs.arduino.cc/software/app-lab/) and follow the instructions to install the App Lab software on your laptop.
> 💡 Since you may be taking part in a workshop room where many Arduinos are on the same network, give your board a meaningful name to you so that you can be sure to flash only to it when working through this session.
2. Connect your Arduino Uno Q to your laptop using a USB cable and follow the instructions to get it online. Check with your instructor on your wifi credentials or use your own (you can also tether to your phone's hotspot)
3. Open App Lab in your browser. You should see it detect your board with the name you gave it.
4. Select your board from the list and confirm the connection.

> **Troubleshooting:** If your board isn't detected, try a different USB cable (some cables are power-only). Make sure that App Lab is running in the background.

**Mini-lecture: How an Arduino Sketch Works (5 min)**

You write code for your device by using App Lab, "flashing" software that is called a "sketch" to the board over USB. An Arduino sketch (the name for an Arduino program) has two essential functions:

```cpp
void setup() {
  // Runs once when the board powers on or resets
  // Use it to initialize pins, set up serial, connect to WiFi, etc.
}

void loop() {
  // Runs over and over again, forever
  // This is where your main program logic lives
}
```

![App Lab](/app-lab.png)

The Uno Q has some built-in LED lights plus a blue **LED array**, a grid of individually controllable LEDs. In App Lab, you control them by writing to specific pins or using the board's LED library. To start, let's use make one of the individual LEDs become Kiku's heartbeat — a proof of life before we give it a personality.

**Activity: A Heartbeat (10 min)**

Let's write your first sketch. Once your board is connected to your computer and wifi, you can upload code to it via Arduino App Lab. In App Lab, create a new app called Kiku. Open this new app and take a look at the files that were created. Go to the `sketch.ino` file and overwrite it with the following code:

```cpp
// SPDX-FileCopyrightText: Copyright (C) Arduino s.r.l. and/or its affiliated companies
//
// SPDX-License-Identifier: MPL-2.0

// Example sketch to blink an LED connected to the board. 
// The LED_BUILTIN is turned on for 1 second, then off for 1 second, repeatedly.

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);      // initialize digital pin LED_BUILTIN as an output.
}

void loop() {
  digitalWrite(LED_BUILTIN, LOW);    // turn the LED_BUILTIN on (LOW is the voltage level)
  delay(1000);
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);

  /* Note that the logic is inverted (LOW for on, HIGH for off), which is typical for 
     built-in LEDs that are wired with the cathode connected to the pin.
  */
}

```

Run this sketch on your board by clicking "run" in App Lab. Watch the red LED in the bottom right corner of the board (as seen with the cord facing up). It should blink on and off — Kiku's first heartbeat. 

You can turn Kiku's heartbeat green by changing the sketch and re-running it:

```cpp
void setup() {
  pinMode(LED3_G, OUTPUT);      // initialize the LED3 green pin as an output
}

void loop() {
  digitalWrite(LED3_G, LOW);    // turn the green LED on
  delay(1000);
  digitalWrite(LED3_G, HIGH);   // turn it off
  delay(1000);
}
```

**Challenge:**
- Change the delay time to make the heartbeat faster or slower
- Change the LED light color; try LED3_B or LED3_R

> 💡 `LED_BUILTIN` is a simple single-color indicator meant for basic on/off status, while `LED3` (and `LED4`) are full RGB LEDs — and it's no accident that there are four RGB LEDs total: two (`LED3`, `LED4`) are wired to the MCU (Uno Q's microcontroller unit that directly controls the hardware), so your .ino sketch can control them directly. The other two (`LED1`, `LED2`) are wired to the MPU (microprocessor unit), the board's Qualcomm chip or Linux side, reflecting the Uno Q's dual-brain design. You'd program the MPU with Python code.

### Part 2 — Give Kiku a Home 

Pair the Bluetooth Keyboard (20 min)

**Activity: Connecting Peripherals (5 min)**

Kiku needs a better place to live. Let's move them from the Arduino to your mini monitor. This is the first step in using the peripherals included in your AI kit; you'll set up your Arduino as a "SBC" - a single board computer, the base architecture of a cyberdeck.

Some of your peripherals are simple plugs you need to connect, so let's do those first:

1. Disconnect the Arduino from your computer
2. Connect the USB Hub's built-in USB C cable to the Arduino
3. Connect your other USB C cable to a power source (could be a plug, or your computer) and to the USB Hub
4. Connect the mini monitor to the USB hub using your HDMI cable and a micro USB to USB cable
5. Reconnect the board to a power source and boot it. 

Now you need to work with the keyboard, which is [connected to your board via Bluetooth](https://commandmasters.com/commands/bluetoothctl-linux/).

On your laptop, in App Lab, find your board's name at the bottom left and press the `>` icon next to it to connect to the board's shell, or terminal. This is how you control your board remotely.

1. With your small keyboard powered on, put it in pairing mode. Depending on the model, it may be pressing <function> and <ctrl> buttons. A light should blink quickly when it's in pairing mode.
2. Once connected, type `bluetoothctl` in the shell.
3. Type `scan on` to scan for pairable devices
4. Look for the name of your keyboard and copy its ID.
5. Type `pair <the id you just copied>` to pair
6. You'll see some text, and then hopefully a notice that the pairing was successful. Now you can use your keyboard to login to the mini monitor.

Enter your board's password into the Linux login screen on your mini monitor. 

6. App Lab should launch on your mini monitor. Find your Kiku app and run it.
7. You can now enter code in App Lab on your laptop and watch it run on the mini computer you just created, since they are both now on the same network.

**Activity: Read Key Presses and Light Up (10 min)**

Now you have a fully functional SBC with a microcontroller board, a small monitor and keyboard, and the cables to connect them all. This is the core of your cyberdeck. We're going to create your Kiku pet within a small web app run from your board that you can feed, pet, play with, and let sleep.

Write a sketch that reads key presses from the paired keyboard and lights up a different part of the LED array for `F`, `P`, and `S`:

```cpp
#include "Arduino_LED_Matrix.h"
#include "ArduinoBLE.h"

ArduinoLEDMatrix matrix;
BLEHIDHost keyboard;

// The LED array is 8 rows x 12 columns. 1 = on, 0 = off.
byte leftHalf[8][12] = {
  {1,1,1,1,1,1,0,0,0,0,0,0},
  {1,1,1,1,1,1,0,0,0,0,0,0},
  {1,1,1,1,1,1,0,0,0,0,0,0},
  {1,1,1,1,1,1,0,0,0,0,0,0},
  {1,1,1,1,1,1,0,0,0,0,0,0},
  {1,1,1,1,1,1,0,0,0,0,0,0},
  {1,1,1,1,1,1,0,0,0,0,0,0},
  {1,1,1,1,1,1,0,0,0,0,0,0}
};
byte rightHalf[8][12] = {
  {0,0,0,0,0,0,1,1,1,1,1,1},
  {0,0,0,0,0,0,1,1,1,1,1,1},
  {0,0,0,0,0,0,1,1,1,1,1,1},
  {0,0,0,0,0,0,1,1,1,1,1,1},
  {0,0,0,0,0,0,1,1,1,1,1,1},
  {0,0,0,0,0,0,1,1,1,1,1,1},
  {0,0,0,0,0,0,1,1,1,1,1,1},
  {0,0,0,0,0,0,1,1,1,1,1,1}
};
byte allOff[8][12] = {0};

void setup() {
  Serial.begin(9600);
  matrix.begin();
  BLE.begin();
  keyboard.begin();
  Serial.println("Waiting for a Bluetooth keyboard to pair...");
}

void loop() {
  BLE.poll();  // Poll for Bluetooth HID events

  if (keyboard.connected() && keyboard.available()) {
    char key = keyboard.read();

    if (key == 'f') {
      matrix.renderBitmap(leftHalf, 8, 12);  // left half on: "feed"
      Serial.println("F pressed: feed!");
    } else if (key == 'p') {
      matrix.renderBitmap(rightHalf, 8, 12);  // right half on: "play"
      Serial.println("P pressed: play!");
    } else if (key == 's') {
      matrix.renderBitmap(allOff, 8, 12);  // all off: "sleep"
      Serial.println("S pressed: sleep!");
    }
  }
}
```

Upload this sketch. Once your keyboard is paired, press `F`, `P`, and `S` — you should see a different LED pattern for each one.

**Full-group debrief (5 min)**

Facilitator-led discussion:

- What did it feel like to control the board wirelessly instead of with a wired button?
- Why might three distinct keys be easier to work with than one button and a press pattern (short vs. long, single vs. double)?
- This is the last piece of "plumbing" before Kiku gets a personality. What do you think happens next?

### Part 3 — Kiku's Needs: Feed, Play, Sleep (25 min)

**Mini-lecture: How a Tamagotchi State Machine Works (5 min)**

A Tamagotchi-style pet is really just a **state machine**: a small set of variables that change over time and in response to input.

Kiku tracks (at least) three things:
- **Hunger**: rises the longer Kiku goes unfed
- **Energy**: drops the longer Kiku stays awake
- **Mood**: reacts to both of the above, plus how recently you've played with it

The `loop()` function checks how much time has passed (using `millis()`, which counts milliseconds since the board powered on) and slowly adjusts these variables. Pressing `F`, `P`, or `S` on your paired keyboard is the only way to intervene: feed Kiku, play with Kiku, or put Kiku to sleep.

**Activity: Load Kiku's Starter Sketch (15 min)**

> **Note for facilitators:** This section is a placeholder. Open Arduino App Lab and load the actual Kiku starter sketch (exported from App Lab) here — it should define hunger/energy/mood variables that decay over time, map `F`/`P`/`S` key presses to feed/play/sleep actions, and drive LED matrix patterns for each state.

```cpp
// TODO: Replace this placeholder with the real Kiku starter sketch
// exported from Arduino App Lab. It should include:
//   - hunger, energy, and mood variables that change over time
//   - F/P/S key-press logic that maps to feed / play / sleep actions
//   - LED matrix patterns representing each state
//
// Paste the actual sketch here once it's ready.
```

Once you've loaded the real sketch, read through it with a partner and answer:

1. Where are Kiku's state variables (hunger, energy, mood) defined?
2. How does the code decide what to do when it reads an `F`, `P`, or `S` key press?
3. Which LED patterns correspond to which state?

**Activity: Test All Three Actions (5 min)**

Upload the sketch. Press `F` to feed Kiku, `P` to play with it, and `S` to put it to sleep. Watch how the LED pattern changes each time.

**Full-group debrief:**

- What did each action look like on the LED array?
- What happened if you ignored Kiku for a while before checking back in?
- Did anything surprise you about how quickly (or slowly) hunger or energy changed?

### Part 4 — Kiku's Personality: Customize and Reflect (20 min)

**Activity: Design Your Own Mood Pattern (10 min)**

Now it's your turn to make Kiku feel like *your* pet. Modify one or more of the LED patterns in the sketch:

- Give "sleepy" a slow pulsing glow instead of a static pattern
- Make "hungry" flash faster the longer Kiku goes unfed
- Add a brand new mood (e.g., "excited" right after playing) with its own pattern

**Reflection: What You Built (5 min)**

Think about what you just created:

1. **Body:** The LED array, giving Kiku a heartbeat and a face
2. **Input:** A paired Bluetooth keyboard — `F`, `P`, and `S` are your only way to talk to Kiku
3. **Logic:** A state machine tracking hunger, energy, and mood over time

Everything Kiku does right now comes from `if`/`else` logic you (or the sketch you loaded) wrote by hand. Kiku doesn't perceive anything about the world, and it doesn't learn — it just follows the rules it was given.

**Discussion prompt:** _"Kiku right now runs entirely on logic you can read and predict. Is that different from 'AI'? Why or why not? What would have to change for Kiku to actually need AI?"_

## Take-Home

**Check Your Understanding**

1. What are the two essential functions in every Arduino sketch? What does each one do?
2. What does it mean for the Uno Q to act as a Bluetooth "host" reading a keyboard, rather than a "peripheral" that other devices connect to?
3. Name Kiku's three state variables. What causes each one to change?
4. Is Kiku's current behavior an example of AI? Why or why not?

**Assignment**

- Add a fourth need or mood to Kiku (e.g., "boredom," "cleanliness") and give it its own LED pattern and key
- Try changing how quickly hunger or energy decays — what does that do to how "high-maintenance" Kiku feels?
- Keep Kiku alive and check in on it at least three times before the next session
- Bring your Uno Q and Bluetooth keyboard to the next session — you'll also connect a USB hub and screen to turn this into a full cyberdeck

**Optional Supplemental Reading**

- [Arduino App Lab Documentation](https://docs.arduino.cc/software/app-lab/)
- [Arduino BLE Library Reference](https://www.arduino.cc/reference/en/libraries/arduinoble/)
- [How Bluetooth HID Works](https://www.bluetooth.com/learn-about-bluetooth/tech-overview/) — the standard behind how keyboards and other input devices pair and communicate

## Next Steps

- [Week 4 — Kiku Wakes Up: Giving Your Pet Eyes, Ears, and a Face](/4-eyes-and-ears)
