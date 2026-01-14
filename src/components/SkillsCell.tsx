import type { ICellRendererParams } from 'ag-grid-community';

const SkillsCell = (params: ICellRendererParams<string[]>) => {
  const skills = params.value || [];

  return (
    <div className="pt-2">
      <ul className="flex overflow-x-auto gap-1 items-center ">
        {skills.map((skill: string) => (
          <li
            key={skill}
            className={`rounded-full px-3 py-1 text-xs font-medium ${getBadgeColor(
              skill
            )}`}
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsCell;
const BADGE_COLORS = [
  'bg-blue-100 text-blue-800',
  'bg-green-100 text-green-800',
  'bg-purple-100 text-purple-800',
  'bg-pink-100 text-pink-800',
  'bg-yellow-100 text-yellow-800',
  'bg-indigo-100 text-indigo-800',
  'bg-red-100 text-red-800',
  'bg-teal-100 text-teal-800',
];
const getBadgeColor = (skill: string) => {
  const index =
    skill.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    BADGE_COLORS.length;

  return BADGE_COLORS[index];
};
