interface TimelineCardProps {
  company: string;
  year: string;
  content: string;
  expandedContent: string;
  isExpanded: boolean;
  onHover: () => void;
  onHoverLeave: () => void;
}

export const TimelineCard: React.FC<TimelineCardProps> = ({
  company,
  year,
  content,
  expandedContent,
  isExpanded,
  onHover,
  onHoverLeave,
}) => {
  return (
    <div
      className={`p-5 relative flex items-center h-40 transition-all duration-300 ease-in-out cursor-pointer bg-slate-300`}
      onMouseEnter={onHover}
      onMouseLeave={onHoverLeave}
    >
      {/* Content Area */}
      <div className={`p-4 bg-gray-100`}>
        <div className="text-lg font-bold w-60">{company}</div>
        <div className="text-sm mt-2 w-60">{content}</div>
        <div
          className={`mt-4 text-xs w-50 overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {expandedContent}
        </div>
      </div>
      {/* Timeline Line */}
      <div className={`relative w-1 bg-gray-100`}></div>
      {/* Year Area */}
      <div className="text-lg font-bold text-gray-500 p-4">{year}</div>
    </div>
  );
};
