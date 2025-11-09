type ProgressBarProps = {
  currentQuestionIndex: number;
  totalQuestions: number;
};

export default function ProgressBar({
  currentQuestionIndex,
  totalQuestions,
}: ProgressBarProps) {
  const width = ((currentQuestionIndex - 1) / totalQuestions) * 100 + "%";

  return (
    <div className="relative h-0.5 w-full bg-[#EEEEEE]">
      <div className="absolute h-0.5 bg-[#AA00FF]" style={{ width }}></div>
    </div>
  );
}
