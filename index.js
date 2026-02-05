const limitInput = document.getElementById("limitInput");
const limitReset = document.getElementById("limitReset");
const messageInput = document.getElementById("messageInput");
const preview = document.getElementById("preview");
const stats = document.getElementById("stats");

const segmentColors = [
  "segment-1",
  "segment-2",
  "segment-3",
  "segment-4",
  "segment-5",
  "segment-6",
];

function countUcs2Units(text) {
  return text.length;
}

function splitUcs2(text, limit) {
  const parts = [];
  let i = 0;

  while (i < text.length) {
    let end = Math.min(i + limit, text.length);

    // Avoid splitting surrogate pairs (emoji, non-BMP)
    const prev = text.charCodeAt(end - 1);
    const next = text.charCodeAt(end);
    const isHigh = prev >= 0xd800 && prev <= 0xdbff;
    const isLow = next >= 0xdc00 && next <= 0xdfff;
    if (end < text.length && isHigh && isLow) {
      end -= 1;
    }

    parts.push(text.slice(i, end));
    i = end;
  }

  return parts;
}

function buildSegments(text, singleLimit) {
  const units = countUcs2Units(text);
  const concatLimit = Math.max(singleLimit - 3, 1);
  const isConcatenated = units > singleLimit;
  const limit = isConcatenated ? concatLimit : singleLimit;
  const parts = splitUcs2(text, limit);
  return { parts, units, limit, isConcatenated };
}

function renderPreview() {
  const limit = Math.max(parseInt(limitInput.value, 10) || 70, 1);
  const message = messageInput.value;
  const { parts, units, limit: actualLimit, isConcatenated } = buildSegments(
    message,
    limit
  );

  preview.innerHTML = "";

  if (message.length === 0) {
    preview.textContent = "Start typing to see the split preview.";
    stats.textContent = "";
    return;
  }

  const fragment = document.createDocumentFragment();
  parts.forEach((part, index) => {
    const span = document.createElement("span");
    const colorClass = segmentColors[index % segmentColors.length];
    span.className = `segment ${colorClass}`;
    span.textContent = part;
    fragment.appendChild(span);
  });
  preview.appendChild(fragment);

  const segmentCount = parts.length;
  const label = isConcatenated
    ? `Concatenated mode (${actualLimit} units/segment)`
    : `Single SMS mode (${actualLimit} units)`;
  stats.innerHTML = `
    Total units: <span class="segment-count">${units}</span> |
    Segments: <span class="segment-count">${segmentCount}</span> |
    ${label}
  `;
}

const debouncedRender = _.debounce(renderPreview, 500);

limitInput.addEventListener("input", debouncedRender);
messageInput.addEventListener("input", debouncedRender);
limitReset.addEventListener("click", () => {
  limitInput.value = "70";
  renderPreview();
});

renderPreview();
