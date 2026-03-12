No code comments (ABSOLUTE): Never add comments to code—no //, /* */, KDoc/Javadoc, TODOs, or commented-out code—under any circumstance unless the user explicitly requests it.

File hygiene: Delete files that become truly obsolete due to your change. Do not delete files to “fix” lint/type errors—stop and ask the user first.

Coordinate before undoing others: Don’t revert/delete work you didn’t author. If unsure about in-flight work, stop and coordinate.

No destructive git ops: Never run git reset --hard, git restore/checkout to older commits, or rm as a “fix” unless the user explicitly instructs it in this chat.

No reverting others’ files: Never use git restore (or similar) to revert files you didn’t author.

Observe the folder / file architecture for the project, ensure that you always follow that consistently for all feature work.

No amend: Never amend commits unless explicitly approved in writing.

Rebase without editors: Use GIT_EDITOR=: and GIT_SEQUENCE_EDITOR=: (or --no-edit) to avoid interactive editors.