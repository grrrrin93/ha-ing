interface CorrectionResult {
  formal: string;
  casual: string;
  feedback: string;
}

interface CorrectionCardProps {
  result: CorrectionResult;
}

export default function CorrectionCard({ result }: CorrectionCardProps) {
  return (
    <div className="mt-6 space-y-4 animate-[fadeIn_0.5s_ease-in-out]">
      {/* 피드백 메시지 */}
      <div className="bg-secondary/10 border-2 border-secondary/20 rounded-2xl p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💬</span>
          <div className="flex-1">
            <h3 className="font-bold text-secondary mb-2 text-lg">친구의 피드백</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {result.feedback}
            </p>
          </div>
        </div>
      </div>

      {/* 세련된 문어체 */}
      <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 border-2 border-primary/20">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">✨</span>
          <h3 className="font-bold text-primary text-lg">세련된 문어체</h3>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            Formal
          </span>
        </div>
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-base sm:text-lg">
          {result.formal}
        </p>
      </div>

      {/* 친근한 구어체 */}
      <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 border-2 border-secondary/20">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">💬</span>
          <h3 className="font-bold text-secondary text-lg">친근한 구어체</h3>
          <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">
            Casual
          </span>
        </div>
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-base sm:text-lg">
          {result.casual}
        </p>
      </div>
    </div>
  );
}
