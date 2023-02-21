# Code plan for Backend Plan

## Sockets manager

- socket_manager.go
  - bind and listen to all connections
    - those with guest privelages can:
      - get questions
      - get chat
      - get livestream id
    - student privelages:
      - get questions
      - insert questions
      - get chat
      - insert chat
      - insert reply chat
    - panellist privelages
      - get questions
      - insert questions
      - get chat
      - insert chat
      - insert reply chat
      - delete chat/question/reply
      - add event
      - start event

## Login

- auth.go
  - authenticate token requests from microsoft and automatically see which email is which class of user eg. Lei Shi automatically detected to be panellist and John is student
  - send back JWT token
  - UT:
    - do fake token to see if error
    - do correct token and see if success

## Main screen

- event_manager.go

  - given an id for an event -> check if in DB and is activated
  - if activated send data saying can proceed to lobby
  - otherwise wait in waiting screen

- get_all_questions.go
  - send all questions/replies associated with event id
  - UT:
    - check if questions returned via GET request
- get_all_chat.go

  - send all questions associated with event id
  - UT:
    - check if chat returned via socket connection

- insert\_(chat|question|reply).go

  - inserts (chat|question|reply) and returns id
  - UT:
    - insert and check if returns id and is in db
