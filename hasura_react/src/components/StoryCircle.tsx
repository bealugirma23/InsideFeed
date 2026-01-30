

import React from 'react';


export interface Story {
  id: string;
  name: string;
  image: string;
  active: boolean;
}


interface StoryCircleProps {
  story: Story;
}

export const StoryCircle: React.FC<StoryCircleProps> = ({ story }) => {
  return (
    <div className="flex flex-col gap-3 min-w-[100px] items-center text-center cursor-pointer group">
      <div className={`w-20 h-20 rounded-full p-1 border-2 transition-all group-hover:scale-105 ${story.active ? 'border-primary' : 'border-gray-200'}`}>
        <div
          className="w-full h-full rounded-full bg-center bg-cover border border-white"
          style={{ backgroundImage: `url('${story.image}')` }}
        ></div>
      </div>
      <span className="text-xs font-semibold text-gray-700 group-hover:text-primary transition-colors">
        {story.name}
      </span>
    </div>
  );
};
