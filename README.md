## How to run the app:

First, run the development server:

```bash
pnpm i
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## What’s implemented:

- Routing & Navigation
- - Each quiz question has its own URL, e.g. /quiz/[id].
- - The Back/Forward browser buttons correctly navigate between questions.
- - A simple landing page (/) with a “Start quiz” button leading to the first question.
    <br />
    <br />
- Data & Logic
- - Load quiz data from a mock API (e.g., a local JSON file).
- - Some questions can be conditionally visible based on previous answers.
- - Use a flexible and extensible schema so that new questions or types could be added later.
    <br /><br />
- State & Persistence
- - Store user answers on the client (React state and/or localStorage). Used Zustand
- - When navigating back and forth, previously selected answers persist.

## Nice-to-have implemented

- Fake loading page
- Improved UX (keyboard navigation, progress bar, responsive layout).

## Next TODOs:

- Think how to handle routes in the middle of test, if user don't have previous answers. Redirect to the start
- Polish UI. Now it is not pixel perfect. Add hovers, transitions, animations
- Add tests
- add analytic events

## Flow of the app:

- Data loaded from json in server component (layout.tsx) and passed to InitializeQuizStore.tsx to mount Zustand store. Quiz data and user answers are stored in state. User answers are stored also in localhost.
- quizService.ts has stateless functions to get relative quiz info.
- useQuestion hook has main data which later is passed to QuestionHeader and QuestionTypesRenderer components
- QuestionTypesRenderer renders different templates for different question types.
- To extend templates, add new type to QUESTION_TYPES consts, add type to types.ts, add new template, add template to QuestionTypesRenderer as new case.
- useQuizNav responsible for correct navigation.
