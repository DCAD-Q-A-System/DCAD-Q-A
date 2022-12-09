# Code plan for front-end

## Login

- LoginScreen.tsx

  - have durham cathedral background
  - Should contain Login as Student
  - Login as Panellist
  - Login as Guest

- Login.tsx

  - subject to change as it might be made more atomic
  - acts as template
  - will allow a prop to allow login as student/panellist/guest
  - removes need to repeat code
  - UT:
    - possibly checking text differs with different prop inputs

- LoginSSO.tsx

  - ideal production-ready login
  - Connects to Durham login
  - will receive tokens and send to backend
  - Test might be very difficult to implement as you have to mimic user interaction and account selection
  - Need to discuss with client about SSO docs

- LoginMicrosoft.tsx

  - backup login if SSO denied
  - most of code will be identical
  - Test might be very difficult to implement

- authenticate.ts
  - authenticate function that sends POST to backend if successful save to localStorage
    - eg. /login
  - Test:
    - give false token and expect a 400 or other HTTP codes

## Settings Page

- Logout.tsx
  - remove token and end session

## (@Student & @Guest) Control Panel

### Meeting ID input

- Add meeting ID to get redirected to the meeting

## (@Panellist screen) Control Panel

### Events

#### Creating events

- AddEvent.tsx
  - pops up with create event box
  - schedule time
  - add livestream source
  - specify which users allowed (can be implemented later as this requires SSO and module info)
- AddTimeSet.tsx
  - set a time for event to start using some CSS framework component
- AddLivestreamSource.tsx
  - this component should only called upon on Panellist view
  - have a button where panellist can add URL to livestream source which could be YouTube or Panopto
  - this sets a flag to send to server via POST request
  - this flag will be kept temporarily in DB

#### Editing Events

- same components in Creating events but in edit mode, could be a prop

#### Starting Events

- StartEvent.tsx
  - button that activates the link to the event
  - send POST request to server to switch flag on DB on event link ID activate
  - UT:
    - activate dummy link and check if flag on DB flipped

## Conditional Wait Page (@Everyone)

- WaitPage.tsx
  - Show loading circle and display text like waiting for host to start event
  - UT:
    - check text is shown

## Main screen (@Everyone)

### End event

- deactivate the link

### Livestream

@ signifies which type of user can access which components
@Everyone = every user can access

- (@Everyone) LivestreamOutput.tsx
  - component should output an iframe tag with the given URL supplied as prop that originally came from AddLivestreamSource.tsx
  - UT:
    - given a valid and erroneous URL check if displays on screen

### Questions

-
- (@Everyone) Question.tsx

  - individual question box with text and upvote/downvote counter from props

  - UT:
    - check if text displayed and upvote/downvote according to tests

- (@Student) Question.tsx extension

  - hook up to
  - allow for upvote/downvote
  - UT:
    - click on upvote/downvote check if counter changes

- (@Panellist)Question.tsx extension

  - Resolve question as answered or delete
  - select as CurrentQuestion button
  - UT:
    - Resolve question n see if in Answered panel
    - Delete and see if disappeared
  - AT:
    - check if when currentquestion clicked the question appears in currentQuestion section

- QuestionsPanel.tsx

  - template for current and answered just depends on prop
  - display Question components in a list
  - UT:
    - check if question list props display correctly

- CurrentQuestion.tsx
  - given a question as prop display at bottom of page
  - UT:
    - check if prop contents displayed

### Chat

- EmojiComponent.tsx
  - pop up of range of emojis
  - return emoji
- (@Everyone) ChatMessage.tsx

  - add 3 dots to add EmojiComponent
  - optional id of chat it might be reply to
  - should display chat, time posted, username etc
  - add option to reply

  - UT:
    - check props displayed
  - AT:
    - if id supplied check if it appears underneath the parent chat
    - check if reply box displayed when clicking on reply

- (@Panellist) ChatMessage.tsx
  - Add delete button to remove message
  - UT:
    - check if it's removed from display
- ChatMessageBox.tsx

  - prop to say whether it is creating new chat message or replying to one
  - UT:
    - see if it displays correct text on props given

- ChatMessagePanel.tsx
  - display chats and their child replies on the panel
  - UT:
    - check if props displayed
