type Timestamp = Date | firebase.firestore.Timestamp


interface Group {
  name: string // グループ名
  description: string // 説明文
  thumbnailUrl: string // サムネイルURL
  discord: string // Discordサーバ招待URL
  baseWorldId: string // 拠点ワールドID
  owner: string // リーダーのVRChat ID
  members: string[] // メンバーのVRChat ID
  tags: string[] // タグ
  createdAt: Timestamp // 設立日
}
