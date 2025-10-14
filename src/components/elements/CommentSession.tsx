import Comment from "./Comment"
import InputCommnet from "./InputComment"

export default function CommentSession() {
  const comments = [
    {
      id: "1",
      name: "Samuel Alves",
      role: "Designer",
      text: "Gostei bastante dessa ideia! Talvez a gente possa ajustar a cor do botão principal.",
    },
    {
      id: "2",
      name: "Maria Silva",
      role: "Dev Frontend",
      text: "Concordo! Acho que dá pra deixar o layout mais limpo também.",
    },
  ]

  return (
    <div className="flex flex-col min-h-50 px-5 gap-5">
      <div className="flex justify-center items-center gap-2">
        <InputCommnet />
      </div>

      <div className="flex flex-col gap-3">
        {comments.map((comment) => (
          <Comment key={comment.id} {...comment} />
        ))}
      </div>
    </div>
  )
}
