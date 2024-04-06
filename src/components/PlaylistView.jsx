import React from "react";
import Card from "./Card";

const PlaylistView = ({ titleText, cardsData }) => {
  return (
    <div className="text-white ">
      <div className="text-2xl font-semibold mb-5">{titleText}</div>
      <div className="w-full flex justify-between space-x-4 mb-5">
        {cardsData.map((item, idx) => {
          return (
            <Card
              key={idx}
              title={item.title}
              description={item.description}
              imgUrl={item.imgUrl}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PlaylistView;
