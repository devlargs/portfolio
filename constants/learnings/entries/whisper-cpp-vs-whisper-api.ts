import { Learning } from '../types';

const learning: Learning = {
  slug: 'whisper-cpp-vs-whisper-api',
  title: 'Replacing the Whisper API with whisper.cpp: cutting transcription costs to zero',
  summary:
    'Local transcription did not make my costs zero, it moved them. What it bought was permission to re-run the whole back catalog every time I changed how I segment verses.',
  published: '2026-09-15',
  tags: ['whisper', 'transcription', 'ffmpeg', 'self-hosting'],
  body: [
    {
      kind: 'text',
      content: 'The bill was never the scary part. The scary part was that every retry cost money again.',
    },
    {
      kind: 'text',
      content:
        'Battle Rap PH is a verse search product. To make it work I have to chop FlipTop and local league battles into verse segments with timestamps, then feed those segments into Meilisearch. That means I am not transcribing a video once. I am transcribing it, looking at how badly the segment boundaries cut a bar in half, changing something, and transcribing it again. Sometimes five times. Sometimes I come back three weeks later with a better idea and redo the whole back catalog.',
    },
    {
      kind: 'text',
      content:
        'With a hosted API, that loop has a price tag on it. At $0.006 per minute, an hour of footage is about 36 cents. A full league night VOD can run past three hours. Do that across a catalog, then re-run it because you changed your chunking logic, and you are paying rent on your own indecision.',
    },
    {
      kind: 'text',
      content:
        'That is the actual argument for local transcription. It is not the unit cost. It is that experimentation becomes free.',
    },
    {
      kind: 'heading',
      content: 'What killed it for me specifically',
    },
    {
      kind: 'text',
      content: 'Two things, and neither is the price.',
    },
    {
      kind: 'text',
      content:
        'First, the 25MB upload cap. Long battles blow past it, so you chunk. And you chunk on file size or on a timer, which means you are slicing audio at a moment that has nothing to do with where a bar ends. A punchline split across two requests comes back as two half sentences with no idea the other half exists. I was building infrastructure to work around a limit that only exists because the compute is somewhere else.',
    },
    {
      kind: 'text',
      content:
        'Second, latency on iteration. Every test is a network round trip for audio measured in hundreds of megabytes, over a connection in the Philippines that has already tried to kill me in other ways this year.',
    },
    {
      kind: 'heading',
      content: 'The setup, minus the yak shaving',
    },
    {
      kind: 'text',
      content:
        "whisper.cpp is Georgi Gerganov's C/C++ port built on ggml, the same library under llama.cpp. On Windows the honest path is CMake plus the MSVC build tools:",
    },
    {
      kind: 'code',
      label: 'terminal',
      content: `git clone https://github.com/ggml-org/whisper.cpp
cd whisper.cpp
cmake -B build
cmake --build build -j --config Release
sh ./models/download-ggml-model.sh large-v3-turbo`,
    },
    {
      kind: 'text',
      content:
        'If you have an NVIDIA card, `cmake -B build -DGGML_CUDA=1` puts the encoder and decoder on cuBLAS kernels. `-DGGML_VULKAN=1` gives you one binary that targets NVIDIA, AMD, and Intel Arc. The models ship as quantized `.bin` files, so a large-v3 that weighs around 3GB drops to roughly 1.1GB at q5_0 with very little accuracy loss.',
    },
    {
      kind: 'note',
      tone: 'warn',
      content:
        'The trap that eats an afternoon: whisper.cpp wants 16kHz mono 16-bit WAV. Not your mp4. Not your m4a. Feed it anything else and you get a useless error or worse, garbage output. So ffmpeg first, always.',
    },
    {
      kind: 'code',
      label: 'terminal',
      content: `ffmpeg -i battle.mp4 -ar 16000 -ac 1 -c:a pcm_s16le battle.wav
./build/bin/whisper-cli -m models/ggml-large-v3-turbo.bin -f battle.wav -l tl -oj`,
    },
    {
      kind: 'text',
      content: '`-oj` gives you JSON with segment timestamps, which is the whole point for a search product.',
    },
    {
      kind: 'heading',
      content: 'My strongest opinion here: do not write native bindings first',
    },
    {
      kind: 'text',
      content:
        'The tempting move is a node addon so your NestJS worker can call whisper.cpp in-process. Do not start there. node-gyp on Windows means matching Windows SDK versions, and I have already lost days of my life to that toolchain for other projects. It is a genuinely miserable place to debug a product idea.',
    },
    {
      kind: 'text',
      content:
        'Shell out to `whisper-cli` from your job queue and parse the JSON. It is boring. It survives whisper.cpp version bumps. You can swap in a different binary without touching your backend. When the pipeline is stable and profiling actually shows process spawn overhead mattering, revisit it. It probably will not.',
    },
    {
      kind: 'heading',
      content: 'What I did not get',
    },
    {
      kind: 'text',
      content:
        'Zero cost is real. Zero tradeoff is not, and anyone telling you otherwise is selling a self-hosting course.',
    },
    {
      kind: 'text',
      content:
        'Taglish is where this hurts. Whisper handles Tagalog and handles English, but Philippine battle rap switches between them inside a single bar, and the model has to pick a language lane. Pin `-l tl` and English lines degrade. Let it auto-detect and it flip-flops mid-battle. There is no setting that fixes this. It is a model limitation, not a config problem.',
    },
    {
      kind: 'text',
      content:
        'Proper nouns are the second wound. Emcee names, league names, regional slang, all of it comes back mangled, and in a search product the names are the highest value tokens in the entire transcript. The sane fix is not a better model. I already have a structured emcees collection in the backend, so the correction belongs in a post-pass that fuzzy matches transcript tokens against names I already know, rather than hoping the decoder guesses right.',
    },
    {
      kind: 'text',
      content:
        'And your machine is busy while this runs. That is fine for a batch pipeline. It would be unacceptable for anything user facing and real time. If a user is waiting on a transcript, pay the API and stop reading blog posts about saving 36 cents.',
    },
    {
      kind: 'heading',
      content: 'The honest accounting',
    },
    {
      kind: 'text',
      content:
        'I did not cut transcription costs to zero. I moved them. They now live in electricity, in a desktop that is unusable for an hour at a time, and in the evening I spent fighting a WAV sample rate.',
    },
    {
      kind: 'text',
      content:
        'What I bought with that is the thing I actually wanted: permission to re-run everything. When a retry costs nothing, you try the thing you were too cheap to try. For a search product where quality lives entirely in how you segment and clean the text, that is worth more than the line item it replaced.',
    },
  ],
};

export default learning;
