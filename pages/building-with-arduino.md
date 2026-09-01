---
outline: deep
---

# Hello, Arduino Uno Q: From PC Control to Networked AI

_Intermediate Course · Week 3_

![Sketchnotes, week 3]()

| **Lesson Goal**            | How do you connect an Arduino Uno Q to your laptop, control its hardware, and make it talk to a local AI over WiFi? |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **What you'll learn**       | By the end of this week you will be able to:<br>- Set up the Arduino Uno Q with Arduino App Lab and upload your first sketch<br>- Write Arduino code to control the built-in LED array<br>- Read input from a USB mouse and map it to LED patterns<br>- Connect the Uno Q to WiFi and send/receive data over HTTP<br>- Build a client-server pipeline where the Uno Q talks to a local LLM (Ollama) via a Python server on your laptop |
| **Tools you'll need**       | Arduino Uno Q board, USB cable, mini mouse, USB hub, laptop with Arduino App Lab installed, Ollama running on laptop (from Week 2), Python 3 with Flask installed |
| **End result**              | A working "AI desk companion" — click the mouse, and the Uno Q triggers a local LLM query, with the response displayed on the laptop screen and the LED array lighting up |
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

An Arduino sketch (the name for an Arduino program) has two essential functions:

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

The Uno Q has a built-in **LED array** — a grid of individually controllable LEDs. In App Lab, you control them by writing to specific pins or using the board's LED library.

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

Upload this sketch to your board by clicking the upload button in App Lab. Watch the LED array — it should blink on and off every half second.

**Try these variations:**
- Change the delay time to make it blink faster or slower
- Use `matrix.fill(0.5)` to set half brightness
- Try `matrix.rect(0, 0, 4, 4, 1)` to light up just the top-left quarter of the grid

**Discussion prompt (5 min):** _"What's different about programming hardware vs. programming a website or app? What feels the same?"_

### Part 2 — Mouse Interaction: Input Meets Output (20 min)

**Activity: Read the Mouse (10 min)**

Now let's add input. Connect your mini mouse to the USB hub, then connect the hub to the Uno Q. The Uno Q can read USB HID devices like mice and keyboards.

Write a sketch that reads mouse movements and lights up the LED array accordingly:

```cpp
#include "Arduino_LED_Matrix.h"
#include "USBHost.h"

ArduinoLEDMatrix matrix;
USBHost usb;
USBHIDMouse mouse(usb);

void setup() {
  Serial.begin(9600);
  matrix.begin();
  usb.begin();
}

void loop() {
  usb.Task();  // Poll the USB bus for mouse events

  if (mouse.available()) {
    int x = mouse.getX();  // Mouse movement on X axis
    int y = mouse.getY();  // Mouse movement on Y axis

    // Map mouse position to LED brightness
    // If mouse moved right, light up right side of array
    if (x > 0) {
      matrix.rect(4, 0, 4, 8, 1);  // Right half on
      matrix.rect(0, 0, 4, 8, 0);  // Left half off
    } else if (x < 0) {
      matrix.rect(0, 0, 4, 8, 1);  // Left half on
      matrix.rect(4, 0, 4, 8, 0);  // Right half off
    }

    // Click to flash all LEDs
    if (mouse.clicked()) {
      matrix.fill(1);
      delay(100);
      matrix.fill(0);
    }

    mouse.release();
  }
}
```

Upload this sketch. Move the mouse — the LED array should respond. Click to flash.

> **Note:** The exact pin names and library functions may vary slightly depending on your App Lab version. Check the board documentation for the correct LED matrix library.

**Activity: Design Your Own LED Pattern (10 min)**

Now it's your turn to be creative. Modify the sketch to create your own mouse-controlled LED patterns. Here are some ideas:

- **Follow the pointer:** Light up the LED closest to where the mouse cursor would be on a grid
- **Speed indicator:** The faster you move the mouse, the brighter or faster the LEDs blink
- **Click counter:** Each click lights up one more LED until all are lit, then reset

**Full-group debrief (5 min)**

Facilitator-led discussion:

- What patterns did you create? Show the class!
- What was harder than you expected about controlling hardware with code?
- How is reading a mouse input different from reading keyboard input in a web app?

### Part 3 — WiFi Connection: Your Board Joins the Network (20 min)

**Mini-lecture: How the Uno Q Connects to WiFi (5 min)**

So far, your Uno Q has been talking to your laptop over USB. Now we're going to give it its own network connection. The Uno Q has built-in WiFi — it can connect to your local network just like your phone or laptop.

Once connected over WiFi, the Uno Q can:
- Make HTTP requests to servers on your network (or the internet)
- Send data to your laptop without a USB cable
- Receive commands from other devices on the network

This is called **Network Mode** — the board is still powered and programmed via USB, but it communicates with other devices over WiFi.

**Activity: Connect to WiFi and Make a Request (10 min)**

Write a sketch that connects your Uno Q to WiFi and makes an HTTP GET request:

```cpp
#include "WiFiS3.h"  // WiFi library for the Uno Q

// Replace with your network credentials
char ssid[] = "YourWiFiName";
char pass[] = "YourWiFiPassword";

int status = WL_IDLE_STATUS;
WiFiClient client;

void setup() {
  Serial.begin(9600);
  while (!Serial) { ; }

  // Connect to WiFi
  Serial.print("Connecting to ");
  Serial.println(ssid);

  status = WiFi.begin(ssid, pass);
  while (status != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
    status = WiFi.begin(ssid, pass);
  }

  Serial.println("\nConnected!");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // Make a request to a test server
  if (client.connect("example.com", 80)) {
    client.println("GET / HTTP/1.1");
    client.println("Host: example.com");
    client.println("Connection: close");
    client.println();
    delay(1000);
  }

  // Read the response
  while (client.available()) {
    char c = client.read();
    Serial.print(c);
  }

  delay(10000);  // Wait 10 seconds before next request
}
```

Upload this sketch and open the Serial Monitor in App Lab. You should see the connection status and the HTTP response from the server.

> **Security note:** Don't hardcode your WiFi password in a sketch you might share publicly. For this class, it's fine since you're working locally.

**Activity: Set Up the Python Server on Your Laptop (5 min)**

Now let's set up the server that will bridge your Uno Q and your local AI. On your laptop, create a new Python file called `arduino_bridge.py`:

```python
from flask import Flask, request, jsonify
import subprocess
import json

app = Flask(__name__)

@app.route('/')
def home():
    return "Arduino Bridge Server is running!"

@app.route('/ask', methods=['POST'])
def ask_llm():
    """Receive a prompt from the Uno Q and send it to Ollama."""
    data = request.json
    prompt = data.get('prompt', 'Say hello')
    
    # Call Ollama with the prompt
    result = subprocess.run(
        ['ollama', 'run', 'llama3.2', prompt],
        capture_output=True,
        text=True,
        timeout=30
    )
    
    response = result.stdout.strip()
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
```

Install Flask if you haven't already:

```bash
pip install flask
```

Run the server:

```bash
python arduino_bridge.py
```

You should see output like: `Running on http://0.0.0.0:5000`

> **Note:** Make sure Ollama is running (from Week 2) and has the llama3.2 model downloaded.

### Part 4 — Talk to AI Over WiFi: The Full Pipeline (25 min)

**Activity: Connect the Uno Q to Your Python Server (10 min)**

Now let's combine everything. Write a sketch that:
1. Connects to WiFi
2. Reads the mouse (click to trigger)
3. Sends a prompt to your Python server
4. Receives the LLM response
5. Lights up the LED array

```cpp
#include "Arduino_LED_Matrix.h"
#include "WiFiS3.h"
#include "USBHost.h"

ArduinoLEDMatrix matrix;
USBHost usb;
USBHIDMouse mouse(usb);
WiFiClient client;

char ssid[] = "YourWiFiName";
char pass[] = "YourWiFiPassword";

// Your laptop's IP address on the network
char serverIP[] = "192.168.1.XXX";  // Replace with your laptop's IP
int serverPort = 5000;

void setup() {
  Serial.begin(9600);
  matrix.begin();
  usb.begin();
  
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
  usb.Task();
  
  if (mouse.available() && mouse.clicked()) {
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
    
    mouse.release();
  }
}
```

Upload this sketch. Open the Serial Monitor. Click the mouse — you should see the request go out and the response come back.

> **Finding your laptop's IP:** On macOS, go to System Settings > Network > Wi-Fi, or run `ipconfig getifaddr en0` in the terminal. On Windows, run `ipconfig` in Command Prompt.

**Activity: Display the LLM Response on Your Laptop Screen (10 min)**

The Serial Monitor is useful for debugging, but let's make the output visible on your laptop screen. Update your Python server to also display responses in a window:

```python
from flask import Flask, request, jsonify
import subprocess
import json
import tkinter as tk
from threading import Thread

app = Flask(__name__)

# Store the latest response
latest_response = "Waiting for a click..."

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
    
    label = tk.Label(root, text="Click the mouse on your Arduino!", 
                     font=("Arial", 16), wraplength=550)
    label.pack(pady=20)
    
    response_text = tk.Text(root, font=("Arial", 12), wrap="word",
                            padx=10, pady=10)
    response_text.pack(fill="both", expand=True, padx=20, pady=10)
    
    def update():
        """Check for new responses and update the window."""
        if latest_response != "Waiting for a click...":
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

Run this updated server. Now when you click the mouse on your Uno Q, the LLM response appears in a window on your laptop screen!

**Reflection: What You Built (5 min)**

Think about what you just created:

1. **Hardware input:** Mouse click on the Uno Q
2. **Network communication:** WiFi HTTP request from Uno Q to laptop
3. **AI processing:** Local LLM (Ollama) on your laptop
4. **Physical output:** LED array on the Uno Q
5. **Visual output:** Response window on your laptop screen

This is a complete **AI-powered physical computing pipeline**. Every step from Weeks 1 and 2 led to this moment.

**Discussion prompt:** _"How does it feel to have an AI that responds to a physical action (a mouse click) rather than typing in a chat box? Does it change how you think about AI as a tool?"_

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
- Bring your Uno Q, mouse, and USB hub to the next session

**Optional Supplemental Reading**

- [Arduino App Lab Documentation](https://docs.arduino.cc/software/app-lab/)
- [Arduino WiFi Library Reference](https://www.arduino.cc/reference/en/libraries/wifi/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Ollama Model Library](https://ollama.com/library)

## Next Steps

- [Week 4 — Can You See Me Now? Adding Computer Vision to Your Arduino](/eyes-and-ears)