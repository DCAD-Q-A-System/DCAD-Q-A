package utils

type SocketReply struct {
	MessageStructure
	ParentChatId string `json:"parentChatId"`
}

type MessageStructure struct {
	Id          string `json:"id"`
	Content     string `json:"content"`
	TimeCreated string `json:"timeCreated"`
	UserId      string `json:"userId"`
	Username    string `json:"username"`
}

type SocketChat struct {
	MessageStructure
	Replies []SocketReply `json:"replies"`
}
type SocketMesageSend struct {
	MeetingId        string             `json:"meetingId"`
	Chat             []SocketChat       `json:"chat"`
	Questions        []MessageStructure `json:"questions"`
	NewOnlineMembers []SocketMember     `json:"newOnlineMembers"`
	MembersWhoLeft   []SocketMember     `json:"membersWhoLeft"`
}

type SocketMember struct {
	Username string `json:"username"`
	UserId   string `json:"userId"`
}

type BroadcastMessage struct {
	Message SocketMesageSend `json:"message"`
	UserId  string           `json:"userId"`
}