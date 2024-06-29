## Client state

---

**TBD**: Client state is currently managed through `React.useState` and prop drilling. This README outlines how we will transition to Zustand in a future update.

---

Client state represents state data that is changeable by a user via UI components but is ephemeral
and not stored on the server. We manage this state via the Zustand library.
