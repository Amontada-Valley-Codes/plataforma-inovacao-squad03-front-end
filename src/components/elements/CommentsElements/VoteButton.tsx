import { api } from "@/api/axiosConfig";
import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";

interface PropsVote {
  commentId: string;
}

// interface PropsCount {
//   commentId: string;
//   total: number;
// }  

export default function VoteButton({ commentId }: PropsVote) {
  const [vote, setVote] = useState(false);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    verifyVote()
    getCountVotes();
  }, []);

  const verifyVote = async () => {

    try{
        const token = localStorage.getItem("authtoken")
        const response = await api.get(`/votes/${commentId}/voted`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        setVote(response.data.hasVoted)

    } catch(error) {
        console.log(error)
    }

  }

  const getCountVotes = async () => {
    try {
      const token = localStorage.getItem("authtoken");
      const response = await api.get(`/votes/${commentId}/count`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCount(response.data.total);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVote = async () => {
    const token = localStorage.getItem("authtoken");

    try {
      if (vote) {
    
        await api.delete(`/votes/${commentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVote(false);
        setCount((prev) => prev - 1);
      } else {
     
        await api.post(
          "/votes",
          { commentId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setVote(true);
        setCount((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleVote}
      className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-amber-500 transition-colors"
    >
      {vote ? (
        <FaStar className="text-amber-500 transition-transform scale-110" size={18} />
      ) : (
        <FaRegStar size={18} />
      )}
      <span className="font-medium">{count}</span>
    </button>
  );
}
