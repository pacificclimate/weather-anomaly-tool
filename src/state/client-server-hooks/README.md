## Client-Server hooks

Client-Server hooks are custom hooks that are a bridge between the client side state (Zustand, non-React DOM elements
such as `document.title`) and the react-query server state.
These are generally once per load functions that apply default values into our Zustand store.

---

**TBD**: Client state is currently managed through `React.useState` and prop drilling. This README outlines how we will
transition to Zustand in a future update.

---
