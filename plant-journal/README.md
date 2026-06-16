# Plant Journal

In-browser plant training (TensorFlow.js / MobileNet), journal check-ins with photos, and care tips (templates + optional Ollama). Plain HTML, CSS, and JS.

## Run locally

```bash
cd plant-journal
npm install
npm run dev
```

Open http://localhost:5174 and allow camera access.

## Workflow

1. **Train:** Add classes (e.g. `Fern`, `Succulent`), capture webcam samples — or record/upload a video and **Extract frames & add samples** (uses ffmpeg.wasm in the browser).
2. **Train from video:** Under **Train from video**, record a short clip of your potted plant or upload a `.mp4`/`.webm`. Set frames per second, then extract. Each frame becomes a training sample for the active class.
3. **Local ffmpeg (optional):** `npm run extract-frames -- path/to/plant.mp4` writes JPEGs to a folder you can import with **Import images**.
4. **Identify:** **Identify plant**, add an optional note, then **Save to journal** (photo + prediction stored in your browser).
5. **Journal:** Browse entries, read care tips, ask questions, or **Generate with Ollama** for richer cards.

## plants.json

Map class names (case-insensitive) to care copy. Keys like `fern` match labels `Fern`.

## Ollama (optional)

Default: `http://localhost:11434`, model `qwen2.5`. Change under **Journal → Ollama settings**.

```bash
ollama serve
ollama pull qwen2.5
```

Only plant names and care facts are sent to Ollama, not photos. Journal photos stay in `localStorage` on your device.
