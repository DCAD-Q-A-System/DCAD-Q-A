## Questions Table

Question ID PK int
User ID PK int
QBody varchar
Timestamp "Hour-Minute-Second"
VoteCount int
isResolved bool

## Chat

MessageID PK int
UserID int
ChatBody varchar
Timestamp "Hour-Minute-Second"

## Reactions

MessageID FK
Reaction int (Unicode char)

## Replies

MessageID FK int
ReplyBody varchar

## Event

EventID PK
TimeOfEvent "Hour-Minute-Second"
EITHER
AllowedUsers list[varchar] (list of emails)
OR
CohortID int (Comes from DU API)
