class Comment {
  constructor({
    user,
    content,
    ifLiked,
    likeCount,
    time,
    commentId,
    replied
  }) {
    this.user = user
    this.content = content
    this.ifLiked = ifLiked
    this.likeCount = likeCount
    this.time = time
    this.commentId = commentId
    this.replied = replied
  }
}

export function createComment(item) {
  return new Comment({
    user: {
      name: item.user.nickname,
      id: item.user.userId,
      picUrl: item.user.avatarUrl
    },
    content: item.content,
    ifLiked: item.liked,
    likeCount: item.likedCount,
    time: item.time,
    commentId: item.commentId,
    replied: item.beReplied.length > 0 ? commentForReplied(item.beReplied[0]) : null
  })
}

function commentForReplied(rep) {
  return {
    user: {
      id: rep.user.userId,
      name: rep.user.nickname,
      picUrl: rep.user.avatarUrl
    },
    content: rep.content
  }
}