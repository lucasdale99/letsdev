interface TimelineCardProps {
  company: string;
  year: string;
  content: string;
  expandedContent: string;
}

export const TimelineCard: React.FC<TimelineCardProps> = ({
  company,
  year,
  content,
  expandedContent,
}) => {
  return (
    <div
      className={`p-5 relative flex items-center h-40 transition-all duration-300 ease-in-out cursor-pointer ring-2 rounded-lg my-10`}
    >
      <div className={`p-4 rounded-lg`}>
        <h2 className="font-bold w-60">{company}</h2>
        <div className="text-sm mt-2 w-60">{content}</div>
        <div
          className={`mt-4 text-xs w-50 overflow-hidden transition-all duration-300 ease-in-out`}
        >
          {expandedContent}
        </div>
      </div>
      <div className={`relative w-1`}></div>
      <div className="font-bold p-4">{year}</div>
    </div>
  );
};
