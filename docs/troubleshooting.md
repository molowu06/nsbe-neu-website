# Troubleshooting

This document covers common issues developers may encounter while working on the NSBE Northeastern website and provides possible solutions.

---

## General Development Issues

### Website Does Not Start Locally

#### Possible Causes:
- Dependencies are not installed
- Node.js version mismatch
- Missing environment variables
- Incorrect project setup

#### Solutions:

Make sure dependencies are installed:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

If issues continue, try reinstalling dependencies:

```bash
rm -rf node_modules
rm package-lock.json
npm install
```

---

## Environment Variable Issues

### Missing Environment Variables

- Website loads but features do not work
- API calls fail
- Supabase connection errors
- Authentication does not work

#### Possible Causes:
- `.env` file is missing
- Incorrect variable names
- Missing API keys

#### Solutions:

1. Check that your `.env` file exists
2. Verify variable names match the documentation
3. Restart the development server after changing environment variables

Example:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Remember:

- Never commit `.env` files
- Never share API keys publicly
- Ask a team lead for access if credentials are missing

---

## API Issues

### Google Calendar API Not Working
- Events do not appear
- Calendar page is empty
- API request errors

#### Possible Causes:
- API is not enabled
- Incorrect API key
- Incorrect calendar ID
- API permissions are missing

#### Solutions:

Check:

- Google Calendar API is enabled
- API credentials are correct
- Calendar is publicly accessible or properly authenticated
- Environment variables are correct

Example:

```env
GOOGLE_API_KEY=your_api_key_here
GOOGLE_CALENDAR_ID=your_calendar_id_here
```

---

### Google Drive API Not Working
- Photos do not load
- Images are missing
- Drive folders cannot be accessed

#### Possible Causes:
- Incorrect folder ID
- Incorrect permissions
- API not enabled

### Solutions:

Check:

- Google Drive API is enabled
- Folder permissions allow access
- Folder ID is correct
- API credentials are valid

---

### Supabase Connection Errors
- Database information does not load
- Member data is missing
- Authentication fails

#### Possible Causes:
- Incorrect Supabase URL
- Incorrect API key
- Database permissions
- Table names do not match code

#### Solutions:

Verify:

- Supabase project is active
- Environment variables are correct
- Tables exist
- Database policies allow access

---

## Git Issues

### Reminder: Always Pull Before Starting Work

Before making changes, always pull the latest code:

```bash
git pull
```

This prevents:
- Merge conflicts
- Working on outdated code
- Accidentally overwriting someone else's work

---

### Always Create a Separate Branch

Do not make changes directly on the main branch.

Create a new branch:

```bash
git checkout -b feature/your-feature-name
```

Examples:

```bash
git checkout -b feature/events-filtering

git checkout -b fix/calendar-loading

git checkout -b docs/update-readme
```

---

### Always Create Pull Requests

When your changes are complete:

1. Commit your changes
2. Push your branch
3. Create a Pull Request
4. Wait for review before merging

Push your branch:

```bash
git push origin your-branch-name
```

Pull Requests help:
- Review code changes
- Catch bugs
- Keep the main branch stable
- Allow team collaboration

---

## Git Merge Conflicts
- Git refuses to pull
- Files show conflict markers
- Changes cannot be merged

Example:

```text
<<<<<<< HEAD
your changes
=======
someone else's changes
>>>>>>> branch-name
```

#### Solutions:

1. Open the conflicted files
2. Decide which changes to keep
3. Remove conflict markers
4. Save the file

Then:

```bash
git add .
git commit -m "fix: resolve merge conflict"
```

---

## Git Push Issues

### Push Rejected

#### Error:

```text
Updates were rejected because the remote contains work that you do not have locally
```

#### Cause:

Someone else pushed changes before you.

#### Solution:

Pull the latest changes:

```bash
git pull
```

Resolve conflicts if needed, then push again:

```bash
git push
```

---

### Accidentally Committed to Main

#### Solution:

Do not continue adding changes.

Contact a team lead before pushing or merging.

If the commit has not been pushed:

```bash
git reset HEAD~1
```

---

## Build Issues

### Build Fails

#### Possible Causes:
- TypeScript errors
- Missing dependencies
- Incorrect imports
- Environment variable issues

#### Solutions:

Run:

```bash
npm run build
```

Check the error message carefully.

Common fixes:

Install missing packages:

```bash
npm install
```

Check imports:

```tsx
import Component from "./Component"
```

Verify file names match exactly.

---

### TypeScript Errors
- Build fails
- Red errors appear in editor

#### Common Causes:
- Incorrect prop types
- Missing interfaces
- Undefined variables

#### Solutions:

Check:
- Component props
- Function parameters
- Data types

Avoid using:

```tsx
any
```

Instead define proper types:

```tsx
interface Member {
  name: string
  year: number
}
```

---

## Deployment Issues

### Deployment Fails

#### Possible Causes:
- Build errors
- Missing environment variables
- Incorrect deployment settings
- Dependency issues

#### Solutions:

Before deploying:

1. Test locally

```bash
npm run build
```

2. Check environment variables
3. Confirm all dependencies are installed

---

## Best Practices Reminder

Before every coding session:

1. Pull the latest changes

```bash
git pull
```

2. Create a separate branch

```bash
git checkout -b feature/name
```

3. Make changes and test locally

4. Commit clearly

```bash
git commit -m "feat: describe change"
```

5. Push your branch

```bash
git push origin branch-name
```

6. Create a Pull Request

---

Following these practices helps keep the NSBE website stable, organized, and easier for future developers to maintain.
