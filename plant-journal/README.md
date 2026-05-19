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

1. **Train:** Add classes (e.g. `Fern`, `Succulent`), capture webcam samples, **Train model**.
2. **Identify:** **Identify plant**, add an optional note, then **Save to journal** (photo + prediction stored in your browser).
3. **Journal:** Browse entries, read care tips, ask questions, or **Generate with Ollama** for richer cards.

## plants.json

Map class names (case-insensitive) to care copy. Keys like `fern` match labels `Fern`.

## Ollama (optional)

Default: `http://localhost:11434`, model `qwen2.5`. Change under **Journal → Ollama settings**.

```bash
ollama serve
ollama pull qwen2.5
```

Only plant names and care facts are sent to Ollama, not photos. Journal photos stay in `localStorage` on your device.
