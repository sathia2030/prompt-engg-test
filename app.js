const templates = [
  {
    id: "explain",
    name: "Explain a concept",
    description: "Make complex ideas feel simple",
    category: "Learning",
    icon: "✳",
    defaults: { topic: "", audience: "a curious beginner", detail: "a simple analogy and a practical example", format: "A short, friendly explanation with clear headings" },
    fields: [
      { key: "topic", label: "What do you want to understand?", placeholder: "e.g. how neural networks learn", hint: "Be as specific as you like" },
      { key: "audience", label: "Who is this for?", placeholder: "e.g. a curious beginner", hint: "Set the knowledge level" },
      { key: "detail", label: "What would make it click?", placeholder: "e.g. a simple analogy and a practical example", hint: "Optional helpful context" },
      { key: "format", label: "Preferred format", placeholder: "e.g. a short explanation with headings" }
    ],
    prompt: "You are a clear, patient teacher. Explain {{topic}} to {{audience}}.\n\nMake it easy to understand by including {{detail}}. Use this format: {{format}}.\n\nAvoid unnecessary jargon. If a technical term is important, define it in plain language."
  },
  {
    id: "brainstorm",
    name: "Brainstorm ideas",
    description: "Get unstuck and explore options",
    category: "Creative",
    icon: "✧",
    defaults: { goal: "", audience: "a broad audience", quantity: "10", constraints: "Keep ideas practical, distinct, and easy to explore.", style: "A numbered list with one-sentence explanations" },
    fields: [
      { key: "goal", label: "What are we brainstorming?", placeholder: "e.g. names for a neighborhood book club" },
      { key: "audience", label: "Who is it for?", placeholder: "e.g. first-time founders" },
      { key: "quantity", label: "How many ideas?", placeholder: "e.g. 10", type: "number", min: 1, max: 50 },
      { key: "constraints", label: "Any guardrails?", placeholder: "e.g. keep ideas practical and low-cost", type: "textarea" },
      { key: "style", label: "How should ideas be presented?", placeholder: "e.g. a numbered list with short explanations" }
    ],
    prompt: "Act as a curious, imaginative brainstorming partner. Generate {{quantity}} ideas for {{goal}}, designed for {{audience}}.\n\nGuidelines: {{constraints}}\n\nPresent them as {{style}}. Aim for variety rather than repeating the same idea in different words."
  },
  {
    id: "write",
    name: "Write something",
    description: "Shape a first draft with a clear voice",
    category: "Writing",
    icon: "↗",
    defaults: { deliverable: "", reader: "", tone: "Warm, clear, and confident", points: "", length: "About 300 words" },
    fields: [
      { key: "deliverable", label: "What are you writing?", placeholder: "e.g. a launch email for a new feature" },
      { key: "reader", label: "Who will read it?", placeholder: "e.g. existing customers" },
      { key: "tone", label: "What should it sound like?", placeholder: "e.g. warm, clear, and confident" },
      { key: "points", label: "What must it include?", placeholder: "Add key details, links, or a call to action", type: "textarea" },
      { key: "length", label: "How long should it be?", placeholder: "e.g. about 300 words" }
    ],
    prompt: "You are a thoughtful writing partner. Draft {{deliverable}} for {{reader}}.\n\nVoice: {{tone}}\nLength: {{length}}\n\nInclude these points: {{points}}\n\nMake the writing natural, specific, and easy to scan. Don't invent facts that weren't provided."
  },
  {
    id: "summarize",
    name: "Summarize & extract",
    description: "Find the signal in a long text",
    category: "Work",
    icon: "≋",
    defaults: { content: "", focus: "the main ideas, decisions, and next steps", audience: "a busy teammate", format: "A short summary followed by bullet points" },
    fields: [
      { key: "content", label: "Text to summarize", placeholder: "Paste notes, an article, or a meeting transcript", type: "textarea" },
      { key: "focus", label: "What should I focus on?", placeholder: "e.g. decisions, risks, and open questions" },
      { key: "audience", label: "Who is this for?", placeholder: "e.g. a busy teammate" },
      { key: "format", label: "Output format", placeholder: "e.g. a short summary followed by bullets" }
    ],
    prompt: "Summarize the text below for {{audience}}. Focus on {{focus}}.\n\nPresent the result as {{format}}. Preserve important names, dates, and numbers. Clearly label anything that is uncertain or still needs a decision.\n\n--- TEXT ---\n{{content}}"
  },
  {
    id: "code-review",
    name: "Review some code",
    description: "Get a useful, prioritized code review",
    category: "Building",
    icon: "{ }",
    defaults: { code: "", goal: "", language: "The language or framework used in the snippet", focus: "Correctness, edge cases, and readability" },
    fields: [
      { key: "code", label: "Code to review", placeholder: "Paste the relevant snippet here", type: "textarea" },
      { key: "goal", label: "What should this code do?", placeholder: "Describe the expected behavior", type: "textarea" },
      { key: "language", label: "Language / framework", placeholder: "e.g. TypeScript with React" },
      { key: "focus", label: "What should I focus on?", placeholder: "e.g. correctness and edge cases" }
    ],
    prompt: "Review the {{language}} code below. Its intended behavior is: {{goal}}\n\nFocus on {{focus}}. Prioritize actionable bugs or risks over personal style preferences.\n\nFor each finding, explain the impact and point to the relevant code. If you don't find a meaningful issue, say so plainly instead of inventing one.\n\n--- CODE ---\n{{code}}"
  },
  {
    id: "plan",
    name: "Plan a project",
    description: "Turn a big goal into doable steps",
    category: "Work",
    icon: "◷",
    defaults: { goal: "", timeframe: "the next four weeks", resources: "A small team with limited time", detail: "Milestones, dependencies, and likely risks", format: "A phased plan with a short checklist" },
    fields: [
      { key: "goal", label: "What do you want to achieve?", placeholder: "e.g. launch a small community newsletter" },
      { key: "timeframe", label: "What is the timeline?", placeholder: "e.g. the next four weeks" },
      { key: "resources", label: "What resources are available?", placeholder: "e.g. a small team with limited time" },
      { key: "detail", label: "What should the plan cover?", placeholder: "e.g. milestones and likely risks" },
      { key: "format", label: "Preferred format", placeholder: "e.g. a phased plan with a checklist" }
    ],
    prompt: "Help me make a practical plan to {{goal}} within {{timeframe}}.\n\nAvailable resources: {{resources}}\n\nInclude {{detail}}. Present the plan as {{format}}. Make the first steps concrete and note assumptions where information is missing."
  }
];

const storageKeys = {
  selected: "promptcraft:selected-template",
  inputs: "promptcraft:template-inputs",
  output: "promptcraft:prompt-output"
};

const categoryList = document.querySelector("#category-list");
const templateList = document.querySelector("#template-list");
const templateSearch = document.querySelector("#template-search");
const templateCount = document.querySelector("#template-count");
const selectedTemplate = document.querySelector("#selected-template");
const fieldList = document.querySelector("#field-list");
const promptOutput = document.querySelector("#prompt-output");
const characterCount = document.querySelector("#character-count");
const copyStatus = document.querySelector("#copy-status");
const copyButton = document.querySelector("#copy-button");
const resetButton = document.querySelector("#reset-button");

let activeCategory = "All";
let activeTemplateId = getStoredValue(storageKeys.selected) || templates[0].id;
let savedInputs = parseStoredValue(storageKeys.inputs, {});
let saveTimer;

if (!templates.some((template) => template.id === activeTemplateId)) {
  activeTemplateId = templates[0].id;
}

function getStoredValue(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function parseStoredValue(key, fallback) {
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function saveValue(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Keep the composer usable when browser storage is unavailable or full.
  }
}

function getActiveTemplate() {
  return templates.find((template) => template.id === activeTemplateId) || templates[0];
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function renderCategories() {
  const categories = ["All", ...new Set(templates.map((template) => template.category))];
  categoryList.replaceChildren();

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.className = "category-button";
    button.type = "button";
    button.textContent = category;
    button.setAttribute("aria-pressed", String(activeCategory === category));
    button.addEventListener("click", () => {
      activeCategory = category;
      renderCategories();
      renderTemplates();
    });
    categoryList.append(button);
  });
}

function renderTemplates() {
  const query = templateSearch.value.trim().toLowerCase();
  const matches = templates.filter((template) => {
    const matchesCategory = activeCategory === "All" || template.category === activeCategory;
    const searchable = `${template.name} ${template.description} ${template.category}`.toLowerCase();
    return matchesCategory && searchable.includes(query);
  });

  templateCount.textContent = String(matches.length).padStart(2, "0");
  templateList.replaceChildren();

  if (matches.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-list";
    empty.textContent = "No templates match that search. Try another word or category.";
    templateList.append(empty);
    return;
  }

  matches.forEach((template) => {
    const button = document.createElement("button");
    button.className = "template-button";
    button.type = "button";
    button.setAttribute("aria-pressed", String(template.id === activeTemplateId));
    button.innerHTML = `
      <span class="template-icon" aria-hidden="true">${escapeHtml(template.icon)}</span>
      <span class="template-copy">
        <span class="template-name">${escapeHtml(template.name)}</span>
        <span class="template-description">${escapeHtml(template.description)}</span>
      </span>`;
    button.addEventListener("click", () => selectTemplate(template.id));
    templateList.append(button);
  });
}

function selectTemplate(templateId) {
  if (templateId === activeTemplateId) return;
  saveCurrentInputs();
  activeTemplateId = templateId;
  saveValue(storageKeys.selected, activeTemplateId);
  renderTemplates();
  renderComposer();
}

function saveCurrentInputs() {
  const currentValues = {};
  fieldList.querySelectorAll("[data-field-key]").forEach((input) => {
    currentValues[input.dataset.fieldKey] = input.value;
  });

  if (Object.keys(currentValues).length > 0) {
    savedInputs[activeTemplateId] = currentValues;
    saveValue(storageKeys.inputs, JSON.stringify(savedInputs));
  }
}

function renderComposer() {
  const template = getActiveTemplate();
  const remembered = savedInputs[template.id] || {};

  selectedTemplate.innerHTML = `
    <span class="template-icon" aria-hidden="true">${escapeHtml(template.icon)}</span>
    <span>
      <span class="selected-title">${escapeHtml(template.name)}</span>
      <span class="selected-category">${escapeHtml(template.category)} · ${template.fields.length} fields</span>
    </span>`;

  fieldList.replaceChildren();

  template.fields.forEach((field) => {
    const group = document.createElement("div");
    group.className = "field-group";
    const labelId = `field-label-${template.id}-${field.key}`;
    const controlId = `field-${template.id}-${field.key}`;
    const control = document.createElement(field.type === "textarea" ? "textarea" : "input");
    control.className = "field-control";
    control.id = controlId;
    control.dataset.fieldKey = field.key;
    control.placeholder = field.placeholder || "";
    control.setAttribute("aria-labelledby", labelId);
    if (field.type !== "textarea") {
      control.type = field.type || "text";
      if (field.min !== undefined) control.min = String(field.min);
      if (field.max !== undefined) control.max = String(field.max);
    } else {
      control.rows = 3;
    }

    const storedValue = remembered[field.key];
    control.value = storedValue !== undefined ? storedValue : template.defaults[field.key] || "";
    control.addEventListener("input", updatePrompt);

    const labelRow = document.createElement("div");
    labelRow.className = "field-label-row";
    const label = document.createElement("label");
    label.className = "field-label";
    label.id = labelId;
    label.htmlFor = controlId;
    label.textContent = field.label;
    labelRow.append(label);

    if (field.hint) {
      const hint = document.createElement("span");
      hint.className = "field-hint";
      hint.textContent = field.hint;
      labelRow.append(hint);
    }

    group.append(labelRow, control);
    fieldList.append(group);
  });

  const savedOutput = parseStoredValue(storageKeys.output, {});
  const templateOutput = savedOutput[template.id];
  if (typeof templateOutput === "string") {
    promptOutput.value = templateOutput;
    updateCharacterCount();
  } else {
    updatePrompt();
  }
}

function updatePrompt() {
  const values = {};
  fieldList.querySelectorAll("[data-field-key]").forEach((input) => {
    values[input.dataset.fieldKey] = input.value.trim() || `{{${input.dataset.fieldKey}}}`;
  });

  promptOutput.value = getActiveTemplate().prompt.replace(/\{\{(\w+)\}\}/g, (match, key) => values[key] || match);
  updateCharacterCount();
  saveCurrentInputs();
  clearTimeout(saveTimer);
  saveTimer = setTimeout(savePromptOutput, 250);
  copyStatus.textContent = "";
}

function updateCharacterCount() {
  const count = promptOutput.value.length;
  characterCount.textContent = `${count.toLocaleString()} ${count === 1 ? "character" : "characters"}`;
}

function savePromptOutput() {
  const savedOutput = parseStoredValue(storageKeys.output, {});
  savedOutput[activeTemplateId] = promptOutput.value;
  saveValue(storageKeys.output, JSON.stringify(savedOutput));
}

async function copyPrompt() {
  if (!promptOutput.value.trim()) {
    copyStatus.textContent = "Add some details to your prompt first.";
    return;
  }

  try {
    await navigator.clipboard.writeText(promptOutput.value);
  } catch {
    promptOutput.focus();
    promptOutput.select();
    const copied = document.execCommand("copy");
    promptOutput.setSelectionRange(promptOutput.value.length, promptOutput.value.length);
    if (!copied) {
      copyStatus.textContent = "Copy isn't available here. Select the prompt and copy it.";
      return;
    }
  }

  copyStatus.textContent = "Copied to clipboard.";
}

function resetFields() {
  savedInputs[activeTemplateId] = { ...getActiveTemplate().defaults };
  saveValue(storageKeys.inputs, JSON.stringify(savedInputs));
  renderComposer();
  copyStatus.textContent = "Fields reset to their starter values.";
}

templateSearch.addEventListener("input", renderTemplates);
promptOutput.addEventListener("input", () => {
  updateCharacterCount();
  clearTimeout(saveTimer);
  saveTimer = setTimeout(savePromptOutput, 250);
  copyStatus.textContent = "";
});
copyButton.addEventListener("click", copyPrompt);
resetButton.addEventListener("click", resetFields);

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    templateSearch.focus();
  }
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "enter") {
    event.preventDefault();
    copyPrompt();
  }
});

renderCategories();
renderTemplates();
renderComposer();
