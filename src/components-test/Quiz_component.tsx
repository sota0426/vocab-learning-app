import { useNavigate } from 'react-router-dom';

interface Quiz_finishedProps{
    isQuizFinished:boolean;
    restartQuiz:()=>void;
    navigate:()=>void;
}
export function QuizFinished({isQuizFinished,restartQuiz,navigate}:Quiz_finishedProps){
return(
    <>
    {isQuizFinished && (
        <div className="mt-6">
          {/* 再挑戦ボタン */}
          <button
            onClick={restartQuiz}
            className="block w-full text-xl p-4 bg-green-500 text-white rounded mb-6 hover:bg-green-600 transition-all"
          >
            もう一度挑戦する
          </button>
      
          {/* 戻るボタン */}
          <button
            onClick={navigate}
            className="block w-full text-xl p-4 bg-green-500 text-white rounded mb-6 hover:bg-green-600 transition-all"
          >
            終了する
          </button>
        </div>
      )}
    </>
    )
}



interface FeedbackOverlayProps {
    showFeedbackOverlay: 'correct' | 'incorrect' | null;
    feedback: string | null;
  } 
  export function FeedbackOverlay({ showFeedbackOverlay, feedback }: FeedbackOverlayProps) {
    if (showFeedbackOverlay === null) return null;
  
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-opacity-40 bg-black">
        {showFeedbackOverlay === 'correct' ? (
          <div className="text-green-600" style={{ fontSize: '30rem' }}>&#x25CB;</div>
        ) : (
          <div className="text-red-600" style={{ fontSize: '5rem' }}>&#x274C;</div>
        )}
        {feedback && <p className="mt-4 text-8xl text-white font-bold">{feedback}</p>}
      </div>
    );
  }
  

  interface Answer {
    word_1_en: string;
    word_1_ja: string;
  }
  
  interface AnswerListProps {
    correctAnswers: Answer[];
    incorrectAnswers: Answer[];
  }
  
  export function AnswerList({ correctAnswers, incorrectAnswers }: AnswerListProps) {
    return (
      <div className="w-full mt-6">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="w-1/2 text-xl font-bold p-4 border-b">正解した単語（{correctAnswers.length}個）</th>
              <th className="w-1/2 text-xl font-bold p-4 border-b">不正解の単語（{incorrectAnswers.length}個）</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.max(correctAnswers.length, incorrectAnswers.length) }).map((_, index) => (
              <tr key={index}>
                <td className="text-lg p-4 border-b">
                  {correctAnswers[index] ? `${correctAnswers[index].word_1_en} - ${correctAnswers[index].word_1_ja}` : ''}
                </td>
                <td className="text-lg p-4 border-b">
                  {incorrectAnswers[index] ? `${incorrectAnswers[index].word_1_en} - ${incorrectAnswers[index].word_1_ja}` : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  