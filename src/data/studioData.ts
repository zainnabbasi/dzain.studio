export type SpecCategory =
  | 'All'
  | 'Product Showcases'
  | 'Brand Films'
  | 'Campaign Creatives'
  | 'Social Media';

export interface SpecFilmItem {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<SpecCategory, 'All'>;
  durationTag: string;
  tierMatch: '15s' | '30s' | '45s' | '60s';
  aspectRatio: string;
  videoUrl: string;
  posterUrl: string;
  timecode: string;
  featuredSpan?: boolean;
  directorNotes: {
    conceptBrief: string;
    visualDirection: string;
    editingAndPacing: string;
    eliminatedConstraint: string;
  };
}

export const HERO_SHOWREEL = {
  title: 'dzain.studio — Director’s Spec Anthology (2025)',
  videoUrl: 'https://framerusercontent.com/assets/GEkG9vF2A30awmxgKpod4FLe5eI.mp4',
  posterUrl: 'https://framerusercontent.com/images/4JbDSzihCreOz0rpMGsJ5H3ES0.png',
  duration: '01:00 MASTER REEL',
  resolution: '4K UHD · 24 FPS · REC.709',
};

export const SPEC_FILMS: SpecFilmItem[] = [
  {
    id: 'spec-01',
    title: 'AETHERIA CRYO — BIO-ARCHITECTURAL SANCTUARY',
    subtitle: 'Futuristic monolithic glass chambers and atmospheric light study',
    category: 'Product Showcases',
    durationTag: '30 SEC',
    tierMatch: '30s',
    aspectRatio: '16:9 Widescreen',
    videoUrl: 'https://framerusercontent.com/assets/aG8nFo96PN3NWL4xDUOVkm0Q.mp4',
    posterUrl: 'https://framerusercontent.com/images/BTUqZMur1umx7oSR1ukG15KQk.png',
    timecode: '00:00:29:18',
    featuredSpan: true,
    directorNotes: {
      conceptBrief: 'Position a next-generation biotechnology & luxury wellness system inside a serene, futuristic architectural monolith.',
      visualDirection: 'Symmetrical wide-angle framing, deep cobalt-and-amber specular reflections across curved glass pods, and controlled volumetric mist.',
      editingAndPacing: 'Deliberate, hypnotic camera push-ins timed to a low-frequency ambient pulse so the industrial design commands full attention.',
      eliminatedConstraint: 'No custom sci-fi soundstage construction, curved glass fabrication, or complex studio lighting rig required.',
    },
  },
  {
    id: 'spec-02',
    title: 'ORBITAL HORIZON — DEEP SPACE VISOR STUDY',
    subtitle: 'Macro optical reflections and extreme-environment narrative film',
    category: 'Brand Films',
    durationTag: '60 SEC',
    tierMatch: '60s',
    aspectRatio: '16:9 Cinema',
    videoUrl: 'https://framerusercontent.com/assets/IY0EmGSPIfj0yteWQgSVb7wIo3s.mp4',
    posterUrl: 'https://framerusercontent.com/images/WgA1A862vx7cTgSiPXuago9xU8.png',
    timecode: '00:00:58:22',
    directorNotes: {
      conceptBrief: 'Communicate precision engineering and human resilience through an intimate close-up narrative set beyond Earth’s atmosphere.',
      visualDirection: '85mm macro portraiture capturing planetary light reflections across a curved helmet visor with subtle 35mm film grain.',
      editingAndPacing: 'Sustained tension holds paired with intimate breathing foley and a crescendoing orchestral synth score.',
      eliminatedConstraint: 'Bypassed specialty astronaut costume fabrication, LED volume stage rental, and multi-week VFX compositing.',
    },
  },
  {
    id: 'spec-03',
    title: 'NOMAD CHRONICLE — TWILIGHT EXPEDITION',
    subtitle: 'Editorial outerwear & automotive campaign across arid horizons',
    category: 'Campaign Creatives',
    durationTag: '45 SEC',
    tierMatch: '45s',
    aspectRatio: '16:9 / 9:16 Cutdowns',
    videoUrl: 'https://framerusercontent.com/assets/lvOWiiNTlCzPpLDzcVtSBgkQ.mp4',
    posterUrl: 'https://framerusercontent.com/images/gAtIoXzQXD8RmJUSuzpenXlxc.png',
    timecode: '00:00:44:12',
    directorNotes: {
      conceptBrief: 'Stop scroll in the first 1.5 seconds with striking human presence and cinematic twilight landscapes for a global seasonal launch.',
      visualDirection: 'Blue-hour naturalism contrasted with warm tungsten vehicle accents, shallow depth-of-field, and tactile fabric detail.',
      editingAndPacing: 'Front-loaded visual hook in frames 1–36 followed by rhythmic match-cuts across shifting desert environments.',
      eliminatedConstraint: 'Zero international location travel, desert permits, or weather-dependent reshoots.',
    },
  },
  {
    id: 'spec-04',
    title: 'SOLARIS COURT — GOLDEN HOUR KINETICS',
    subtitle: 'High-energy athletic streetwear and motion campaign cut',
    category: 'Social Media',
    durationTag: '15 SEC',
    tierMatch: '15s',
    aspectRatio: '9:16 Vertical & 16:9',
    videoUrl: 'https://framerusercontent.com/assets/WXJX4ABjPhKbtW5r6wY3OHopw.mp4',
    posterUrl: 'https://framerusercontent.com/images/pow4m27uVl7lRyeejAMfa9gN8.png',
    timecode: '00:00:15:00',
    featuredSpan: true,
    directorNotes: {
      conceptBrief: 'Deliver a kinetic 15-second announcement drop engineered for instant replayability on paid and organic social feeds.',
      visualDirection: 'Warm low-angle sunlight, dynamic low-shutter motion energy, and authentic urban court textures.',
      editingAndPacing: 'Rapid percussive cuts synced to tactile court foley and a driving bassline.',
      eliminatedConstraint: 'Produced without casting agencies, daylight lockouts, or multi-camera location crews.',
    },
  },
  {
    id: 'spec-05',
    title: 'VERDANT COMMONS — DAYLIGHT LIFESTYLE STORY',
    subtitle: 'Warm human-centric commercial storytelling for consumer brands',
    category: 'Brand Films',
    durationTag: '45 SEC',
    tierMatch: '45s',
    aspectRatio: '16:9 Widescreen',
    videoUrl: 'https://framerusercontent.com/assets/Y2xVzqxMWwg6Fy819Beau1ZkAg.mp4',
    posterUrl: 'https://framerusercontent.com/images/VetGCHFmph8wAHd5hYxAqIMIxb4.png',
    timecode: '00:00:42:09',
     featuredSpan: true,
    directorNotes: {
      conceptBrief: 'Show how AI video handles natural daylight, multi-character camaraderie, and approachable everyday brand storytelling.',
      visualDirection: 'Soft diffused afternoon sunlight, handheld organic framing, and warm analog color grading.',
      editingAndPacing: 'Conversational rhythm that lets genuine visual moments breathe while keeping the product message crystal clear.',
      eliminatedConstraint: 'Eliminated multi-talent casting days, park permits, and catering/crew overhead.',
    },
  },
  {
    id: 'spec-06',
    title: 'DZAIN NOIR — STUDIO PERFORMANCE REEL',
    subtitle: 'High-contrast chiaroscuro lighting and dynamic motion direction',
    category: 'Product Showcases',
    durationTag: '30 SEC',
    tierMatch: '30s',
    aspectRatio: '16:9 Widescreen',
    videoUrl: 'https://framerusercontent.com/assets/GEkG9vF2A30awmxgKpod4FLe5eI.mp4',
    posterUrl: 'https://framerusercontent.com/images/4JbDSzihCreOz0rpMGsJ5H3ES0.png',
    timecode: '00:00:30:00',
    directorNotes: {
      conceptBrief: 'Combine dramatic studio rim-lighting with visceral physical movement to anchor high-conviction launch campaigns.',
      visualDirection: 'Stark obsidian shadows, deep orange and tungsten edge lighting, and anamorphic lens flare control.',
      editingAndPacing: 'Precision speed-ramps that lock onto key product silhouettes at peak visual impact.',
      eliminatedConstraint: 'Achieved flagship studio commercial polish on a streamlined single-director timeline.',
    },
  },
];

export interface FlexibleEnvironmentPreset {
  id: string;
  label: string;
  locationTag: string;
  lightingStyle: string;
  cameraSetup: string;
  description: string;
  videoUrl: string;
  posterUrl: string;
  traditionalCostEliminated: string;
}

export const FLEXIBLE_BY_DESIGN_PRESETS: FlexibleEnvironmentPreset[] = [
  {
    id: 'env-futuristic',
    label: '01. Futuristic Monolith',
    locationTag: 'CRYO-GLASS ARCHITECTURAL CHAMBER',
    lightingStyle: 'Bioluminescent Cobalt + Warm Specular Highlights',
    cameraSetup: '24mm Anamorphic Symmetry · 24fps',
    description: 'Place your product or story inside bespoke futuristic architecture without building physical soundstages or costly set pieces.',
    videoUrl: 'https://framerusercontent.com/assets/aG8nFo96PN3NWL4xDUOVkm0Q.mp4',
    posterUrl: 'https://framerusercontent.com/images/BTUqZMur1umx7oSR1ukG15KQk.png',
    traditionalCostEliminated: 'Replaces custom set construction & multi-week CGI environment builds',
  },
  {
    id: 'env-orbital',
    label: '02. Special Environments',
    locationTag: 'DEEP-SPACE ORBITAL EXTERIOR',
    lightingStyle: 'Hard Solar Rim + Visor Reflection Mapping',
    cameraSetup: '85mm Macro Prime · 24fps',
    description: 'Transport campaigns into impossible environments—from orbital space to extreme terrain—while maintaining photorealistic optical detail.',
    videoUrl: 'https://framerusercontent.com/assets/IY0EmGSPIfj0yteWQgSVb7wIo3s.mp4',
    posterUrl: 'https://framerusercontent.com/images/WgA1A862vx7cTgSiPXuago9xU8.png',
    traditionalCostEliminated: 'Replaces LED volume stages, specialty props & heavy VFX pipelines',
  },
  {
    id: 'env-expedition',
    label: '03. Remote Twilight Horizon',
    locationTag: 'ARID DESERT & URBAN BORDERLANDS',
    lightingStyle: 'Blue-Hour Ambient + Warm Tungsten Key',
    cameraSetup: '35mm Tracking Steadicam · 24fps',
    description: 'Shift locations in seconds—testing how your brand story feels across remote outdoor landscapes without flying a crew.',
    videoUrl: 'https://framerusercontent.com/assets/lvOWiiNTlCzPpLDzcVtSBgkQ.mp4',
    posterUrl: 'https://framerusercontent.com/images/gAtIoXzQXD8RmJUSuzpenXlxc.png',
    traditionalCostEliminated: 'Replaces international location scouting, travel logistics & weather delays',
  },
  {
    id: 'env-goldenhour',
    label: '04. Golden-Hour Street Court',
    locationTag: 'SUN-DRENCHED URBAN ARENA',
    lightingStyle: 'Low-Angle Natural Sun + Warm Bounce',
    cameraSetup: '50mm Dynamic Handheld · 48fps Ramp',
    description: 'Evolve visual styles effortlessly from futuristic sci-fi chambers to warm, kinetic golden-hour lifestyle cinematography.',
    videoUrl: 'https://framerusercontent.com/assets/WXJX4ABjPhKbtW5r6wY3OHopw.mp4',
    posterUrl: 'https://framerusercontent.com/images/pow4m27uVl7lRyeejAMfa9gN8.png',
    traditionalCostEliminated: 'Replaces multi-talent casting lockouts, permits & grip truck setups',
  },
];

export interface PipelineStep {
  number: string;
  code: string;
  title: string;
  summary: string;
  detail: string;
  deliverable: string;
}

export const PRODUCTION_PIPELINE: PipelineStep[] = [
  {
    number: '01',
    code: 'STEP_01.BRIEF',
    title: 'Concept Understanding',
    summary: 'Understanding the brief, product and communication.',
    detail: 'Before generating a single frame, we clarify what the video must achieve—the core hook, the audience perception shift, and the single clearest message your viewer should walk away with.',
    deliverable: 'Creative Brief Alignment & Narrative Hook Blueprint',
  },
  {
    number: '02',
    code: 'STEP_02.LOOKDEV',
    title: 'Visual Direction',
    summary: 'Building the overall look, mood and visual language.',
    detail: 'We define lens characteristics, color script, lighting ratios, and environment architecture so every frame belongs to the same cohesive cinematic world.',
    deliverable: 'Style Frames, Color Script & Visual Language Guide',
  },
  {
    number: '03',
    code: 'STEP_03.GEN',
    title: 'AI Generation',
    summary: 'Creating and refining the required shots.',
    detail: 'Using multi-stage generative workflows, control nets, and custom compositing, we generate, iterate, and refine shots until motion physics, framing, and brand details feel intentional.',
    deliverable: 'Curated High-Resolution Scene Selects',
  },
  {
    number: '04',
    code: 'STEP_04.EDIT',
    title: 'Editing',
    summary: 'Bringing the scenes together with the right pacing and flow.',
    detail: 'Knowing which shot works, which one does not, what should come next, and how long a moment should stay. We cut for emotional rhythm and narrative clarity.',
    deliverable: 'Director’s Picture Lock & Color-Graded Timeline',
  },
  {
    number: '05',
    code: 'STEP_05.MASTER',
    title: 'Sound & Finishing',
    summary: 'Music, sound design and final polish.',
    detail: 'Sound is half the film. We layer custom music, tactile foley, atmospheric risers, and final color finishing to deliver a broadcast-ready master.',
    deliverable: 'Final Mastered Video Ready for Campaign Deployment',
  },
];

export const SIMPLE_CLIENT_FLOW = [
  {
    step: '01',
    title: 'You share the idea.',
    description: 'Bring a rough thought, a product link, a script, or a campaign goal.',
  },
  {
    step: '02',
    title: 'We understand what the video needs to communicate.',
    description: 'We distill the core message and structure the narrative pacing for your target duration.',
  },
  {
    step: '03',
    title: 'We build the visual world around it.',
    description: 'We establish the mood, lighting, environment, and visual direction before full production.',
  },
  {
    step: '04',
    title: 'We create, refine and edit the film.',
    description: 'We generate the shots, curate the strongest performances, and cut the film with sound design.',
  },
  {
    step: '05',
    title: 'You receive a finished video ready to use.',
    description: 'Delivered in high-definition masters formatted for your launch channels, ads, or social feeds.',
  },
];

export const REMOVED_PRODUCTION_LIMITS = [
  {
    limit: 'Large Sets',
    traditionalPain: 'Soundstage bookings, construction crews, and multi-day strike costs.',
    aiAdvantage: 'Scale from intimate tabletop macro to monumental architecture on demand.',
  },
  {
    limit: 'Multiple Locations',
    traditionalPain: 'Company moves, travel budgets, weather contingency days, and permits.',
    aiAdvantage: 'Transition across five distinct environments inside a single 30-second cut.',
  },
  {
    limit: 'Complex Shoots',
    traditionalPain: 'Motion-control rigs, high-speed phantom cameras, and hazardous stunt logistics.',
    aiAdvantage: 'Execute impossible camera trajectories and dynamic physics safely and repeatably.',
  },
  {
    limit: 'Special Environments',
    traditionalPain: 'Zero-gravity, volcanic terrain, deep ocean, or futuristic worlds require huge VFX budgets.',
    aiAdvantage: 'Place products and stories inside any conceivable environment with cohesive lighting.',
  },
  {
    limit: 'Heavy Production Setups',
    traditionalPain: 'Weeks of pre-production overhead before you ever see how a concept looks on screen.',
    aiAdvantage: 'A flexible, nimble process focused 100% on what appears inside the final frame.',
  },
];

export const FAQ_ITEMS = [
  {
    question: 'What makes director-led AI video different from prompting clips yourself?',
    answer:
      'Prompting generates isolated clips; direction creates a cohesive film. As outlined in our production philosophy, it is not about how many clips AI can make—it is about knowing which shot works, which one does not, what should come next, how long a moment should stay, and how sound and pacing bind every cut into a clear message.',
  },
  {
    question: 'Why is your pricing based strictly on video duration?',
    answer:
      'Sometimes a strong idea works best in 10 seconds; sometimes it needs 30; sometimes the story deserves 60 seconds. Duration-based pricing (₹5,000 for up to 15s, ₹10,000 for up to 30s, ₹14,000 for up to 45s, and ₹18,000 for up to 60s) keeps budgeting 100% transparent without unpredictable day-rate overruns or location surcharges.',
  },
  {
    question: 'Is every step—from concept to sound design—included in the listed price?',
    answer:
      'Yes. Every duration tier follows our complete 5-step process: 01. Concept Understanding, 02. Visual Direction, 03. AI Generation, 04. Editing, and 05. Sound & Finishing. You receive a finished, polished video ready to deploy.',
  },
  {
    question: 'Can you integrate our actual physical product or brand identity accurately?',
    answer:
      'Yes. We combine reference imagery, product renders, or clean photography of your product with directed AI environments and compositing so your branding, typography, and industrial design remain faithful while the surrounding world is elevated.',
  },
  {
    question: 'How do revisions and creative feedback work during production?',
    answer:
      'Because our workflow is flexible by design, we align on the Concept and Visual Direction (Steps 01 & 02) before locking generation. During editing, we can reimagine scenes, adjust pacing, or shift environments rapidly without reshoot costs.',
  },
  {
    question: 'What if I only have a rough idea and no script yet?',
    answer:
      'That is exactly what Step 01 (Concept Understanding) is built for. You share the core idea or product goal, we translate it into a visual treatment and shot structure, and then we bring the film to life.',
  },
];
