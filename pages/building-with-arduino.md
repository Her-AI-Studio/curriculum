---
outline: deep
---

# Hello, Arduino Uno Q: From PC Control to Networked AI

_Intermediate Course · Week 3_

![Sketchnotes, week 3]()

| **Lesson Goal**            | Connecting an Arduino Uno Q to your laptop, configuring and controlling its hardware, and making it talk to a local AI over WiFi |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **What you'll learn**       | By the end of this week you will be able to:<br>- Set up the Arduino Uno Q with Arduino App Lab and upload your first sketch<br>- Write Arduino code to control the built-in LED array<br>- Pair a Bluetooth keyboard and read key presses to turn the LED array on and off<br>- Connect the Uno Q to WiFi and run a sample web app on the board's own Linux side<br>- Build a client-server pipeline where the Uno Q talks to a local LLM |
| **Tools you'll need**       | Arduino Uno Q board, USB cable, Bluetooth keyboard, laptop with Arduino App Lab installed, Python 3 |
| **End result**              | A working "AI desk companion" — press a key on the Bluetooth keyboard, and the Uno Q triggers a local LLM query, with the response displayed on the laptop screen and the LED array lighting up |
| **Time needed to complete** | 90 minutes |

## Session Plan

### Part 1 — Setup & Blink: Your First Arduino Sketch (25 min)

**Activity: Install App Lab and Connect Your Board (10 min)**

Arduino App Lab is the software environment you'll use to write and upload code to your Uno Q. It runs in your browser and connects to your board over USB.

1. Go to the [Arduino App Lab getting-started page](https://docs.arduino.cc/software/app-lab/) and follow the instructions to install the App Lab agent on your laptop.
2. Connect your Arduino Uno Q to your laptop using the USB cable.
3. Open App Lab in your browser. You should see it detect your board.
4. Select your board from the list and confirm the connection.

> **Troubleshooting:** If your board isn't detected, try a different USB cable (some cables are power-only). Make sure the App Lab agent is running in the background.

**Mini-lecture: How an Arduino Sketch Works (5 min)**

You write code for your device by using App Lab, "flashing" software that is called a "sketch" to the board over a USB. An Arduino sketch (the name for an Arduino program) has two essential functions:

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

The Uno Q has a built-in **LED array**, a grid of individually controllable LEDs. In App Lab, you control them by writing to specific pins or using the board's LED library.

**Activity: Blink the LED Array (10 min)**

Let's write your first sketch. In App Lab, create a new sketch and enter this code:

```cpp
#include "Arduino_LED_Matrix.h"  // Library for the built-in LED array

ArduinoLEDMatrix matrix;  // Create an object to control the LEDs

void setup() {
  Serial.begin(9600);     // Start serial communication (for debugging)
  matrix.begin();         // Initialize the LED matrix
}

void loop() {
  // Turn all LEDs on
  matrix.fill(1);         // 1 = on, 0 = off
  delay(500);             // Wait 500 milliseconds

  // Turn all LEDs off
  matrix.fill(0);
  delay(500);
}
```

Upload this sketch to your board by clicking the upload button in App Lab. Watch the LED array on the board. It should blink on and off every half second.

**Challenge:**
- Change the delay time to make it blink faster or slower
- Use `matrix.fill(0.5)` to set half brightness
- Try `matrix.rect(0, 0, 4, 4, 1)` to light up just the top-left quarter of the grid

### Part 2 — Keyboard Interaction: Input Meets Output (20 min)

**Activity: Pair and Read the Bluetooth Keyboard (10 min)**

Now let's add input. Let's pair our first peripheral, part of your cyberdeck. Put your Bluetooth keyboard into pairing mode (usually a key combo or a switch on the underside), then pair it with the Uno Q using App Lab's Bluetooth settings.

Write a sketch that reads key presses and turns the LED array on when it sees a `1` and off when it sees a `0`:

```cpp
#include "Arduino_LED_Matrix.h"
#include "ArduinoBLE.h"

ArduinoLEDMatrix matrix;
BLEHIDHost keyboard;

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

    if (key == '1') {
      matrix.fill(1);  // Turn all LEDs on
      Serial.println("Key '1' pressed: LED ON");
    } else if (key == '0') {
      matrix.fill(0);  // Turn all LEDs off
      Serial.println("Key '0' pressed: LED OFF");
    }
  }
}
```

Upload this sketch. Once your keyboard is paired, press `1` — the LED array should light up. Press `0` — it should turn off.

**Activity: Design Your Own LED Pattern (10 min)**

Now it's your turn to be creative. Modify the sketch to create your own keyboard-controlled LED patterns. Here are some ideas:

- **Counter mode:** Each `1` press lights up one more LED until all are lit, then a `0` press resets them all
- **Blink toggle:** Pressing `1` starts the LEDs blinking on and off; pressing `0` stops the blinking and clears the array
- **Shape display:** Light up a pattern shaped like a "1" or a "0" on the grid depending on which key was pressed

**Full-group debrief (5 min)**

Facilitator-led discussion:

- What patterns did you create? Show the class!
- What was harder than you expected about controlling hardware with code?
- How is reading a raw key press on a physical device different from listening for a `keydown` event in a web app?

### Part 3 — WiFi Connection: Your Board Joins the Network (25 min)

**Mini-lecture: How the Uno Q Connects to WiFi (5 min)**

So far, your Uno Q has been talking to your laptop over USB. Now we're going to give it its own network connection. The Uno Q has built-in WiFi so it can connect to your local network just like your phone or laptop. It's an important step towards your cyberdeck build.

Once connected over WiFi, the Uno Q can:
- Make HTTP requests to servers on your network (or the internet)
- Send data to your laptop without a USB cable
- Receive commands from other devices on the network
- Serve its own web pages — because it also has a second "brain"

This is called **Network Mode** — the board is still powered and programmed via USB, but it communicates with other devices over WiFi.

**Activity: Connect to WiFi, Connect your monitor (5 min)**

When you set up your board, you connected it to the network. Plug in your mini monitor to the USB Hub, and the USB Hub to the Arduino board. Connect your USB Hub to a power source (your computer, an outlet or a power bank). Now you can untether your board from your computers.

Reboot your board as a network-connected device and connect it to wifi. You should soon see the Arduino Login screen on your mini monitor. Login using the password you created when setting up your board.

Once logged in, open App Lab on your board. You're now running a mini computer, connected to wifi.

**Activity: Build a Sample Web App on Your Own Board (10 min)**

In App Lab, run the Web App sample app. It will open a sample web page, served directly by your Uno Q. Now you've built a mini computer!

**Challenge:** Open the sample app's source in App Lab and find where it defines its page content. Change the text it returns, save, and reload it in your browser to see your edit live.

**Activity: Connect to local AI (5 min)**

You're ready to build an AI-powered app. App Lab has several sample apps. Pick one of the AI-focused ones like the Image Classification app from the example gallery and run it. Make sure you have your kit's USB camera connected.

These sample apps are worth exploring on your own time. The full list is [here](https://docs.arduino.cc/software/app-lab/getting-started/examples/?_gl=1*fwlazj*_up*MQ..*_ga*MjA1NzIzMjQ4Ny4xNzkwMDQ0MDAz*_ga_NEXN8H46L5*czE3OTAwNDQwMDIkbzEkZzEkdDE3OTAwNDQwNzAkajUzJGwwJGgxMzQ0MTUzOTg2#explore-examples_).

### Part 4 — Talk to AI Over WiFi: The Full Pipeline (20 min)

**Activity: Connect the Uno Q to Your Python Server (10 min)**

Now let's combine everything. Connect your board to wifi and let it talk to the Ollama instance running on your computer. 

To do this, you'll write a sketch that:
1. Connects to WiFi
2. Reads the keyboard (press `1` to trigger)
3. Sends a prompt to your Python server
4. Receives the LLM response
5. Lights up the LED arra

```cpp
#include "Arduino_LED_Matrix.h"
#include "WiFiS3.h"
#include "ArduinoBLE.h"

ArduinoLEDMatrix matrix;
BLEHIDHost keyboard;
WiFiClient client;

char ssid[] = "YourWiFiName";
char pass[] = "YourWiFiPassword";

// Your laptop's IP address on the network
char serverIP[] = "192.168.1.XXX";  // Replace with your laptop's IP
int serverPort = 5000;

void setup() {
  Serial.begin(9600);
  matrix.begin();
  BLE.begin();
  keyboard.begin();
  
  // Connect to WiFi
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected");
  Serial.print("Uno Q IP: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  BLE.poll();
  
  if (keyboard.connected() && keyboard.available() && keyboard.read() == '1') {
    // Flash LED to show we're sending
    matrix.fill(1);
    delay(100);
    matrix.fill(0);
    
    // Send prompt to Python server
    if (client.connect(serverIP, serverPort)) {
      String json = "{\"prompt\":\"Tell me something interesting about technology.\"}";
      
      client.println("POST /ask HTTP/1.1");
      client.println("Host: " + String(serverIP));
      client.println("Content-Type: application/json");
      client.print("Content-Length: ");
      client.println(json.length());
      client.println();
      client.println(json);
      
      // Read the response
      String response = "";
      while (client.available()) {
        char c = client.read();
        response += c;
      }
      
      Serial.println("Response:");
      Serial.println(response);
      
      // Light up LED based on response (just a pattern for now)
      matrix.rect(0, 0, 8, 8, 1);  // Full frame
      delay(500);
      matrix.fill(0);
    }
  }
}
```

Upload this sketch. Open the Serial Monitor. Press `1` on the keyboard — you should see the request go out and the response come back.

> **Finding your laptop's IP:** On macOS, go to System Settings > Network > Wi-Fi, or run `ipconfig getifaddr en0` in the terminal. On Windows, run `ipconfig` in Command Prompt.

**Activity: Display the LLM Response on Your Laptop Screen (5 min)**

The Serial Monitor is useful for debugging, but let's make the output visible on your laptop screen. Update your Python server to also display responses in a window:

```python
from flask import Flask, request, jsonify
import subprocess
import json
import tkinter as tk
from threading import Thread

app = Flask(__name__)

# Store the latest response
latest_response = "Waiting for a key press..."

@app.route('/')
def home():
    return "Arduino Bridge Server is running!"

@app.route('/ask', methods=['POST'])
def ask_llm():
    global latest_response
    data = request.json
    prompt = data.get('prompt', 'Say hello')
    
    result = subprocess.run(
        ['ollama', 'run', 'llama3.2', prompt],
        capture_output=True,
        text=True,
        timeout=30
    )
    
    latest_response = result.stdout.strip()
    return jsonify({'response': latest_response})

def create_window():
    """Create a simple window to display the LLM response."""
    root = tk.Tk()
    root.title("AI Desk Companion")
    root.geometry("600x400")
    
    label = tk.Label(root, text="Press '1' on the keyboard connected to your Arduino!", 
                     font=("Arial", 16), wraplength=550)
    label.pack(pady=20)
    
    response_text = tk.Text(root, font=("Arial", 12), wrap="word",
                            padx=10, pady=10)
    response_text.pack(fill="both", expand=True, padx=20, pady=10)
    
    def update():
        """Check for new responses and update the window."""
        if latest_response != "Waiting for a key press...":
            response_text.delete(1.0, tk.END)
            response_text.insert(1.0, latest_response)
        root.after(1000, update)  # Check every second
    
    update()
    root.mainloop()

# Run the window in a separate thread
Thread(target=create_window, daemon=True).start()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
```

Run this updated server. Now when you press `1` on the keyboard connected to your Uno Q, the LLM response appears in a window on your laptop screen!

**Reflection: What You Built (5 min)**

Think about what you just created:

1. **Hardware input:** Keyboard press on the Uno Q
2. **Network communication:** WiFi HTTP request from Uno Q to laptop
3. **AI processing:** Local LLM (Ollama) on your laptop
4. **Physical output:** LED array on the Uno Q
5. **Visual output:** Response window on your laptop screen

This is a complete **AI-powered physical computing pipeline**. Every step from Weeks 1 and 2 led to this moment.

**Discussion prompt:** _"How does it feel to have an AI that responds to a physical action (a keypress) rather than typing in a chat box? Does it change how you think about AI as a tool?"_

## Take-Home

**Check Your Understanding**

1. What are the two essential functions in every Arduino sketch? What does each one do?
2. How does the Uno Q communicate with your laptop in PC Mode vs. Network Mode?
3. What is the role of the Python server in the AI pipeline?
4. Why might you want your Arduino to communicate over WiFi instead of USB?

**Assignment**

- Customize the system prompt in your Python server to give the LLM a personality (e.g., "You are a friendly robot who speaks in haiku")
- Try running a different Ollama model (e.g., `phi` or `mistral`) and compare the response quality and speed
- Design a new LED pattern that responds to the content of the LLM's response (e.g., positive words = green pattern, negative words = red pattern)
- Bring your Uno Q and Bluetooth keyboard to the next session

**Optional Supplemental Reading**

- [Arduino App Lab Documentation](https://docs.arduino.cc/software/app-lab/)
- [Arduino WiFi Library Reference](https://www.arduino.cc/reference/en/libraries/wifi/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Ollama Model Library](https://ollama.com/library)

## Next Steps

- [Week 4 — Can You See Me Now? Adding Computer Vision to Your Arduino](/eyes-and-ears)