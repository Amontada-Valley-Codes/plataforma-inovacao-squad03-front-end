import { useEffect, useState } from "react"
import Comment from "./Comment"
import InputCommnet from "./InputComment"
import { api } from "@/api/axiosConfig"
import { PropsSessionComment } from "@/types" 
import { PropsComment } from "@/types"

export default function CommentSession({challangerId}:PropsSessionComment) {
  const [comments, setComments] = useState<PropsComment[]>([])
  const [commentsUpload, setCommentsUpload] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const getComments = async () => {

      try {

        const token = localStorage.getItem("authtoken")

        const response = await api.get(`/comments/challenge/${challangerId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setComments(response.data)

      } catch(error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getComments()

  }, [commentsUpload, challangerId])

  return (
    <div className="flex flex-col min-h-50 px-5 gap-5">

      <div className="flex justify-center items-center gap-2">

        <InputCommnet 
          challengerId={challangerId} 
          commentsUpload={commentsUpload} 
          setCommentsUpload={setCommentsUpload} 
        />

      </div>

      <div className="flex flex-col gap-3 max-h-[360px] overflow-auto">

        {loading ? (
          <div className="flex justify-center mt-5">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-blue rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0ms]" />
              <span className="w-2 h-2 bg-blue rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:120ms]" />
              <span className="w-2 h-2 bg-blue rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:240ms]" />
            </div>
          </div>
        ) : comments.length > 0 ? (
          <>
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                {...comment}
                commentsUpload={commentsUpload}
                setCommentsUpload={setCommentsUpload}
              />
            ))}
          </>
        ) : (
          <span className="text-blue text-center mt-5">
            Ainda não há nenhum comentário neste desafio
          </span>
        )}

      </div>
    </div>
  )
}
