You are analyzing a multi-portal super-app project called "Mango".

Context:

- mango/index.html is the main Glass UI hub with multiple portals.
- mango/travel/index.html is intended to be a Travel consumer-facing entry.
- shim.html is a separate prototype file that may represent a Travel Dashboard or AI-driven Travel Core UI.

IMPORTANT:
Do NOT modify any code yet.
Do NOT merge files yet.
This is analysis and architecture decision preparation only.

Your future task (not now) will be:

1. Analyze mango/travel/index.html to determine:
   - Is it a landing page, a dashboard, or a feature shell?
   - Is it consumer-facing or internal/core?
2. Analyze shim.html to determine:
   - Is it overlapping with Travel UI responsibility?
   - Is it better suited as:
     a) travel/index.html
     b) travel/dashboard.html
     c) travel-core/index.html
     d) admin-only or IR/demo-only asset
3. Decide clear separation of responsibility between:
   - Main Mango Hub
   - Travel Consumer Entry
   - Travel AI / Data / Dashboard Core

For now:

- Only read and understand files.
- Prepare to give architectural recommendations later.
- No refactoring, no cleanup, no renaming yet.

Wait for the explicit command:
"START ANALYSIS"
before doing any real analysis or suggestions.

# Travel Architecture Analysis – AI Context Prompt

(아래 프롬프트 그대로)
