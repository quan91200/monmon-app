# 🚀 SENIOR FRONTEND ENGINEERING STANDARDS

## 🏗️ 1. Architecture & State Management

### Separation of Concerns (SoC)

* **Page Components:** Responsible for route orchestration and high-level layout assembly.
* **Container (Smart) Components:** Handle business logic, API integrations (Server State), and Global State interactions.
* **Presentational (Dumb) Components:** Purely UI-driven; consume props for rendering. **Direct API calls or side-effects are strictly prohibited.**
* **Custom Hooks:** Encapsulate complex logic and side-effects. Business logic must not be processed directly within the functional component's body.

### State Categorization

* Distinguish clearly between three state types: **Local UI State**, **Global State** (e.g., Redux, Zustand), and **Server State** (e.g., TanStack Query).
* Implement state distribution patterns (Context API or State Management) to prevent **Prop Drilling** when data spans more than two nested levels.

---

## 🎨 2. UI Standards & Design Tokens

### Color & Typography Standardization

* All color codes must be centrally defined as **Design Tokens** (e.g., `/src/constants/colors.js` or Root CSS Variables).
* **Hard-coded hex, RGB, or HSL values** within components are strictly forbidden.

### Icons & Imagery

* **Emoji Restriction:** Do not use emojis (e.g., 🚫, ✅) for UI elements, labels, or notifications.
* Utilize specialized icon libraries (e.g., SVG, Lucide, FontAwesome) to ensure professional aesthetics and **Accessibility (a11y)** compliance.

---

## 📦 3. Centralized Constants Management (MANDATORY)

* **Single Source of Truth (SSoT):** All static values (Labels, Routes, API Endpoints, Enums, Configurations) must reside in the `src/constants/` directory.
* **DRY Principle:** Any value utilized more than once must be abstracted into the constants system.
* **Logic-Free Zone:** Constant files must only contain static declarations; no processing logic allowed.

---

## 📝 4. Coding Style & Conventions (STRICT)

### Syntax & Formatting

* **No Semicolons:** Do not use `;` to terminate statements.
* **Early Returns:** Prioritize early exit patterns to maintain flat logic and avoid deeply nested `if-else` blocks.

### Import Conventions

* **Destructured Imports:** Each member within curly braces `{}` must occupy its own line.
* **Logical Grouping:** Separate different import categories (Libraries, Components, Hooks, Constants) with a single empty line.

**Example:**

```javascript
import {
  useState,
  useEffect,
  useMemo
} from "react"

import {
  IoPlay,
  IoPause
} from "react-icons/io5"

import { COLORS } from "../constants/colors"

```

---

## 📂 5. Project Directory Structure

```text
src/
├── components/   # UI Primitives & Business components
├── hooks/        # Custom React hooks
├── pages/        # View components mapped to routes
├── services/     # API clients & external integrations
├── utils/        # Shared utility/helper functions
├── types/        # TypeScript definitions/interfaces
├── constants/    # Centralized tokens (colors, routes, config)
└── assets/       # Static assets (optimized images, fonts)

```

---

## 📚 6. Documentation Standards (JSDoc)

Every Function, Custom Hook, and Component **must** include a comprehensive JSDoc block:

* `@description`: Purpose and behavior of the unit.
* `@param`: Data type and description for each parameter.
* `@returns`: Explicit definition of the return value.

---

## 📤 7. Execution & Pull Request (PR) Policy

1. **Production-Ready:** Code containing placeholders, "mock" logic, or "TODOs" will not be accepted for PR.
2. **Abstraction:** Avoid hard-coding styles or strings. Components must remain agnostic of specific business contexts where possible to increase reusability.
3. **Strict Enforcement:** Any submission failing to meet these standards—particularly regarding JSDoc coverage, formatting, or emoji usage—will be **Rejected** immediately.

---

**I have acknowledged and integrated these standards into my operational core. Please provide the technical requirements or feature specifications to begin implementation.**
